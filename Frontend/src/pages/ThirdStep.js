import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stepper from '../components/Stepper';
import '../styles/ThirdStep.css';

function ThirdStep() {
    const navigate = useNavigate();
    const { state } = useLocation(); 
    const { completeData } = state || {}; 
    console.log('CompleteData: ', completeData);

    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        Apartment: '', 
        deliveryInstructions: '',
        phoneNumber: { areaCode: '', number1: '', number2: '' },
        secondaryPhoneNumber: { areaCode: '', number1: '', number2: '' },
        email: '',
    });

    const [errors, setErrors] = useState({
        phoneNumber: '',
        secondaryPhoneNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        const [type, field] = name.split('.');
        setAddressData((prev) => ({
            ...prev,
            [type]: { ...prev[type], [field]: value },
        }));
    };

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^[0-9]{3}$/; 
        return phonePattern.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const phone1Valid = validatePhoneNumber(addressData.phoneNumber.number1);
        const phone2Valid = validatePhoneNumber(addressData.secondaryPhoneNumber.number1);

        if (!phone1Valid) {
            setErrors((prev) => ({ ...prev, phoneNumber: 'Invalid primary phone number' }));
            return;
        } else {
            setErrors((prev) => ({ ...prev, phoneNumber: '' }));
        }

        if (!phone2Valid) {
            setErrors((prev) => ({ ...prev, secondaryPhoneNumber: 'Invalid secondary phone number' }));
            return;
        } else {
            setErrors((prev) => ({ ...prev, secondaryPhoneNumber: '' }));
        }

        const completedData = { ...completeData, ...addressData }; 
        console.log('Combined Data for Fourth Step: ', completedData);
        
        navigate('/fourth-step', { state: { completedData } }); 
    };

    return (
        <div className="container mt-5">
            <Stepper currentStep={3} />
            <h2 className="mb-4">3. Delivery and Contact Information </h2>
            <form onSubmit={handleSubmit}>
                <h4 className="mb-3">Delivery Address</h4>
                <div className="mb-3">
                    <input
                        type="text"
                        name="street"
                        placeholder='Street Name '
                        className="form-control streetcus"
                        value={addressData.street}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="city"
                        placeholder='City'
                        className="form-control cityCus"
                        value={addressData.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="state"
                        placeholder='State'
                        className="form-control StateCus"
                        value={addressData.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="zipCode"
                        placeholder='Postal / Zip Code '
                        className="form-control zipCus"
                        value={addressData.zipCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"></label>
                    <input
                        type="text"
                        name="Apartment"
                        placeholder='Apartment, Suite, Etc'
                        className="form-control apartmentCus"
                        value={addressData.Apartment}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        name="country"
                        className="form-select countryCus"
                        value={addressData.country}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="India">India</option>
                        <option value="UK">UK</option>
                        <option value="China">China</option>
                    </select>
                </div>

                <h6 className="mb-3 diliveryLable">Delivery Instructions : (Optional)</h6>
                <div className="mb-3">
                    <textarea
                        name="deliveryInstructions"
                        className="form-control diliveryarea"
                        rows="3"
                        placeholder='ie, condo gate, phone first, dog will eat you, etc'
                        value={addressData.deliveryInstructions}
                        onChange={handleInputChange}
                    />
                </div>

                <h5 className="mb-3 mainContacttextCus">Contact Information</h5>
                <h6 className="mb-3 numTextCus">Phone Number</h6>
                <div className="row mb-3 mainNumbers">
                    <div className="col">
                        <input
                            type="text"
                            name="phoneNumber.areaCode"
                            className="form-control mainNum1"
                            placeholder='XXX'
                            value={addressData.phoneNumber.areaCode}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="phoneNumber.number1"
                            className="form-control mainNum2"
                            placeholder='XXX'
                            value={addressData.phoneNumber.number1}
                            onChange={handlePhoneChange}
                            required
                        />
                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="phoneNumber.number2"
                            className="form-control mainNum3"
                            placeholder='XXX'
                            value={addressData.phoneNumber.number2}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                </div>

                <h6 className="mb-3">Secondary Phone Number</h6>
                <div className="row mb-3 cusSecNum">
                    <div className="col ">
                        <input
                            type="text"
                            name="secondaryPhoneNumber.areaCode"
                            className="form-control"
                            placeholder='XXX'
                            value={addressData.secondaryPhoneNumber.areaCode}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="secondaryPhoneNumber.number1"
                            className="form-control secNUm2"
                            placeholder='XXX'
                            value={addressData.secondaryPhoneNumber.number1}
                            onChange={handlePhoneChange}
                            required
                        />
                        {errors.secondaryPhoneNumber && <div className="text-danger">{errors.secondaryPhoneNumber}</div>}
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="secondaryPhoneNumber.number2"
                            className="form-control secNum3"
                            placeholder='XXX'
                            value={addressData.secondaryPhoneNumber.number2}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                </div>

                <h6 className="mb-3">Email</h6>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control emailCus"
                        value={addressData.email}
                        onChange={handleInputChange}
                        required
                    />
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

export default ThirdStep;
