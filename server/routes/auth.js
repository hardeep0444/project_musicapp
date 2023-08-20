//all apis starting with /api/users

const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/login", async (req, res) => {
  //   return res.send(req.headers.authorization);
  //if authorization header is not found
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    //decoding the token to get the user information
    const decodeToken = await admin.auth().verifyIdToken(token);

    if (!decodeToken) {
      return res.status(505).json({ message: "Unauthorized" });
    } else {
      //Checking if the user already exists in the database
      const userExists = await user.findOne({ user_id: decodeToken.user_id });
      if (!userExists) {
        // User does not exist, need to create
        newUserData(decodeToken, req, res);
      } else {
        return res.send("User already exists");
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});

//saving new user data in database
const newUserData = async (decodeToken, req, res) => {
  const newUser = new user({
    name: decodeToken.name,
    email: decodeToken.email,
    imageUrl: decodeToken.picture,
    user_id: decodeToken.user_id,
    email_verified: decodeToken.email_verified,
    role: "member",
    auth_time: decodeToken.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

module.exports = router;
