import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const apiaddevent = async (datas) => {
  console.log(datas, "apiaddevent");

  const eventForm = new FormData(); // Use FormData

  // Append form fields
  eventForm.append("title", datas.title);
  eventForm.append("description", datas.description);
  eventForm.append("country", datas.country);
  eventForm.append("state", datas.state);
  eventForm.append("city", datas.city);
  eventForm.append("seats", datas.seats);
  eventForm.append("address", datas.address);
  eventForm.append("pinCode", datas.pinCode);
  eventForm.append("category", datas.category);
  eventForm.append("startDate", datas.startDate);
  eventForm.append("endDate", datas.endDate);
  eventForm.append("startTime", datas.startTime);
  eventForm.append("endTime", datas.endTime);
  eventForm.append("businessmenFee", datas.businessmenFee);
  eventForm.append("generalFee", datas.generalFee);
  eventForm.append("audienceFee", datas.audienceFee);
  eventForm.append("eligibility", datas.eligibility);
  eventForm.append("registerLastDate", datas.registerLastDate);

  if (datas.image) {
    eventForm.append("image", datas.image);
  }

  try {
    const res = await axios.post(`${apiurl()}/authevent/apiaddevent`, eventForm, {
      headers: {
        "Content-Type": "multipart/form-data", // Correct content type for FormData
      },
    });

    // Log and return the response
    console.log('Event created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error("Error in creating event:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};


export const apigetevent = async (filters) => {
    try {
      const params = new URLSearchParams(filters); // Convert the filters into query parameters
      const res = await axios.get(`${apiurl()}/authevent/apigetevent?${params.toString()}`);
    //   console.log(filters)
      return res.data.events || [];;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };