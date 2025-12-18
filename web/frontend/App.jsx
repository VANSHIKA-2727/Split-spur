import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Pagename from "./pages/Pagename.jsx";

import Testcreatepage from "./pages/Testcreatepage.jsx";
import Viewreport from "./pages/Viewreport.jsx";
import Analyticspage from "./pages/Analyticspage.jsx";
import Insightspage from "./pages/Insightspage.jsx";
import Testpage from "./pages/Testpage.jsx";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Viewinsights from "./pages/Viewinsights.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import Start from "./pages/Start.jsx";
import Navbar1 from "./components/Navbar1.jsx";

import React from "react";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/Pagename" element={<Pagename />} />
      
        <Route path ="/Testcreatepage" element={<Testcreatepage/>}/>
        <Route path ="/Viewreport" element={<Viewreport/>}/>
        <Route path ="/Navbar" element={<Navbar/>}/>
        <Route path ="Insightspage" element={<Insightspage/>}/>
        <Route path ="Testpage" element={<Testpage/>}/>
        <Route path ="Analyticspage" element={<Analyticspage/>}/>
        <Route path ="Viewinsights" element={<Viewinsights/>}/>
        <Route path ="Features" element={<Features/>}/>
        <Route path="Pricing" element={<Pricing/>}/>
        <Route path="Start" element={<Start/>} />
        <Route path="Navbar1" element={<Navbar1/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
        
        

      </Routes>
    </Router>
  );
}
