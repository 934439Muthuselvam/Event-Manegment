import React, { useEffect, useState } from "react";
import { apigetevent } from "../../Shared/authentication/apievent";

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Formats date as MM/DD/YYYY
};

const EventCards = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

          <div className="text-sm text-gray-600 mb-2">
            <p><strong>Location:</strong> {event.city}, {event.state}, {event.country}</p>
            <p><strong>Address:</strong> {event.address}, {event.pinCode}</p>
            <p><strong>Category:</strong> {event.category}</p>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            <p><strong>Event Start Date:</strong> {formatDate(event.startDate)} <strong>Event End Date:</strong> {formatDate(event.endDate)}</p>
            <p><strong>Event Start Time:</strong> {event.startTime} <strong>Event End Time:</strong> {event.endTime}</p>
            <p><strong>Registration Deadline:</strong> {formatDate(event.registerLastDate)}</p>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            <p><strong>Fees:</strong></p>
            <ul className="list-disc ml-5">
              <li><strong>Businessmen Fee:</strong> ${event.businessmenFee}</li>
              <li><strong>General Fee:</strong> ${event.generalFee}</li>
              <li><strong>Audience Fee:</strong> ${event.audienceFee}</li>
            </ul>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Eligibility:</strong> {event.eligibility}</p>
            <li><strong>Avilable Seats:</strong> {event.seats}</li>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
