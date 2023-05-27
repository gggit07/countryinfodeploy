import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import Countries from "./components/Countries";

const CountryDetails = React.lazy(() => import("./components/CountryDetails"));
const NotFound = React.lazy(() => import("./components/NotFound"));

function App() {
  const [mode, setMode] = useState(false);

  const handleModeSite = () => {
    setMode(!mode);
  };

  return (
    <div id={mode ? "light-mode" : "dark-mode"}>
      <CustomNavbar mode={handleModeSite} />
      <Routes>
        <Route exact path="/" element={<Countries />} />
        <Route path="/countries/:cca2" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
