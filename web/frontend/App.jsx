import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage.jsx";
import Pagename from "./pages/Pagename.jsx";
import Signup from "./pages/Signup.jsx";
import Testcreatepage from "./pages/Testcreatepage.jsx";
import Viewreport from "./pages/Viewreport.jsx";
import Analyticspage from "./pages/Analyticspage.jsx";

import Insightspage from "./pages/Insightspage.jsx";
import Testpage from "./pages/Testpage.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/pagename" element={<Pagename />} />
        <Route path="/signup" element={<Signup />} />
        <Route path ="/testcreatepage" element={<Testcreatepage/>}/>
        <Route path ="/viewreport" element={<Viewreport/>}/>
        <Route path ="/Navbar" element={<Navbar/>}/>
        <Route path ="Insightspage" element={<Insightspage/>}/>
        <Route path ="Testpage" element={<Testpage/>}/>
        <Route path ="Analyticspage" element={<Analyticspage/>}/>
        

      </Routes>
    </Router>
  );
}
