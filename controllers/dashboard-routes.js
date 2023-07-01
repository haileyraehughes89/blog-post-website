const router = require("express").Router();
const Dashboard = require("../models/Dashboard");

// get all dishes
router.get("/dashboard/:id", async (req, res) => {
  try {
    const dashData = await Dashboard.findByPk(req.params.id, { raw: true });
    // const dash = dashData.get({ plain: true });
    console.log(dashData);
    res.render("dashboard", { dashData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// get one dish
// router.get("/dish/:num", async (req, res) => {
//   return res.render("dish", dishes[req.params.num - 1]);
// });
