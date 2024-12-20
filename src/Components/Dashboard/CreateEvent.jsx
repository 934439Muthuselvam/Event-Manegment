import React, { useState } from "react";
import { apiaddevent } from "../../Shared/authentication/apievent";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

const CreateEvent = () => {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  //  countries.map((contry)=>{console.log(contry.name);
  //  })
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    city: "",
    seats: "",
    address: "",
    pinCode: "",
    category: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    businessmenFee: "",
    generalFee: "",
    audienceFee: "",
    timeZone: "IST",
    description: "",
    eligibility: "",
    registerLastDate: "",
    images: [],
    highlights: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");

    try {
      const response = await apiaddevent(formData);
      if (response.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "", phone: "" });
        navigate("/Output");
      } else {
        setErrorMessage("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setStates(State.getStatesOfCountry(selectedCountry)); // Get states based on selected country
    setCities([]); // Reset cities when country is changed
    setFormData({ ...formData, country: selectedCountry, state: "", city: "" });
  };

  // Handle state change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setCities(City.getCitiesOfState(selectedCountry, selectedState)); // Get cities based on selected state
    setFormData({ ...formData, state: selectedState, city: "" });
  };

  // Handle city change
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setFormData({ ...formData, city: selectedCity });
  };

  return (
    <div className="mb-5">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6"></h2>

        {isSubmitted ? (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              Thank you for reaching out! We'll get back to you shortly.
            </div>
            <button
              onClick={() => setIsSubmitted(false)} // Reset the form
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}
            <h1 className="text-3xl font-bold text-center mb-4">Event form</h1>

            {/* Grid Layout for the Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Event Title */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Event Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="all">All</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="education">Education</option>
                  <option value="social">Social</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Available Seats */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Seats
                </label>
                <input
                  type="text"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  placeholder="Enter available seats"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

             {/* Country Dropdown */}
             <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

               {/* State Dropdown */}
               <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={!selectedCountry} // Disable if no country is selected
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>


               {/* City Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={!selectedState} // Disable if no state is selected
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pin Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
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

              {/* Address */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
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

              {/* Start and End Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Start Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Event End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Start and End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Start Time (IST)
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event End Time (IST)
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Fees */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Fees
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Businessmen Fee ($)
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      General Fee ($)
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Audience Fee ($)
                    </label>
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
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Eligibility
                </label>
                <select
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Eligibility</option>
                  <option value="all">All</option>
                  <option value="family">Family</option>
                  <option value="child">Child</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="18+">18+</option>
                </select>
              </div>

              {/* Registration Last Date */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Last Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Event Highlights
                </label>
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
                          highlights: formData.highlights.filter(
                            (_, idx) => idx !== index
                          ),
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

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="6"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Event Images
                </label>
                <input
                  type="file"
                  name="images"
                  onChange={handleChange}
                  multiple
                  accept="image/*"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-3"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-center"
              >
                Create Event
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
