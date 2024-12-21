import axios from 'axios';
import apiurl from "../apiendpoint/apiendpoint";


export const apiaddbooking = async (formData) => {
  const bookForm = new FormData();
  
  bookForm.append("name", formData.name);
  bookForm.append("email", formData.email);
  bookForm.append("address", formData.address);
  bookForm.append("attendeeType", formData.attendeeType);
  bookForm.append("numTickets", formData.numTickets);

  if (formData.idProof) {
    bookForm.append("idProof", formData.idProof);
  }

  try {

    const response = await axios.post(`${apiurl()}/authbooking/apiaddbooking`, bookForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (response.data && response.data.success) {
      return { message: 'Booking successfully created.' };
    } else {
      return { message: 'Failed to create booking.' };
    }
  } catch (error) {
    console.error("Error while submitting booking:", error);
    throw new Error("Error while submitting booking"); 
  }
};
