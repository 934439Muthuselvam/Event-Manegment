import React from 'react';

const BookingConfirmation = ({ eventTitle, onClose }) => {
  return (
    <div>
      <h2>Booking Confirmed!</h2>
      <p>Your tickets for {eventTitle} have been successfully booked.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookingConfirmation;
