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
  const { title, content, userId } = req.body; 

  try {
    const newPost = await Post.create({
      title,
      content,
      userId, 
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
 
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedPost) => {
      if (deletedPost === 1) {
        res.status(200).json({ message: "Post Deleted" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      console.error(err); 
      res.status(500).json({ message: "Internal Server Error" });
    });
});


module.exports = router;
