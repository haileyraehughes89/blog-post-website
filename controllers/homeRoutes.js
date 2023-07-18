const express = require("express");
const { Post, User } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recentPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "user_email",
            "user_name",
            "password",
          ],
        },
      ],
      order: [["time", "DESC"]],
      limit: 3,
    });

    if (recentPosts.length === 0) {
      return res.status(404).json({ message: "No recent posts found." });
    }

    const posts = recentPosts.map((post) => post.get({ plain: true }));
    res.render("home", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
