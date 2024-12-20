import React, { useState } from 'react';

const BookingForm = ({ selectedEvent, calculateTotalAmount, onSubmit, onClose }) => {
  const [attendeeType, setAttendeeType] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [idProof, setIdProof] = useState(null);

  const handleAttendeeTypeChange = (e) => {
    setAttendeeType(e.target.value);
    calculateTotalAmount(e.target.value, numTickets); // Recalculate total when attendee type changes
  };

  const handleNumTicketsChange = (e) => {
    setNumTickets(e.target.value);
    calculateTotalAmount(attendeeType, e.target.value); // Recalculate total when number of tickets changes
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleIdProofChange = (e) => {
    setIdProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && name && address && idProof) {
      // Create the data object
      const formData = {
        name,
        address,
        email,
        attendeeType,
        numTickets,
        idProof: idProof.name, // Storing only file name for simplicity, you can also store the file itself
      };

      // Store data in localStorage
      localStorage.setItem('bookingData', JSON.stringify(formData));

      // Optionally, send data via POST request
      const data = new FormData();
      data.append('name', name);
      data.append('address', address);
      data.append('email', email);
      data.append('attendeeType', attendeeType);
      data.append('numTickets', numTickets);
      data.append('idProof', idProof);

      try {
        const response = await fetch('https://your-api-endpoint.com/submit', {
          method: 'POST',
          body: data, // Sending the data as FormData to include file upload
        });

        if (response.ok) {
          alert('Booking submitted successfully!');
        } else {
          alert('Failed to submit booking. Please try again.');
        }
      } catch (error) {
        alert('An error occurred while submitting the form.');
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in all fields and upload ID proof.');
    }
  };

  return (
    <div className="w-[30%] bg-white shadow-xl rounded-lg p-6 mt-8 relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-2 text-gray-700rounded-full p-2"
      >
        <img src="images/close.png" alt="close"  className='w-10'/>
      </button>
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Event Booking Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        {/* Attendee Type Selection */}
        <div className="mb-4">
          <label htmlFor="attendeeType" className="block text-sm font-medium text-gray-700">Attendee Type</label>
          <select
            id="attendeeType"
            value={attendeeType}
            onChange={handleAttendeeTypeChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          >
            <option value="">Select attendee type</option>
            <option value="Businessman">Businessman</option>
            <option value="General">General</option>
            <option value="Audience">Audience</option>
          </select>
        </div>

        {/* Number of Tickets */}
        <div className="mb-4">
          <label htmlFor="numTickets" className="block text-sm font-medium text-gray-700">Number of Tickets</label>
          <input
            type="number"
            id="numTickets"
            value={numTickets}
            onChange={handleNumTicketsChange}
            className="w-full p-3 border rounded-lg mt-1"
            min="1"
            required
          />
        </div>

        {/* ID Proof Upload */}
        <div className="mb-4">
          <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
          <input
            type="file"
            id="idProof"
            onChange={handleIdProofChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
