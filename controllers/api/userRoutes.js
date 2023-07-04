const router = require("express").Router();
const User = require("../../models/User");
const withAuth = require("../../utils/auth");

//get users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
    console.log("users request");
  } catch (err) {
    res.status(500).json(err);
    console.log("user request failed");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {});

    if (!userData) {
      res.status(404).json({ message: "No goal found with that id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* User login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//* User logout
router.post("/logout", withAuth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//* Signup route
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, user_email, user_name, password } = req.body;

    //* Create a new user in the database
    const userData = await User.create({
      first_name,
      last_name,
      user_email,
      user_name,
      password,
    });

    //* Set the user's session and send a response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "Signup successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

module.exports = router;
