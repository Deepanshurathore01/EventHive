const bookingModel = require("../models/booking.model");
const mongoose = require("mongoose");

// creating a booking
module.exports.createBooking = async (req, res) => {
  try {
    const { seatNumber, name, email, phone } = req.body;

    // Check if seat is already booked
    const existingBooking = await bookingModel.findOne({ seatNumber });
    if (existingBooking) {
      return res.status(400).json({ message: "This seat is already booked." });
    }
    

    // Create a new booking
    const newBooking = new bookingModel({
      seatNumber,
      name,
      email,
      phone,
      time: new Date(),
    });

    await newBooking.save();
    res.status(200).json({ message: "Seat booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking the seat." });
  }
};

module.exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate( "name email");
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getBookingBySeat = async (req, res) => {
  const seatNumber = parseInt(req.params.seatNumber); // Convert seatNumber to a number

  if (isNaN(seatNumber)) {
    return res.status(400).json({ error: "Invalid seat number" });
  }

  try {
    const booking = await bookingModel.findOne({ seatNumber });
    if (!booking) {
      return res.status(400).json({ error: "Seat not found" });
    }
    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ error: "Server error" });
  }
};
