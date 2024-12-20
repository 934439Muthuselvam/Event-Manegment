
import Navbar from "../Components/Home/Navbar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/IndexHome/Home";
import CreateEvent from "../Components/Dashboard/CreateEvent";

import CourierOutput from "../Components/Dashboard/EventOutput";
import About from "../Components/IndexHome/About";
import Contact_us from "../Components/IndexHome/Contact_us";
import Sidebar from "../Components/Home/Sidebar";
// import HomeCard from "../Components/IndexHome/HomeCard";


function Layout() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row  bg-[#f3f4f6]">
      <div className="2xl:w-1/6 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar/>
      </div>

      <div className="flex-1 overflow-y-auto ">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
    return (
      <div className='w-full min-h-screen bg-[#f3f4f6] '>
          <div>
          
      
          </div>
        <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/create-event' element={<CreateEvent />} />
            <Route path="/Output" element={<CourierOutput/>}/>
            {/* <Route path="/eventlist" element={<HomeCard/>}/> */}
          

            
            
            
          </Route>

          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact_us/>}/>
         

          
        </Routes>
        </BrowserRouter>
      </div>
    )
  }