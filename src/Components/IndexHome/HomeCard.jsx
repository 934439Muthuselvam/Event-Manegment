import React from 'react';
import PropTypes from 'prop-types';

const HomeCard = ({ cardData, onEventClick, onBookNowClick }) => {
    const handleBookNowClick = (event) => {
        console.log('Book Now clicked for:', event); // Add this for debugging
        setSelectedEvent(event); // Or your state update logic
      };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData && cardData.length > 0 ? (
        cardData.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
            onClick={() => onEventClick(event)}  // Handle event click from parent component
          >
            <div className="flex justify-center py-3 md:py-5">
              <img
                src={event.imageSrc || "images/wedding.webp"}
                alt={event.title || "Event Image"}
                className="rounded-2xl"
              />
            </div>
            <div className="text-xl md:text-2xl font-bold mb-4">
              <h1 className="text-3xl uppercase">{event.title}</h1>
            </div>
            <div className="text-slate-500 mb-4">
              <p>Location: {event.city}</p>
              <p>Date: {event.startDate}</p>
            </div>
            {/* Buttons */}
            <div className="flex justify-between">
              <button className="text-blue-500 hover:text-blue-700">
                Full Details
              </button>
              <button
                className="text-green-500 hover:text-blue-500 py-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the event click on parent
                  onBookNowClick(event); // Trigger Book Now action
                  handleBookNowClick(e)
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

// Prop validation (optional but good practice)
HomeCard.propTypes = {
  cardData: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
  onBookNowClick: PropTypes.func.isRequired,
};

export default HomeCard;
