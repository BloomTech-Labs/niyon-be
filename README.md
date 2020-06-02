# API Documentation
#### Deployed Base URL:
https://niyon-app.herokuapp.com

## Getting started

To get the server running locally:
###### You will need postgresql installed, please check the .env config below for setup

- Clone this repo
- **npm install** to install all required dependencies
- **npx knex migrate:latest --env dev** to create postgres developer DB environment
- **npx knex seed:run --env dev** to seed the newly created DB environment
- **npm run server** to start server locally on port 4000

### Node.js / express

-    Lambda Labs only allows REST api's now
-    Node.js is a popular and easy to set up backend language
-    Having our backend and frontend both written in JavaScript enables the team to have better communication
-    Express offers a robust set of features for web applications

## Endpoints

#### Registration / Login Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/auth/register`       | public         | Creates a new user / returns token           |
| POST    | `/auth/login`          | public         | Checks entered credentials / returns token   |

#### Profile Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    |`/profile/profilePackage`| requires token      | Returns all data to complete profile set up        |
| GET    |`/profile`               | requires token      | Returns all users with data                        |
| GET    |`/profile/:id`           | requires token      | Returns data for user by ID                        |
| POST    |`/profile/:id`          | requires token      | Data fields need to be named as below, none are required|
# Data Model

#### Registration Example

---

```
User Input:
{
  email: johndoe@gmail.com
  user_type: Mentor
  password: ilovetacos
}
Returned:
{
  token: lasd890gklj309Likajsgf09w234j0mfgal....ect
  user: {
        id: 12
        email: johndoe@gmail.com
        user_type: Mentor
    }
}
```
#### Login Example

---

```
User Input:
{
  email: johndoe@gmail.com
  password: ilovetacos
}
Returned:
{
  token: lasd890gklj309Likajsgf09w234j0mfgal....ect
  user: {
        id: 12
        email: johndoe@gmail.com
        user_type: Mentor
    }
}
```
#### Profile Starter Kit Return
###### NOTE: To fully complete profile you will also need to ask for first and last name

---

```
set headers: authorization === token recieved during registration or login
{
 tech: [{ id / name /  type }] 53 objs
 location: [{ id / city /  country }] 125 objs
 jobs: [{ id / job_title }] 27 objs
}

POST profile/:id: 

User Input, none are required: 
{
    techs: [3, 2, 5, 23] => array of tech_id's
    location_id: 12 => ID for location
    job_title: 34 => ID for job_title
    first_name: STRING! => first name of user
    last_name: STRING! => last name of user
    bio: STRING! => small blurb about user
}
Return stucture for POST by id is the same as GET / GET by id listed below 

GET user by id returned data stucture example:
{
    id: 23
    first_name: "Tim"
    last_name: "Taylor"
    bio: "Working as a junior front end web dev"
    email: "tTaylor@hotmail.com"
    user_type: "mentee"
    job_titile_id: 16
    location_id: 6
    job_title: "Junior Front End Developer"
    location: "Yamoussoukro, Ivory Coast"
    tech_stack: [
            {
              "name": "JavaScript",
              "type": "Language",
              "id": 3
            },
            {
              "name": "Figma",
              "type": "Soft",
              "id": 22
            },
            {
              "name": "React",
              "type": "Framework",
              "id": 18
            }
          ]
    }
```

## Models
#### User

`createUser()` => Creates a user in our DB

`findBy(filter)` => Find a user by entered filter

`findById(id)` => Find a user by ID, returns all fields 

`update(id, data)` => ID(user id to be updated) / data(required fields to be updated)

#### Tech

`getTech()` => Returns an array of all stored tech

`getById(id)` => Returns all fields for a single tech

`updateTech(userID, techID)` => requires a userID and techID to show relationship

`userTech(id)` => ID(user id) returns all tech the user has a relation to

#### Job Title

`getTitles()` => Returns an array of all stored job titles

`getById(id)` => Returns a single job_title using job_title_id

#### Location

`getLocations()` => Returns an array of all stored locations

`getById(id)` => Returns a single location by using location_id

#### Middleware
`restricted()` => Used for all protected routes and requires a token set in the header under authorization

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  JWT_SECRET - generate with jsonwebtoken dependencie
    *  DB_SECRET - provided by Heroku during deployment
    *  HEROKU_USER - provided by Heroku during deployment
    *  DB_PASSWORD - provided by Heroku during deployment
    *  LOCAL_PASSWORD - your local postgres password
    *  LOCAL_USER - your local postgres user
    *  LOCAL_DB - you will need to create and name a local DB
    
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](documentation/code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
