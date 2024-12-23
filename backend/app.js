const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const userModel = require("./models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bookingRoutes =require('./routes/bookingroute')

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: " user registered succesfully " });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email & password " });
    }
    // compare the provider password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email & password " });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "12hh12hcc", {
      expiresIn: "1h",
    });
    // respond with the token

    res.status(200).json({ message: "Login Succesfully ", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "12hh12hcc");
    const user = await userModel.findById(decoded.userId); // Adjust query as necessary

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bookings: user.bookings || [], // Ensure bookings is an array
    });
  } catch (error) {
    console.error("Error fetching user data", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.use('/api',bookingRoutes);
 
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
