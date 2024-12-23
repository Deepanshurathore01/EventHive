const express =require('express');
const router = express.Router()
const bookingController =require('../controllers/bookingController');

router.post('/book-seat',bookingController.createBooking);

router.get('/bookings', bookingController.getBookings);


router.get('/bookings/:seatNumber', bookingController.getBookingBySeat);

module.exports = router;