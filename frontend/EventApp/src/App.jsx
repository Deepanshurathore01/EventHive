import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegistrationPage } from "./components";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import BookEvent from "./components/BookingComponent";
import Profile from "./components/Profile";
import Logout from "./components/auth/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/book-event" element={<BookEvent />} />
        <Route path="/profile" element={<Profile />} />
       
      </Routes>
    </Router>
  );
};

export default App;
