const router = require("express").Router();
const Post = require("../../models/Post");

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

//post route to make a new goal
router.post("/", async (req, res) => {
  Goal.create(req.body)
    .then((goal) => {
      res.status(200).json(goal);
      console.log("goal creation success");
    })
    .then((goalIds) => {
      res.status(200).json(goalIds);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

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
