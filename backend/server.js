const express = require("express"),
  cors = require("cors"),
  app = express(),
  bodyParser = require("body-parser");

// middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// connect database
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Uttam:test123@cluster0.enmab.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB is Connected");
});

// routes
app.post("/", (req, res) => {
  const User = require("./User");
  // const { username } = req.body;
  const newUser = new User(req.body);
  newUser
    .save()
    .then((data) => {
      res.status(200).send({ message: "Saved Successfully" });
    })
    .catch((err) => {
      if (err.code == 11000)
        res.status(400).send({ message: "User Already Exist" });
      else {
        res
          .status(401)
          .send({ message: "Username must be greater than 5 letters" });
      }
    });
});

app.listen(5000, () => {
  console.log("Server is listening");
});
