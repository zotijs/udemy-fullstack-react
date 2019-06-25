const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); //first declare the schema
require("./models/Survey");
require("./services/passport"); //then use it inside the passport.js

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

//middlewares>
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millis expiration
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
//<middlewares

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve production assets like
  //main.js or/and main.css
  app.use(express.static("client/build"));

  //express will serve the index.html file
  //if it doesn't know the route
  //handle client side (React Router) routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
