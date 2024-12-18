import React, { useEffect, useState } from "react";
import { apigetevent } from "../../Shared/authentication/apievent";

const SearchBar = () => {
  const [events, setEvents] = useState([]); // State for storing event data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    location: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [attendeeType, setAttendeeType] = useState(""); // State for attendee type
  const [numTickets, setNumTickets] = useState(1); // State for number of tickets
  const [totalAmount, setTotalAmount] = useState(0); // State for calculated total amount
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState(""); // State for user's email
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State for booking confirmation message

  // Fetch events from API
  const getEvents = async () => {
    try {
      setLoading(true); // Set loading state
      const data = await apigetevent(); // Fetch data from API

      if (data && Array.isArray(data)) {
        setEvents(data); // Set events directly if data is an array
      } else if (data && data.events) {
        setEvents(data.events); // Handle nested response
      } else {
        console.error("Unexpected data format:", data);
        setError("Unexpected data format received");
      }
    } catch (err) {
      console.error("Error fetching events:", err); // Log error
      setError("Failed to load events"); // Set error state
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  useEffect(() => {
    getEvents(); // Fetch events on component mount
  }, []);

  // Filter events based on search criteria
  const filteredEvents = events.filter((event) => {
    return (
      (filters.title === "" ||
        event.title?.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.date === "" || event.date === filters.date) &&
      (filters.location === "" ||
        event.location?.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle selecting an event and opening the modal
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event details
    setAttendeeType(""); // Reset attendee type
    setNumTickets(1); // Reset number of tickets
    setTotalAmount(0); // Reset total amount
    setEmail(""); // Reset email
    setIsModalOpen(true); // Open the modal
    setBookingConfirmed(false); // Reset booking confirmation message
  };

  // Handle changes in attendee type
  const handleAttendeeTypeChange = (e) => {
    setAttendeeType(e.target.value);
    calculateTotalAmount(e.target.value, numTickets);
  };

  // Handle changes in the number of tickets
  const handleNumTicketsChange = (e) => {
    setNumTickets(e.target.value);
    calculateTotalAmount(attendeeType, e.target.value);
  };

  // Calculate the total amount based on attendee type and number of tickets
  const calculateTotalAmount = (type, tickets) => {
    const ticketPrice = type === "Audience" ? 200 : type === "Businessman" ? 500 : 0;
    const total = ticketPrice * tickets;
    setTotalAmount(total);
  };

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission (Booking)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setBookingConfirmed(true); // Set booking confirmation message
      setIsModalOpen(false); // Close the modal after submission
    } else {
      alert("Please enter a valid email address.");
    }
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setBookingConfirmed(false); // Reset confirmation state if modal is closed
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex bg-gray-100 flex-col">
        <div className="p-6 mt-20 bg-gradient-to-r rounded-md w-full h-screen">
          {/* Search and Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="title"
              placeholder="Search by Event Name"
              value={filters.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="location"
              placeholder="Filter by Location"
              value={filters.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Loading state */}
          {loading && <p>Loading events...</p>}

          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display event cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex justify-center py-3 md:py-5">
                    <img
                      src={event.imageSrc || "images/teenager-using-tablet-library.jpg"}
                      alt={event.title || "Event Image"}
                      className="rounded-2xl"
                    />
                  </div>

                  <div className="text-xl md:text-2xl font-bold mb-4">
                    <h1 className="text-3xl uppercase">{event.title}</h1>
                  </div>

                  <div className="text-slate-500 mb-4">
                    <p>Location: {event.location}</p>
                    <p>Date: {event.date}</p>
                  </div>

                  {/* Book Now Link */}
                  <div className="text-green-500 hover:text-blue-500 py-3 cursor-pointer">
                    <p>Book Now</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </div>

        {/* Modal for Booking Form */}
        {isModalOpen && selectedEvent && !bookingConfirmed && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[30%]">
              <h2 className="text-xl font-bold mb-4 text-center">Booking Form</h2>
              <p><strong>Event:</strong> {selectedEvent.title}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Date:</strong> {selectedEvent.date}</p>

              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="block text-sm">Attendee Type</label>
                  <select
                    value={attendeeType}
                    onChange={handleAttendeeTypeChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Attendee Type</option>
                    <option value="Audience">Audience - 200 RS</option>
                    <option value="Businessman">Businessman - 500 RS</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm">Number of Tickets</label>
                  <input
                    type="number"
                    value={numTickets}
                    onChange={handleNumTicketsChange}
                    min="1"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mt-4">
                  <p><strong>Total Amount: </strong>{totalAmount} RS</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Submit Booking
                  </button>

                  <button
                    onClick={closeModal}
                    className=" bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Display Confirmation Message */}
        {bookingConfirmed && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[30%]">
              <h2 className="text-xl font-bold mb-4 text-center">Got Your Tickets!</h2>
              <p className="text-center">Thank you for booking your tickets for the event.</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
