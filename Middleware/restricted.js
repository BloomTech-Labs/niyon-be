//middleware to check for token
const jwt = require("jsonwebtoken");

function restricted() {
  const authError = {
    errorMessage: "Unauthorized" //Standard error message
  };
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json(authError); //errors if no token
      }
      jwt.verify(token, process.env.JWT_SECRET, error => {
        if (error) {
          return res.status(401).json(authError); //errors if token and secret is wrong
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = restricted;
