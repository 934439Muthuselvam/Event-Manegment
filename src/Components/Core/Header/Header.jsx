import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" sticky top-0 z-20 bg-[#b0edf8] text-black">
      <nav className="max-w-[120rem] w-full mx-auto px-5 py-7">
        <div className="flex justify-between text-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-2xl font-bold">
              Event Management
            </Link>
          </div>

          <div className="navigation hidden xl:flex gap-10 items-center">
            <Link to="/about" className="text-lg font-bold">
              About Us
            </Link>

            <Link to="/contact" className="text-lg font-bold">
              Contact Us
            </Link>

            <Link to="/admin" className="text-lg font-bold">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
