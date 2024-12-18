
const express = require('express');
const mongoose = require("mongoose");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const app = express();
require("dotenv").config();
const port = 8000;

app.use(express.json());
const uri = "mongodb+srv://Sunderam:"+process.env.MONGO_PASSWORD+ "@cluster0.7f2xnkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri)
.then(()=>{
  console.log("Connected to Mongo!");
}).catch(err=>
  console.log("Error while connecting to Mongo",err.message)
);

// setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyissupposedtobeSecret";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/", (req, res) => { 
  res.send("Hello World!");
});
app.use("./auth",authRoutes)

app.listen(port, () => {
    console.log("Server is running on port " + port);
});