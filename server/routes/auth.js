//all apis starting with /api/users

const router = require("express").Router();

router.get("/login", (req, res) => {
  //   return res.send(req.headers.authorization);
  //if authorization header is not found
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  return res.send(token);
});

module.exports = router;
