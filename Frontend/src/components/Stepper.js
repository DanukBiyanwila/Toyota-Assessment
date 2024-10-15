// src/components/Stepper.js
import React from 'react';
import '../styles/Stepper.css'; 

const Stepper = ({ currentStep }) => {
  const steps = [1, 2, 3, 4, 5]; 

  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
        >
          <div className="circle">{step}</div>
          {index < steps.length - 1 && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
