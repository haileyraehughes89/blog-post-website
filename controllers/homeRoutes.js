const express = require("express");
const { Post, User } = require("../models");
const router = express.Router();
const withAuth = require("../utils/auth");
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

router.get("/dashboard", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    const loggedUserId = req.session.user_id;

    try {
      const posts = await Post.findAll({
        where: { userId: loggedUserId },
      });
      res.render("dashboard", {
        posts: posts.map((post) => post.toJSON()),
        logged_in: true,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    console.log("backend successfully caught not logged in");
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/newpost", (req, res) => {
  res.render("newPost");
});

module.exports = router;
