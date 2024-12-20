import React, { useEffect, useState } from 'react';
import HomeCard from './HomeCard';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
import { apigetevent } from '../../Shared/authentication/apievent';

const SearchBar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ title: '', location: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  const getEvents = async () => {
    try {
      setLoading(true);
      const data = await apigetevent();
      setEvents(data.events || data); // Handle data format accordingly
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents(); // Fetch events on component mount
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      (filters.title === '' || event.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.location === '' || event.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const calculateTotalAmount = (attendeeType, numTickets) => {
    let ticketPrice = 0;
    if (attendeeType === 'Businessman') ticketPrice = selectedEvent.businessmenFee;
    if (attendeeType === 'General') ticketPrice = selectedEvent.generalFee;
    if (attendeeType === 'Audience') ticketPrice = selectedEvent.audienceFee;

    setTotalAmount(ticketPrice * numTickets);
  };

  const handleBookingSubmit = (email, attendeeType, numTickets) => {
    setIsBookingConfirmed(true); // Trigger booking confirmation
  };

  const handleCloseConfirmation = () => {
    setIsBookingConfirmed(false); // Close confirmation
  };

  // Function to show booking form
  const handleBookNowClick = (event) => {
    setSelectedEvent(event);
    setIsFormVisible(true); // Show form
  };

  // Function to close booking form
  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide form
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Search by Event Name"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {loading && <p>Loading events...</p>}
      <HomeCard cardData={filteredEvents} onEventClick={handleEventClick} onBookNowClick={handleBookNowClick} />

      {/* Show the booking form if the form visibility is true */}
      {selectedEvent && isFormVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <BookingForm
            selectedEvent={selectedEvent}
            calculateTotalAmount={calculateTotalAmount}
            onSubmit={handleBookingSubmit}
            onClose={handleCloseForm} // Close form button
          />
        </div>
      )}

      {/* Show booking confirmation if booking is successful */}
      {isBookingConfirmed && (
        <BookingConfirmation eventTitle={selectedEvent.title} onClose={handleCloseConfirmation} />
      )}
    </div>
  );
};

export default SearchBar;
