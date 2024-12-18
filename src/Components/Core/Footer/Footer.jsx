import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-[85rem] w-full mx-auto px-5">
        {/* Footer Header */}
        <h2 className="text-2xl font-bold text-center mb-8">Stay Connected</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="mb-2">
              We are dedicated to providing the best courier services for all your delivery needs. Our mission is to ensure timely and secure deliveries.
            </p>
            <p>
              Trust us to deliver your packages with care and professionalism.
            </p>
          </div>

          {/* Services */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>✔️ Same-Day Delivery</li>
              <li>✔️ International Shipping</li>
              <li>✔️ Package Tracking</li>
              <li>✔️ Parcel Pickup</li>
              <li>✔️ Next-Day Delivery</li>
              <li>✔️ Express Services</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:support@courierservice.com" >support@courierservice.com</a></p>
            <p>Phone: <a href="tel:1234567890" >(123) 456-7890</a></p>
            <p>Address:vellore , Tamilnadu, India</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fa-brands fa-facebook text-2xl hover:text-blue-500 transition duration-300"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fa-brands fa-twitter text-2xl hover:text-blue-400 transition duration-300"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-square-instagram text-2xl hover:text-pink-500 transition duration-300"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin text-2xl hover:text-blue-600 transition duration-300"></i>
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Your Courier Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
