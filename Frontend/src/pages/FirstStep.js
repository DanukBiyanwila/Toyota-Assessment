import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FirstStep.css';
import Stepper from '../components/Stepper';

function FirstStep() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: { day: '', month: '', year: '' },
    isSubmittingOnBehalf: false,
    hasDisability: '',
    disabilityFile: null,
    submittingOnBehalfName: '',
    submittingOnBehalfRelation: '',
    submittingOnBehalfReason: '',
  });

  const [errors, setErrors] = useState({
    month: '',
    day: '',
    year: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes('age')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        age: { ...prev.age, [field]: value },
      }));
      validateAge(field, value); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, disabilityFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log('Combined Data for Second Step: ', formData);
  };

  const goToNextStep = () => {
    if (validateForm()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      navigate('/second-step', { state: { formData } });
    }
  };

  const validateAge = (field, value) => {
    let error = '';
    if (field === 'month') {
      const month = parseInt(value, 10);
      if (isNaN(month) || month < 1 || month > 12) {
        error = 'Please enter a valid month (1-12).';
      }
    } else if (field === 'day') {
      const day = parseInt(value, 10);
      if (isNaN(day) || day < 1 || day > 31) {
        error = 'Please enter a valid day (1-31).';
      }
    } else if (field === 'year') {
      const year = parseInt(value, 10);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        error = 'Please enter a valid year.';
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
  
    return !Object.values(errors).some((error) => error);
  };

  return (
    <div className="container mt-5">
      <Stepper currentStep={currentStep} />

      <h2 className="mb-4">1. Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label className="labaleName">
              Applicant's Name <span className="cusLable">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col cuscol">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="isSubmittingOnBehalf"
            className="form-check-input"
            checked={formData.isSubmittingOnBehalf}
            onChange={handleInputChange}
          />
          <label className="form-check-label">
            Are you submitting this application on behalf of someone else?
          </label>
        </div>

        {formData.isSubmittingOnBehalf && (
          <div>
            <div className="mb-3">
              <label className="form-label">
                If you are submitting this form for another person, please provide your information below.{' '}
                <span className="cusLable">*</span>
              </label>
              <input
                type="text"
                name="submittingOnBehalfName"
                className="form-control additionalCheckFirst"
                placeholder="First Name"
                value={formData.submittingOnBehalfName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="submittingOnBehalfRelation"
                placeholder="Last Name"
                className="form-control additionalCheckSecond"
                value={formData.submittingOnBehalfRelation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3 cuschekboxFirst">
              <label className="form-label">Relationship to applicant</label>
              <select
                name="submittingOnBehalfReason"
                className="form-control"
                value={formData.submittingOnBehalfReason}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Reason</option>
                <option value="Medical">Medical</option>
                <option value="Legal">Legal</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="labaleName">
            Age <span className="cusLable">*</span>
          </label>
          <div className="d-flex">
            <input
              type="text"
              name="age.month"
              className="form-control me-2"
              placeholder="MM"
              value={formData.age.month}
              onChange={handleInputChange}
              required
            />
            {errors.month && <div className="text-danger">{errors.month}</div>}
            <input
              type="text"
              name="age.day"
              className="form-control me-2"
              placeholder="DD"
              value={formData.age.day}
              onChange={handleInputChange}
              required
            />
            {errors.day && <div className="text-danger">{errors.day}</div>}
            <input
              type="text"
              name="age.year"
              className="form-control"
              placeholder="YYYY"
              value={formData.age.year}
              onChange={handleInputChange}
              required
            />
            {errors.year && <div className="text-danger">{errors.year}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="labaleName lablecus">
            Do you have a disability? <span className="cusLable">*</span>
          </label>
          <div className="form-check cusinput">
            <input
              type="radio"
              name="hasDisability"
              className="form-check-input"
              value="Yes"
              onChange={handleInputChange}
              checked={formData.hasDisability === 'Yes'}
              required
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check cusinput">
            <input
              type="radio"
              name="hasDisability"
              className="form-check-input"
              value="No"
              onChange={handleInputChange}
              checked={formData.hasDisability === 'No'}
              required
            />
            <label className="form-check-label">No</label>
          </div>
        </div>

        {formData.hasDisability === 'Yes' && (
          <div className="mb-3">
            <label className="cusphototxt">
              If yes, please upload documentation of your disability:
            </label>
            <div className="input-group">
              <input
                type="file"
                id="fileInput"
                className="form-control-file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className="btn btn-secondary">
                Choose File
              </label>
              {formData.disabilityFile && (
                <span className="ms-2">{formData.disabilityFile.name}</span>
              )}
              <button type="button" className="btn btn-secondary cusbtn">
                Upload
              </button>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn backbtn"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          >
            Back
          </button>
          <button
            type="button"
            className="btn NextStepBtn"
            onClick={goToNextStep}
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

export default FirstStep;
