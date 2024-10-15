import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { jsPDF } from 'jspdf'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FinalStep.css'
const FinalStep = () => {
    const { state } = useLocation(); 
    const { completedData } = state || {}; 
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleGenerateReport = () => {
        const doc = new jsPDF();

        doc.text("User Report", 20, 20);
        doc.text(`Applicant's Name: ${completedData.firstName} ${completedData.lastName}`, 20, 30);
        doc.text(`Age: ${completedData.age.month}/${completedData.age.day}/${completedData.age.year}`, 20, 40);
        doc.text(`Do You Have a Disability?: ${completedData.hasDisability}`, 20, 50);
        if (completedData.hasDisability === 'Yes') {
            doc.text(`Disability Documentation: ${completedData.disabilityFile ? completedData.disabilityFile.name : 'No File Uploaded'}`, 20, 60);
        }
        doc.text(`Meal Plan Choice: ${completedData.selectedRadio}`, 20, 70);
        doc.text(`Days Requested: ${completedData.selectedDays.join(', ') || 'None'}`, 20, 80);
        doc.text(`Delivery Address: ${completedData.street}, ${completedData.city}, ${completedData.state}, ${completedData.zipCode}`, 20, 90);
        doc.text(`Delivery Instructions: ${completedData.deliveryInstructions || 'None'}`, 20, 100);
        doc.text(`Phone Number: ${completedData.phoneNumber.number1} - ${completedData.phoneNumber.number2}`, 20, 110);
        doc.text(`Email: ${completedData.email}`, 20, 120);

        doc.save("user_report.pdf");

       
        setSuccessMessage('Report generated successfully! You can return to the homepage now.');
    };

    const handleReturnHomepage = () => {
        setSuccessMessage(''); 
        navigate('/'); 
    };

    return (
        <div className="container mt-5">
            <Stepper currentStep={6} /> 

            <h2 className="mb-4 lastTitle"> <center>Thank You For Submitting Your Application</center></h2>

          
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <div className="mb-4 cusp1">
            <center>  
                <p>
                Thank you for submitting your application.
                A confirmation email has been sent to the email address <br/> you provided. Please retain this for your records.
                  
                </p>
            </center> 
            </div>

            <div className="mb-4 cusp2">
               <center>
                <p>
                If you have any inquiries or require assistance regarding your application, you may
                contact us during <br/> business hours at<span className='linkCus1'> 1-800-123-4567</span> or via email at<span className='linkCus2'> support@email.com</span> appreciate your interest 
                in the <br/> Meals on Wheels program, dedicated to supporting individuals in need of supplemental meal services.
                   
                </p>
                </center>
            </div>

            <div className="mb-4 cusp3">
              <center>
                <p><u>
                Privacy Notice: Your personal information will be kept confidential and used only for processing 
                your <br/> application. It will not be shared with third parties without your consent.
                </u>
                </p>
                </center>
            </div>

            <div className="d-flex justify-content-between">
                
                <button
                    className="btn  backbtnlast"
                    onClick={handleReturnHomepage}
                >
                    Return Homepage
                </button>
                <button
                    className="btn  reportbtn"
                    onClick={handleGenerateReport}
                >
                    Print Confirmation
                </button>
            </div>
        </div>
    );
};

export default FinalStep;
