const router = require("express").Router();
const Post = require("../../models/Post");

//* Signup route
router.post("/create", async (req, res) => {
  try {
    //* Create a new Post in the database
    const postData = await Post.create(req.body);

    //* Set the user's session and send a response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "Post successful" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post failed" });
  }
});

module.exports = router;
