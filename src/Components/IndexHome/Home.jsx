import React, { useState, useEffect } from "react";
import Header from "../Core/Header/Header";
import SearchBar from "./SearchBar";
import Footer from "../Core/Footer/Footer";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Book Show",
      description: "Experience a thrilling book show with engaging stories.",
      buttonText: "Book Now",
      image: "images/teenager-using-tablet-library.jpg",
    },
    {
      title: "Dance Music",
      description: "Enjoy electrifying dance music and groove to the beats!",
      buttonText: "Join Party",
      image:
        "images/close-up-guitar-headphone-tambourine-xylophone-headphone-radio-wooden-table-with-space-text.jpg",
    },
    {
      title: "Night Show Crackers",
      description:
        "Witness a mesmerizing night show with spectacular fireworks.",
      buttonText: "Reserve Spot",
      image: "images/freepik__expand__42228.png",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatic Slider
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleButtonClick = (buttonText) => {
    console.log("hi");
    
  };

  return (
    <div>
      <Header />
      <div className="relative w-full h-[400px]">
        {/* Carousel Container */}
        <div className="relative overflow-hidden h-[400px]">
          {/* Slide Wrapper */}
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 h-full"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black bg-opacity-50 text-white flex flex-col justify-center items-center p-6 h-[400px]">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="mb-4 text-lg md:text-xl">{slide.description}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition"
                    onClick={() => handleButtonClick(slide.buttonText)}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            className="bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-gray-700 transition"
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className="bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-gray-700 transition"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 mt-5">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-4 w-4 rounded-full border-2 ${
                index === currentIndex
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              } transition`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
      <SearchBar />
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
