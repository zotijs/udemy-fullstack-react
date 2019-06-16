const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User"); //first declare the schema
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
