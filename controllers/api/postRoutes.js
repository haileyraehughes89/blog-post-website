const router = require("express").Router();
const Post = require("../../models/Post");

//Get all posts:
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    // res.status(200).json(postData);
    res.render("home", { postData });
    console.log("post request");
  } catch (err) {
    res.status(500).json(err);
    console.log("post request failed");
  }
});

//Get 3 most recent posts
// router.get("/recent", async (req, res) => {
//   try {
//     const sortedPosts = await Post.findAll({
//       order: [["time", "DESC"]],
//       limit: 3,
//     });

//     if (sortedPosts.length === 0) {
//       return res.status(404).json({ message: "No recent posts found." });
//     }
//     res.render("home", { sortedPosts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

//* New Post route
router.post("/", async (req, res) => {
  Post.create(req.body)
    .then((post) => {
      res.status(200).json(post);
      console.log("goal creation success");
    })
    .then((postIds) => {
      res.status(200).json(postIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
