// import { BrowserRouter } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { NavMenu } from "@shopify/app-bridge-react";
// import Routes from "./Routes";
// import '@shopify/polaris/build/esm/styles.css';

// import { QueryProvider, PolarisProvider } from "./components";

// export default function App() {
//   // Any .tsx or .jsx files in /pages will become a route
//   // See documentation for <Routes /> for more info
//   const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
//     eager: true,
//   });
//   const { t } = useTranslation();

//   return (
//     <PolarisProvider>
//       <BrowserRouter>
//         <QueryProvider>
//           <NavMenu>
//             <a href="/" rel="home" />
//             <a href ="/loginpage">{t("NavigationMenu.loginPage")}</a>
//             <a href ="signup">{t("NavigationMenu.signUp")}</a>
//             <a href="/pagename">{t("NavigationMenu.pageName")}</a>
//             <a href="testcreatepage">{t("NavigationMenu.testcreatepage")}</a>
//             <a href="viewreport">{t("NavigationMenu.viewreport")}</a>
//             <a href="testpage">{t("NavigationMenu.testpage")}</a>
//             <a href ="insightspage">{t("NavigationMenu.insightspage")}</a>
//             <a href ="analyticspage">{t("NavigationMenu.analyticspage")}</a>

//           </NavMenu>
//           <Routes pages={pages} />
//         </QueryProvider>
//       </BrowserRouter>
//     </PolarisProvider>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage.jsx";
import Pagename from "./pages/Pagename.jsx";
import Signup from "./pages/Signup.jsx";  
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/pagename" element={<Pagename />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
