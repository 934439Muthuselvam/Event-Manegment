import React, { useEffect, useState } from "react";
import { apigetevent } from "../../Shared/authentication/apievent";

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats date as MM/DD/YYYY
};

const CardDetails = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await apigetevent();
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {events.map((event) => (
        <div
          key={event._id}
          className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-green-500 text-white transform hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
  
          <div className="text-sm mb-2">
            <p><strong>📍 Location:</strong> {event.city}, {event.state}, {event.country}</p>
            <p><strong>🏠 Address:</strong> {event.address}, {event.pinCode}</p>
            <p><strong>📂 Category:</strong> {event.category}</p>
          </div>
  
          <div className="text-sm mb-2">
            <p><strong>🗓 Event Dates:</strong> {formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
            <p><strong>⏰ Event Timing:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>📅 Registration Deadline:</strong> {formatDate(event.registerLastDate)}</p>
          </div>
  
          <div className="text-sm mb-2">
            <p><strong>💵 Fees:</strong></p>
            <ul className="list-disc ml-5">
              <li><strong>Businessmen:</strong> ${event.businessmenFee}</li>
              <li><strong>General:</strong> ${event.generalFee}</li>
              <li><strong>Audience:</strong> ${event.audienceFee}</li>
            </ul>
          </div>
  
          <div className="text-sm mb-2">
            <p><strong>📝 Description:</strong> {event.description}</p>
            <p><strong>🎓 Eligibility:</strong> {event.eligibility}</p>
            <p><strong>🪑 Available Seats:</strong> {event.seats}</p>
          </div>
  
          <button className="mt-4 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Register Now
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default CardDetails;
