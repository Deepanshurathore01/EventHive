import React from "react";
import firstimg from "../assets/Images/3.jpeg";
import secimg from "../assets/Images/4.avif";
import techimg from "../assets/Images/tech.png";
import liveconcet from "../assets/Images/music.avif";
import aboutpng from "../assets/Images/2.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleBookEventClick = () => {
    if (isLoggedIn) {
      navigate("/book-event");
    } else {
      alert("Please log in first");
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      alert("Please log in first");
      navigate("/login");
    }
  };

  return (
    <div className="main">
      <header className="w-full h-full" id="head">
        <nav className="container mx-auto flex items-center justify-between py-7 px-4 flex-wrap">
          <div className="text-4xl font-bold text-white">
            Event<span className="text-[#FF5A5F]">Hive</span>
          </div>
          <ul className="flex flex-wrap space-x-6 text-2xl text-white mt-4 lg:mt-0">
            <li>
              <a href="#home" className="hover:text-[#FF5A5F] hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-[#FF5A5F] hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#FF5A5F] hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#FF5A5F] hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex gap-2 mt-4 lg:mt-0">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <button className="btn bg-[#FF5A5F] text-xl text-white py-2 px-4 rounded">
                    Profile
                  </button>
                </Link>
                <Link to="/logout">
                  <button className="btn bg-[#FF5A5F] text-xl text-white py-2 px-4 rounded">
                    Logout
                  </button>
                </Link>
               
              </>
            ) : (
              <Link to="/login">
                <button className="btn bg-[#FF5A5F] text-xl text-white py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            )}
           
          </div>
        </nav>

        <div className="container w-full px-2 flex flex-col lg:flex-row items-center mt-4 mx-auto" id="home">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl px-4 font-bold mb-4">
              Make Every Event Memorable
            </h1>
            <p className="text-gray-400 text-xl lg:text-2xl px-4 mb-6">
              Plan, manage, and celebrate events effortlessly. Your journey to unforgettable experiences starts here.
            </p>
            <button className="btn bg-[#FF5A5F] text-xl lg:text-2xl text-white py-2 px-4 rounded ml-4">
              Explore Events
            </button>
          </div>
          <div className="img flex justify-center items-center mx-auto w-92 rounded-md mt-6 lg:mt-0">
            <img
              className="w-full h-full mx-auto inline-block rounded-lg"
              src={secimg}
              alt="Event Management"
            />
          </div>
        </div>
      </header>

      <section className="container mx-auto mt-10" id="events">
  <div className="text-center mb-10">
    <h2 className="text-3xl lg:text-5xl font-bold">Featured Events</h2>
    <p className="text-gray-700 pt-2 text-xl">Discover exciting events curated just for you.</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="bg-white p-6 rounded-lg shadow">
      <img src={liveconcet} alt="Concert" className="rounded mb-4" />
      <h4 className="text-xl font-bold">Live Concert</h4>
      <p className="text-gray-700 mt-2">Experience music like never before with live performances.</p>
      <a href="#" className="text-[#FF5A5F] mt-4 block">Learn More</a>
      <button onClick={handleBookEventClick} className="mt-4 bg-[#FF5A5F] text-white px-6 py-2 rounded-lg">Book Event</button>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <img src={firstimg} alt="Workshop" className="rounded mb-4" />
      <h4 className="text-xl font-bold">Interactive Workshop</h4>
      <p className="text-gray-700 mt-2">Enhance your skills with our expert-led workshops.</p>
      <a href="#" className="text-[#FF5A5F] mt-4 block">Learn More</a>
      <button onClick={handleBookEventClick} className="mt-4 bg-[#FF5A5F] text-white px-6 py-2 rounded-lg">Book Event</button>
    </div>
    <div className="bg-white p-6 rounded-lg shadow">
      <img src={techimg} alt="Conference" className="rounded mb-4" />
      <h4 className="text-xl font-bold">Tech Conference</h4>
      <p className="text-gray-700 mt-2">Network and learn from the brightest minds in the industry.</p>
      <a href="#" className="text-[#FF5A5F] mt-4 block">Learn More</a>
      <button onClick={handleBookEventClick} className="mt-4 bg-[#FF5A5F] text-white px-6 py-2 rounded-lg">Book Event</button>
    </div>
  </div>
</section>


      <section className="p-6 mt-20 flex flex-col lg:flex-row border m-2" id="about">
        <div className="lg:w-1/2 lg:pr-10 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4 text-md">
            Welcome to EventHive, your premier platform for planning, organizing, and enjoying events of all sizes.
            We bring people together to create extraordinary moments.
          </p>
          <p className="text-gray-700 mb-4 text-md">
            From concerts to workshops, we ensure every detail is taken care of so you can focus on what truly matters – the experience.
          </p>
          <button className="btn bg-[#FF5A5F] text-xl text-white py-2 px-4 rounded mt-2">
            Explore More
          </button>
        </div>
        <div className="flex items-center justify-center mx-auto w-full lg:w-1/2 h-80 mt-6 lg:mt-0">
          <img
            src={aboutpng}
            alt="About Us"
            className="rounded-lg w-2/3 object-cover"
          />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-3xl mb-2 font-bold text-white">
            Event<span className="text-[#FF5A5F]">Hive</span>
          </div>
          <div className="flex flex-wrap md:justify-between">
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="text-gray-400 hover:text-white">Home</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-gray-400 hover:text-white">Events</a>
                </li>
                <li className="mb-1">
                  <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400">123 Event Lane, Celebration City</p>
              <p className="text-gray-400">Phone: (987) 654-3210</p>
              <p className="text-gray-400">Email: support@eventhive.com</p>
            </div>
            <div className="w-full md:w-1/3 mb-4">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
