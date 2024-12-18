import React from 'react';
import Footer from '../Core/Footer/Footer';
import Header from '../Core/Header/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              About Our Event Management Services
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Transforming ideas into extraordinary experiences. 
              We manage every detail to make your special moments unforgettable.
            </p>
          </div>
          {/* About Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-6">
                At <span className="font-semibold">[Your Event Management Company]</span>, 
                we are a team of passionate professionals with a mission to deliver 
                flawless and memorable events. Whether it’s a corporate event, wedding, 
                or private party, we bring your vision to life.
              </p>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Commitment
              </h2>
              <p className="text-gray-600">
                We take pride in our meticulous attention to detail, innovative designs, 
                and personalized approach to ensure every event reflects your unique style and preferences.
              </p>
            </div>
            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src="images/adfs.jpg"
                alt="Event Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

         {/* Services Highlight Section */}
<div className="mb-16">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
    What We Offer
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


  <div className="text-center">
      <img src="images/college event.jpeg" alt="School and College Events" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        School and College Events
      </h3>
      <p className="text-gray-600">
        Celebrate academic milestones, cultural fests, and sporting events with ease.
      </p>
    </div>


    <div className="text-center">
      <img src="images/corprate.jpg" alt="Corporate Events" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Corporate Events
      </h3>
      <p className="text-gray-600">
        Professional and seamless management of conferences, meetings, and product launches.
      </p>
    </div>


    <div className="text-center">
      <img src="images/wedding.webp" alt="Weddings" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Weddings
      </h3>
      <p className="text-gray-600">
        From elegant ceremonies to grand receptions, we ensure your big day is picture-perfect.
      </p>
    </div>
  
  
    <div className="text-center">
      <img src="images/concert.jpg" alt="Concerts" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Concerts
      </h3>
      <p className="text-gray-600">
        Plan breathtaking concerts and live music events with exceptional stage setups and sound systems.
      </p>
    </div>


    <div className="text-center">
      <img src="images/class and workshop.jpg" alt="Classes and Workshops" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Classes & Workshops
      </h3>
      <p className="text-gray-600">
        Organize skill-enhancing workshops and classes with customized arrangements.
      </p>
    </div>


    <div className="text-center">
      <img src="images/online.jpg" alt="Online Events" className="rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Online Events
      </h3>
      <p className="text-gray-600">
        Host virtual gatherings, webinars, and live streaming events with expert coordination.
      </p>
    </div>

  </div>
</div>

        
       
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
