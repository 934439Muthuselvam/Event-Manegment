import React, { useState } from "react";
import PropTypes from "prop-types";

const HomeCard = ({ cardData, onEventClick, onBookNowClick }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats date as MM/DD/YYYY
  };
  

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData && cardData.length > 0 ? (
          cardData.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => onEventClick(event)}
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
                <p>Event Location : {event.city}</p>
                <p>Event Start Date : {formatDate(event.startDate)}</p>
              </div>
              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the event click on parent
                    handleDetailsClick(event);
                  }}
                >
                  Full Details
                </button>
                <button
                  className="text-green-500 hover:text-blue-500 py-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNowClick(event);
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

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-10 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
          >
            <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
            <div className="text-sm gap-5 mb-4">
              <p><strong>📍 Location:</strong> {selectedEvent.country},{selectedEvent.city}, {selectedEvent.state}, </p>
              <p><strong>🏠 Address:</strong> {selectedEvent.address}, {selectedEvent.pinCode}</p>
              <p><strong>📂 Category:</strong> {selectedEvent.category}</p>
              <p><strong>🗓 Event Dates:</strong> {formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}</p>
              <p><strong>⏰ Event Timing:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
              <p><strong>📅 Registration Deadline:</strong> {selectedEvent.registerLastDate}</p>
              <p><strong>💵 Fees:</strong> Businessmen: ${selectedEvent.businessmenFee}, General: ${selectedEvent.generalFee}, Audience: ${selectedEvent.audienceFee}</p>
              <p><strong>📝 Description:</strong> {selectedEvent.description}</p>
              <p><strong>🎓 Eligibility:</strong> {selectedEvent.eligibility}</p>
              <p><strong>🪑 Available Seats:</strong> {selectedEvent.seats}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Prop validation (optional but good practice)
HomeCard.propTypes = {
  cardData: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
  onBookNowClick: PropTypes.func.isRequired,
};

export default HomeCard;
