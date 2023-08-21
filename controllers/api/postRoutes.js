const router = require("express").Router();
const Post = require("../../models/Post");
const withAuth = require("../../utils/auth");

//Get all posts:
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
    // res.render("home", { postData });
    console.log("post request");
  } catch (err) {
    res.status(500).json(err);
    console.log("post request failed");
  }
});
//most recent post
router.get("/mostRecent", async (req, res) => {
  try {
    const mostRecentPost = await Post.findOne({
      order: [["date", "DESC"]],
    });

    if (mostRecentPost) {
      res.json(mostRecentPost);
    } else {
      res.status(404).json({ message: "No recent posts found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//* New Post route
router.post("/", async (req, res) => {
  const { title, content, userId } = req.body; // Extract data from request body

  try {
    const newPost = await Post.create({
      title,
      content,
      userId, // Assign the userId
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
