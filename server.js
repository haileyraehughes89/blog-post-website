const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3003;
const sequelize = require("./config/connection");
const routes = require("./controllers");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/newpost", (req, res) => {
  res.render("newPost");
});

app.use("/", routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
