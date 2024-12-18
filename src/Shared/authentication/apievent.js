import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const apiaddevent = async (datas) => {
  console.log(datas, "apiaddevent");

  const eventForm = new FormData(); // Use FormData
  eventForm.append("title", datas.title);
  eventForm.append("date", datas.date);
  eventForm.append("time", datas.time);
  eventForm.append("location", datas.location);
  eventForm.append("description", datas.description);
  if (datas.image) {
    eventForm.append("image", datas.image);
  }

  try {
    const res = await axios.post(`${apiurl()}/authevent/apiaddevent`, eventForm, {
      headers: {
        "Content-Type": "multipart/form-data", // Correct content type for FormData
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in creating event:", error);
    throw error;
  }
};

export const apigetevent = async (filters) => {
    try {
      const params = new URLSearchParams(filters); // Convert the filters into query parameters
      const res = await axios.get(`${apiurl()}/authevent/apigetevent?${params.toString()}`);
    //   console.log(filters)
      return res.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };