
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
import Landing from "./pages/Landing.jsx";
import Viewinsights from "./pages/Viewinsights.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Pagename" element={<Pagename />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path ="/Testcreatepage" element={<Testcreatepage/>}/>
        <Route path ="/Viewreport" element={<Viewreport/>}/>
        <Route path ="/Navbar" element={<Navbar/>}/>
        <Route path ="Insightspage" element={<Insightspage/>}/>
        <Route path ="Testpage" element={<Testpage/>}/>
        <Route path ="Analyticspage" element={<Analyticspage/>}/>
        <Route path ="Viewinsights" element={<Viewinsights/>}/>
        
      </Routes>
    </Router>
  );
}
