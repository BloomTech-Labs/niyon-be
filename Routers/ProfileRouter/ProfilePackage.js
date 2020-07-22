const express = require("express");
const {
  userHelper,
  jobHelper,
  locationHelper,
  techHelper,
  connectHelper,
} = require("../../models/classHelpers");
const restricted = require("../../Middleware/restricted");
const decoder = require("jwt-decode");
const {
  setJobLocation,
  filterProfileConnection,
} = require("../../utils/helperFunctions");

const router = express.Router();

router.get("/profilePackage", restricted(), async (req, res, next) => {
  try {
    const tech = await techHelper.getAll();
    const location = await locationHelper.getAll();
    const jobs = await jobHelper.getAll();

    const profile_starter = {
      tech,
      location,
      jobs,
    };
    return res.status(200).json(profile_starter);
  } catch (e) {
    // console.log(e);
    next();
  }
});

router.get("/", restricted(), async (req, res, next) => {
  try {
    // pulling token from headers and decoding to get user_id
    const token = req.headers.authorization;
    const tokenAuth = decoder(token);
    // using the user_id to find all connections associated with user ( connected and rejected )
    const userConnections = await connectHelper.allMyConnections(
      tokenAuth.user_id
    );
    // filtering userConnections to grab all id's that are not === to the logged in user
    const myConnectionId = [];
    await userConnections.map((arr) => {
      if (arr.userReq === tokenAuth.user_id) {
        myConnectionId.push(arr.userAcc);
      } else {
        myConnectionId.push(arr.userReq);
      }
    });

    // pushing in the logged in user ID to filter their own profile as well
    myConnectionId.push(tokenAuth.user_id);

    const allUsers = await userHelper.getAll();

    // async function to set location, job, and techs for users to be returned
    async function userData(arr) {
      try {
        const user = await setJobLocation(arr);
        return user;
      } catch (e) {
        console.log(e);
      }
    }

    // async function to locate user data by ID
    async function setUser(arr) {
      try {
        const user = await userHelper.findById(arr);
        delete user.password;
        return user;
      } catch (e) {
        console.log(e);
      }
    }

    // async function we wrap our array methods in to create async array methods
    const getData = async () => {
      // mapping over all users in the database to complete profile with job, location, techs
      const allProfiles = await Promise.all(
        allUsers.map((arr) => userData(arr))
      );

      // mapping over and pulling our all the users ID's into a single array
      const allProfileId = allProfiles.map((arr) => {
        return arr.id;
      });

      // filtering all the users by an array of users connected with the logged in user
      const allFilteredProfiles = await allProfileId.filter(
        (user) => !myConnectionId.includes(user)
      );
      // mapping over an array of ID's not connected to the logged in user, setting their profile
      const allUserObjects = await Promise.all(
        allFilteredProfiles.map((user) => setUser(user))
      );
      // mapping over the file array of filtered users to complete their profile with job, location, techs
      return await Promise.all(allUserObjects.map((arr) => userData(arr)));
    };

    getData().then((data) => {
      res.status(200).json(data);
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", restricted(), async (req, res, next) => {
  try {
    // grabbing the id from the params and locating the user in the DB, or returning an error message if user is null
    const user_id = req.params.id;
    const user = await userHelper.findById(user_id);
    if (!user) {
      res.status(404).json({
        errorMessage: `User with the id of ${user_id} was not found`,
      });
    }

    // using a helper function to set the job, location, and techs of user
    const userUpdate = await setJobLocation(user);
    // Finding all the connections the current user has, both connected and rejected
    const myConns = await connectHelper.myConnections(user.id);

    // lines 112 - 126 are filtering all the connections the user has into different categories
    const myConnections = myConns.filter((arr) => {
      return arr.rejected === false && arr.status === true;
    });

    const myConnsAcc = myConnections.filter((arr) => {
      return arr.userAcc === user.id;
    });

    const myConnsReq = myConnections.filter((arr) => {
      return arr.userReq === user.id;
    });

    // grabbing the logged in users outgoing and incoming connection requests
    const myRequests = await connectHelper.newConnections(user.id);
    const myOutGoingRequests = await connectHelper.newConnectionRequests(
      user_id
    );

    // lines 130 - 147 are two async functions we use to set the profiles of connections
    // TODO: look to refactor lines 131 - 148 into one function
    async function connData(arr) {
      try {
        const connProfile = await userHelper.findById(arr);
        return await setJobLocation(connProfile);
      } catch (e) {
        console.log(e);
      }
    }

    async function connRequest(arr) {
      let connRequest;
      try {
        connRequest = await userHelper.findById(arr);
        return await setJobLocation(connRequest);
      } catch (e) {
        console.log(e);
      }
    }

    // async function to create array methods that are async
    const getData = async () => {
      // creating an array of connections requested by the current user
      const myConnProfileAcc = await Promise.all(
        myConnsAcc.map((arr) => connData(arr.userReq))
      );
      // creating an array of connections the current user accepted
      const myConnProfileReq = await Promise.all(
        myConnsReq.map((arr) => connData(arr.userAcc))
      );
      // creating an array of incoming connection request for the current user
      const myConnRequest = await Promise.all(
        myRequests.map((arr) => connRequest(arr.userReq))
      );
      // creating an array of outgoing connection requests from the current user
      const mySentRequests = await Promise.all(
        myOutGoingRequests.map((arr) => connRequest(arr.userAcc))
      );

      // combining connections the user request that were accepted, and requests that the user accepted into one array
      const myConnProfiles = [];
      myConnProfileAcc.map((arr) => {
        myConnProfiles.push(arr);
      });
      myConnProfileReq.map((arr) => {
        myConnProfiles.push(arr);
      });
      // creating the return object from our async function
      return {
        myConnProfiles,
        myConnRequest,
        mySentRequests,
      };
    };
    // deleting the logged in user password for security
    delete user.password;
    // our async function to turn array methods to async and the return object we create
    getData().then((data) => {
      res.status(200).json({
        ...userUpdate,
        myConnections: data.myConnProfiles,
        myRequests: data.myConnRequest,
        mySentRequests: data.mySentRequests,
      });
    });
  } catch (e) {
    console.log(e);
    next();
  }
});

router.post("/:id", restricted(), async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const validateUser = await userHelper.findById(user_id);
    if (!validateUser) {
      res.status(400).json({
        errorMessage: "User ID not found",
      });
    }
    const { techs } = req.body;
    if (techs) {
      techs.map((arr) => {
        techHelper.updateTech(user_id, arr);
      });
    }
    const {
      first_name,
      last_name,
      bio,
      email,
      job_title_id,
      location_id,
    } = req.body;
    const data = {
      first_name,
      last_name,
      bio,
      email,
      job_title_id,
      location_id,
    };

    if (!data) {
      res.status(400).json({
        errorMessage: "No data included in request",
      });
    }
    await userHelper.update(user_id, data);
    const user = await userHelper.findById(user_id);
    await setJobLocation(user);
    const tech = await techHelper.userTech(user.id);
    const techID = tech.map((arr) => {
      return arr.id;
    });

    const returnedUser = {
      ...user,
      techs: techID,
    };
    delete returnedUser.password;
    res.status(201).json(returnedUser);
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
