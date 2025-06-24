import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import NoteState from "./Context/Notes/NoteState"; // Import the NoteState component


function App() {  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
