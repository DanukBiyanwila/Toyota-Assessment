
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Stepper from '../components/Stepper';
import { useNavigate, useLocation } from 'react-router-dom';

function SecondStep() {
    const navigate = useNavigate();
    const { state } = useLocation(); 
    const { formData } = state || {}; 

    const [additionalData, setAdditionalData] = useState({
    additionalField1: '',
    additionalField2: '',
    selectedRadio: '', 
    selectedDays: [], 
  });

  


  

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setAdditionalData({ ...additionalData, selectedRadio: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setAdditionalData((prev) => {
      const selectedDays = prev.selectedDays.includes(value)
        ? prev.selectedDays.filter((day) => day !== value)
        : [...prev.selectedDays, value];
      return { ...prev, selectedDays };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = { ...formData, ...additionalData }; 
    console.log('Combined Data for Third Step: ', completeData);
    
    navigate('/third-step', { state: { completeData } }); 
    
  };

  return (
    <div className="container mt-5">
      <Stepper currentStep={2} />
      <h2 className="mb-4">2. Requested Services</h2>
      <form onSubmit={handleSubmit}>
        
        <h4 className="mb-3">Choose the Meal Plan you would like to receive</h4>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="radio"
              name="selectedRadio"
              value="Full 21meals"
              className="form-check-input"
              onChange={handleRadioChange}
              checked={additionalData.selectedRadio === 'Full 21meals'}
            />
            <label className="form-check-label">Full 21meals</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="selectedRadio"
              value="Lunch and Dinner"
              className="form-check-input"
              onChange={handleRadioChange}
              checked={additionalData.selectedRadio === 'Lunch and Dinner'}
            />
            <label className="form-check-label">Lunch and Dinner</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="selectedRadio"
              value="Only Dinner"
              className="form-check-input"
              onChange={handleRadioChange}
              checked={additionalData.selectedRadio === 'Only Dinner'}
            />
            <label className="form-check-label">Only Dinner</label>
          </div>
        </div>

       
        <h4 className="mb-3">Days Requested</h4>
        <div className="mb-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div className="form-check" key={day}>
              <input
                type="checkbox"
                className="form-check-input"
                value={day}
                onChange={handleCheckboxChange}
                checked={additionalData.selectedDays.includes(day)}
              />
              <label className="form-check-label">{day}</label>
            </div>
          ))}
        </div>

   
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn backbtn"
            onClick={() => navigate(-1)} 
          >
            Back
          </button>
          <button
            type="submit"
            className="btn NextStepBtn"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecondStep;
