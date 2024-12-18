import React, { useEffect, useState } from "react";
import { apigetevent } from "../../Shared/authentication/apievent";

const CourierOutput = () => {
  const [events, setEvents] = useState([]); // State for storing event data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // Fetch events from API
  const getEvents = async () => {
    try {
      setLoading(true); // Set loading state
      const data = await apigetevent(); // Fetch data from API
      console.log("Fetched Events:", data); // Debug fetched data

      // If API returns data in a nested object, handle it here
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

  console.log("Current Events State:", events); // Debug events state

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex bg-gray-100 flex-col">
       

          {/* Loading state */}
          {loading && <p>Loading events...</p>}

          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display event cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events && events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title || "Untitled Event"}
                  </h3>
                  {/* <p className="text-gray-600 mb-2">
                    {event.description || "No description available"}
                  </p> */}
                  <div className="text-sm text-gray-500">
                    <p>Date: {event.date || "N/A"}</p>
                    <p>Time: {event.time || "N/A"}</p>
                    <p>Location: {event.location || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              // Display message if no events are available
              <p>No events available</p>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default CourierOutput;
