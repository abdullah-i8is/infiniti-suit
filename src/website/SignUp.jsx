import React, { useState } from 'react';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';


const countries = [
    { name: 'Afghanistan', code: 'AF', phone: 93 },
    { name: 'Aland Islands', code: 'AX', phone: 358 },
    { name: 'Albania', code: 'AL', phone: 355 },
    { name: 'Algeria', code: 'DZ', phone: 213 },
    { name: 'American Samoa', code: 'AS', phone: 1684 },
    // ...add all countries
];

const SignUpForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        yourPosition: '',
        saleBefore: '',
        wantFirst: '',
        companyName: '',
        noOfEmployess: '',
        selectCompanyType: '',
        employeeWillUse: '',
        address: '',
        postalCode: '',
        country: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateStep = (step) => {
        let isValid = true;
        const requiredFields = document.querySelectorAll(`#step-${step} input[required], #step-${step} select[required]`);
        requiredFields.forEach((field) => {
            if (!field.value) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            toast.warning('Please fill in all required fields.');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data:', formData); // Log form data for debugging

        try {
            const response = await fetch('https://infinitisuiteapi.vercel.app/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error && data.error.includes('duplicate key error')) {
                    toast.error('This email is already registered. Please use a different email.');
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                console.log('Success:', data);
                toast.success('Account created successfully!');
                // Reset form data
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    yourPosition: '',
                    saleBefore: '',
                    wantFirst: '',
                    companyName: '',
                    noOfEmployees: '',
                    selectCompanyType: '',
                    employeeWillUse: '',
                    address: '',
                    postalCode: '',
                    country: '',
                });
                event.target.reset(); // Reset form fields
                // Optionally, redirect to another page
                // window.location.href = 'http://localhost:3001/gmail';
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('This email is already registered. Please use a different email.');
        }
    };




    return (
        <>
            <Header />
            <ToastContainer /> {/* Add this line to display toasts */}
            <section className="ud-page-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-banner-content">
                                <span style={{ color: '#ddd' }}>Infiniti Suite</span>
                                <h1>Create Account</h1>
                                <p style={{ color: '#ddd' }}>
                                    Fill in the details below to create an account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="ud-contact">
                <div className="container">
                    <div className="signpwrapper" style={{ width: '40%', display: 'block', margin: '0 auto' }}>
                        <div className="ud-contact-content-wrapper wow fadeInUp" data-wow-delay=".2s">
                            <div className="step-indicator">
                                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
                                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
                                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}></div>
                            </div>
                            <ul id="progressbarahad" className="progressbarahad">
                                <li className={currentStep >= 1 ? 'active' : ''} id="account"><strong>Account</strong></li>
                                <li className={currentStep >= 2 ? 'active' : ''} id="personal"><strong>About You</strong></li>
                                <li className={currentStep >= 3 ? 'active' : ''} id="payment"><strong>Company</strong></li>
                                <li id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <br /><br /><br />
                            <div class="ud-banner-content">
                                <h1 style={{ color: "#3056d3" }}>Let's Get Started</h1>
                                <p style={{ color: "#050505" }}>First You'll need to create the Account.</p>
                            </div>
                            <form id="signup-form" onSubmit={handleSubmit}>
                                {currentStep === 1 && (
                                    <div className="form-container active" id="step-1">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name:</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Work Email:</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Set a Password:</label>
                                            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <div className="select-box">
                                                <label htmlFor="phoneNumber">Phone Number:</label>
                                                <div className="selected-option">
                                                    <div className="ahad-custom-mobile">
                                                        <strong>+44</strong>
                                                    </div>
                                                    <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
                                                </div>
                                                <div className="options">
                                                    <input type="text" className="search-box" placeholder="Search Country Name" />
                                                    <ol>
                                                        {countries.map((country) => (
                                                            <li key={country.code} onClick={() => setFormData({ ...formData, phoneNumber: `+${country.phone}` })}>
                                                                {country.name}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-buttons">
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="form-container active" id="step-2">
                                        <div className="form-group">
                                            <label htmlFor="yourPosition">Your Position:</label>
                                            <input type="text" id="yourPosition" name="yourPosition" value={formData.yourPosition} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="saleBefore">Have you used any sales tool before:</label>
                                            <input type="text" id="saleBefore" name="saleBefore" value={formData.saleBefore} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="wantFirst">What do you want to do first:</label>
                                            <select id="wantFirst" name="wantFirst" value={formData.wantFirst} onChange={handleInputChange} required>
                                                <option value="Close deals faster">Close deals faster</option>
                                                <option value="Find new leads">Find new leads</option>
                                                <option value="Manage relationships better">Manage relationships better</option>
                                                <option value="Set goals and track progress">Set goals and track progress</option>
                                                <option value="Set up a team and permissions">Set up a team and permissions</option>
                                            </select>
                                        </div>
                                        <div className="nav-buttons">
                                            <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="form-container active" id="step-3">
                                        <div className="form-group">
                                            <label htmlFor="companyName">Company Name:</label>
                                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="noOfEmployees">Number of Employees:</label>
                                            <select id="noOfEmployees" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleInputChange} required>
                                                <option value="10-50">10-50</option>
                                                <option value="50-100">50-100</option>
                                                <option value="100-200">100-200</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="selectCompanyType">Select Company Type:</label>
                                            <select id="selectCompanyType" name="selectCompanyType" value={formData.selectCompanyType} onChange={handleInputChange} required>
                                                <option value="technology-startup">Technology Startup</option>
                                                <option value="ecommerce-business">E-commerce Business</option>
                                                <option value="manufacturing-company">Manufacturing Company</option>
                                                <option value="consulting-firm">Consulting Firm</option>
                                                <option value="healthcare-services">Healthcare Services</option>
                                                <option value="financial-services">Financial Services</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeWillUse">Number of Employees who will use Infiniti Suite:</label>
                                            <select id="employeeWillUse" name="employeeWillUse" value={formData.employeeWillUse} onChange={handleInputChange} required>
                                                <option value="1-10">1-10</option>
                                                <option value="10-50">10-50</option>
                                                <option value="50-100">50-100</option>
                                            </select>
                                        </div>
                                        <div className="nav-buttons">
                                            <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>
                                            <Link to='/login'>
                                                <button type="submit" className="submit-btn">Submit</button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SignUpForm;
