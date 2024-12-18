import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiaddevent } from "../../Shared/authentication/apievent";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    address: "",  // New address field
    pinCode: "",
    category: "",
    startDate: "",
    endDate: "",
    startTime: "",  // New start time field
    endTime: "",    // New end time field
    businessmenFee: "",
    generalFee: "",
    audienceFee: "",
    timeZone: "IST",
    description: "",
    eligibility: "",
    registerLastDate: "",
    images: [], // For multiple image uploads
    highlights: [], // For dynamic highlights
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        images: [...formData.images, ...files], // Add all selected files
      });
    } else if (name === "highlight") {
      setFormData({
        ...formData,
        highlights: formData.highlights.map((highlight, index) =>
          index === value.index ? { ...highlight, text: value.text } : highlight
        ),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { text: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await apiaddevent(formDataToSend);
      console.log(response.message);
      navigate("/Output");
    } catch (error) {
      console.error("Error in creating event:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 mt-72">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Existing fields */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Event Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="social">Social</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Location Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* New Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter event address"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Enter pin code"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Start and End Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time (IST)</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time (IST)</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Registration Fees */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Registration Fees</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Businessmen Fee ($)</label>
                <input
                  type="number"
                  name="businessmenFee"
                  value={formData.businessmenFee}
                  onChange={handleChange}
                  placeholder="Enter fee in dollars"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">General Fee ($)</label>
                <input
                  type="number"
                  name="generalFee"
                  value={formData.generalFee}
                  onChange={handleChange}
                  placeholder="Enter fee in dollars"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Audience Fee ($)</label>
                <input
                  type="number"
                  name="audienceFee"
                  value={formData.audienceFee}
                  onChange={handleChange}
                  placeholder="Enter fee in dollars"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Eligibility</label>
            <select
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Eligibility</option>
              <option value="child">Family</option>
              <option value="child">Child</option>
              <option value="women">Women</option>
              <option value="adults">Adults</option>
              <option value="18+">18+</option>
            </select>
          </div>

          {/* Registration Last Date */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Registration Last Date</label>
            <input
              type="date"
              name="registerLastDate"
              value={formData.registerLastDate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Event Highlights */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Event Highlights</label>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  name="highlight"
                  value={highlight.text}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "highlight",
                        value: { index, text: e.target.value },
                      },
                    })
                  }
                  placeholder="Enter highlight"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      highlights: formData.highlights.filter((_, idx) => idx !== index),
                    })
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-500"
            >
              Add Highlight
            </button>
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Upload Event Images</label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              multiple
              accept="image/*"
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
