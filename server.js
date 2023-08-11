const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const routes = require("./controllers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
