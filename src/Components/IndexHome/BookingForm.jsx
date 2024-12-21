import React, { useState } from 'react';
import { apiaddbooking } from '../../Shared/authentication/apibooking';



const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    attendeeType: '',
    numTickets: '',
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idProof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiaddbooking(formData);
      // Assuming your API responds with a message
      if (response.message === 'Booking successfully created.') {
        alert('Booking submitted successfully!');
      } else {
        alert('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);  // Log the error for debugging
      alert('An error occurred while submitting the form.');
    }
  };
  


  return (
    <div className="w-[30%] bg-white shadow-xl rounded-lg p-6 mt-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-2 text-gray-700 rounded-full p-2"
      >
        <img src="images/close.png" alt="close" className="w-10" />
      </button>
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Event Booking Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Attendee Type</label>
          <select
            name="attendeeType"
            value={formData.attendeeType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          >
            <option value="">Select attendee type</option>
            <option value="Businessman">Businessman</option>
            <option value="General">General</option>
            <option value="Audience">Audience</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Tickets</label>
          <input
            type="number"
            name="numTickets"
            value={formData.numTickets}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
          <input
            type="file"
            name="idProof"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg mt-1"
            required
          />
        </div>

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
