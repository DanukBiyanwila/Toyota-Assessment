import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import FirstStep from "./pages/FirstStep";
import SecondStep from "./pages/SecondStep";
import ThirdStep from "./pages/ThirdStep";
import FourthStep from "./pages/FourthStep";
import FinalPage from "./pages/FinalPage";

function App() {
  return (
   
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<FirstStep />} />
            <Route path="/second-step" element={<SecondStep />} />
            <Route path="/third-step" element={<ThirdStep />} />
            <Route path="/fourth-step" element={<FourthStep />} />
            <Route path="/final-step" element={<FinalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    
  );
}

export default App;
