import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookingComponent = () => {
  const [seats, setSeats] = useState(Array(50).fill(null)); // Initial 50 seats, null means available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSeatClick = (seatIndex) => {
    if (seats[seatIndex]) {
      return; // Don't open modal if the seat is already booked
    }
    setSelectedSeat(seatIndex);
    setIsModalOpen(true);
  };

  const handleBooking = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      setStatus("Please fill out all fields before booking.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/book-seat", {
        seatNumber: selectedSeat + 1, // Seat numbers start from 1
        ...userDetails,
      });
      console.log(response);
      if (response.data.message === "Seat booked successfully") {
        alert("booking confirm");
        setStatus("Seat booked successfully!");
        setSeats(
          seats.map((seat, index) =>
            index === selectedSeat ? { bookedBy: userDetails.name } : seat
          )
        );

        setUserDetails({
          name: "",
          email: "",
          phone: "",
        });

        setIsModalOpen(false);
      } else {
        setStatus(response.data.message); // Show error if any
      }
    } catch (error) {
      setStatus("Error booking the seat.");
    }
  };

  const renderSeats = () => {
    return seats.map((seat, index) => (
      <div
        key={index}
        className={`seat ${
          seat ? "bg-red-500" : "bg-green-500"
        } p-4 text-center rounded-lg cursor-pointer transition duration-300 transform hover:scale-105`}
        onClick={() => handleSeatClick(index)}
      >
        <span className="text-white font-bold">
          {seat ? "Booked" : `Seat ${index + 1}`}
        </span>
      </div>
    ));
  };

  return (
    <div className="booking-container max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Event Seat Booking
      </h1>

      <div className="seats-grid grid grid-cols-10 gap-4 mb-8">
        {renderSeats()}
      </div>

      {isModalOpen && (
        <div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Book Seat {selectedSeat + 1}
            </h2>
            <input
              type="text"
              name="name"
              className="block w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Your Name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              className="block w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Your Email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              className="block w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Your Phone"
              value={userDetails.phone}
              onChange={handleInputChange}
            />

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={handleBooking}
              >
                Book Seat
              </button>
              <button
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>

            {status && (
              <p className="text-center text-red-500 mt-4">{status}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
