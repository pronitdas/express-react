const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const restify = require("express-restify-mongoose");
const app = express();
const router = express.Router();
var path = require("path");
app.use(bodyParser.json());
app.use(methodOverride());
var mongoose = require("mongoose");
var mongo = require("mongoose");
import Promise from "bluebird";

const bcrypt = Promise.promisifyAll(require("bcrypt"));

var db = mongo.connect("mongodb://localhost:27017/database", function(
  err,
  response
) {
  if (err) {
    console.log("Failed to connect to " + db);
  } else {
    console.log("Connected to " + db, " + ", response);
  }
});

app.use(router);

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 12
  },
  deck: {},
  email: { type: String, required: true },
  profilePicture: { data: Buffer, contentType: String },
  alternatePicture: { type: String, required: false }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hashAsync(this.password, 16.5);

    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});
UserSchema.methods.passwordIsValid = function(password) {
  try {
    return bcrypt.compareAsync(password, this.password);
  } catch (err) {
    throw err;
  }
};
var model = mongoose.model("user", userSchema, "user");

//api for Delete data from database
app.post("/api/Removedata", function(req, res) {
  model.remove({ _id: req.body.id }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Deleted..!!" });
    }
  });
});

//api for Insert data to database
app.post("/api/savedata", function(req, res) {
  var mod = new model(req.body);
  req.files.foreach(file => {
    sharp(file.name)
      .resize(1280, 960)
      .toFile(`1280x960${file.name}`, function(err) {
        // output.jpg is a 200 pixels wide and 200 pixels high image
        // containing a scaled and cropped version of input.jpg
      });
  });

  mod.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Inserted..!!" });
    }
  });
});
