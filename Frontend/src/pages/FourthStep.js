import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stepper from '../components/Stepper';
import '../styles/FourthStep.css';

function FourthStep() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { completedData } = state || {};

    const {
        firstName = '',
        lastName = '',
        age = { month: '', day: '', year: '' },
        hasDisability = '',
        disabilityFile = null,
        selectedRadio: mealPlanChoice = '',
        selectedDays = [],
        street = '',
        city = '',
        state: deliveryState = '',
        zipCode = '',
        phoneNumber = { areaCode: '', number1: '', number2: '' },
        email = '',
    } = completedData || {};

    const deliveryAddress = `${street}, ${city}, ${deliveryState}, ${zipCode}`.trim();
    const formattedPhoneNumber = `${phoneNumber.areaCode} ${phoneNumber.number1}-${phoneNumber.number2}`.trim();

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        setErrorMessage('');

        if (userFirstName !== firstName || userLastName !== lastName) {
            setErrorMessage('The names you entered do not match the applicant\'s names.');
        } else {
            const userData = {
                firstName,
                lastName,
                age: `${age.month}/${age.day}/${age.year}`,
                disability: hasDisability === 'Yes',
                mealPlane: mealPlanChoice,
                dayReq: selectedDays.join(', '),
                adress: deliveryAddress,
                deliveryInstruction: completedData.deliveryInstructions || 'None',
                tp_num: phoneNumber.number1,
                sec_tp_num: phoneNumber.number2,
                email,
            };

            // Create FormData object to send as multipart/form-data
            const formData = new FormData();
            for (const key in userData) {
                formData.append(key, userData[key]);
            }
            // Append the disability file if it exists
            if (disabilityFile) {
                formData.append('disabilityFile', disabilityFile);
            }

            try {
                const response = await axios.post('http://localhost:8080/User/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Form submitted successfully:", response.data);
                navigate('/final-step', { state: { completedData } });

            } catch (error) {
                console.error("Error submitting form:", error);
                setErrorMessage('Failed to submit the form. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <Stepper currentStep={4} />

            <h2 className="mb-4">4. Review and Confirm</h2>

            <div className="row mb-3">
                <div className="col">
                    <strong>Applicant's Name:</strong> {firstName} {lastName}
                </div>
                <div className="col">
                    <strong>Age:</strong> {`${age.month}/${age.day}/${age.year}`}
                </div>
                <div className="col">
                    <strong>Do You Have a Disability?</strong> {hasDisability}
                </div>
                {hasDisability === 'Yes' && (
                    <div className="col">
                        <strong>Disability Documentation:</strong>{' '}
                        {disabilityFile ? disabilityFile.name : 'No File Uploaded'}
                    </div>
                )}
            </div>

            <div className="row mb-3">
                <div className="col">
                    <strong>Meal Plan Choice:</strong> {mealPlanChoice || 'Not Selected'}
                </div>
                <div className="col">
                    <strong>Days Requested:</strong>{' '}
                    {selectedDays.length ? selectedDays.join(', ') : 'None'}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <strong>Delivery Address:</strong> {deliveryAddress || 'Not Provided'}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <strong>Delivery Instructions:</strong> {completedData.deliveryInstructions || 'None'}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <strong>Phone Number:</strong>{' '}
                    {formattedPhoneNumber || 'Not Provided'}
                </div>
                <div className="col">
                    <strong>Email:</strong> {email}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col signinputCusFirst">
                    <label className='signCus'>Type Name Here to virtually Sign document</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={userFirstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="col signinputCusLast">
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                        required
                    />
                </div>
            </div>

            {errorMessage && (
                <div className="alert alert-danger mb-3" role="alert">
                    {errorMessage}
                </div>
            )}

            <div className="d-flex justify-content-between cusbtnFourth">
                <button type="button" className="btn backbtnCus" onClick={() => navigate(-1)}>
                    Back
                </button>
                <button
                    type="button"
                    className="btn NextStepBtn"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default FourthStep;
