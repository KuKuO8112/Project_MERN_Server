const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const accountRoute = require("./routes").account;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

//連結mongoDB
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connecting to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use(
  "/api/account",
  passport.authenticate("jwt", { session: false }),
  accountRoute
);

app.listen(8080, () => {
  console.log("伺服器運行中port8080");
});
