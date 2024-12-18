import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
export const apiaddcontact=async(datas)=>{
    // console.log(datas)
    const  res=await axios.post(`${apiurl()}/authcontact/apiaddcontact`,datas,{headers:{}})
    return res.data
}
