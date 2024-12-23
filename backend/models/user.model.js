const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose
  .connect(`mongodb://127.0.0.1:27017/eventmanagement`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
