import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        employeeId: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        // Phone number validation: only numbers
        if (id === 'phone') {
            const regex = /^[0-9]*$/;
            if (!regex.test(value)) return;
        }

        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = {
            firstName: 'First name is required',
            lastName: 'Last name is required',
            email: 'Email is required',
            phone: 'Phone number is required',
            role: 'Role is required',
            department: 'Department is required',
            employeeId: 'Employee ID is required',
            password: 'Password is required',
            confirmPassword: 'Confirm password is required'
        };

        // 1. Check empty fields
        for (const [field, msg] of Object.entries(requiredFields)) {
            if (!formData[field]) {
                newErrors[field] = msg;
            }
        }

        // 2. Email validation
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        // 3. Password match
        if (formData.password && formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        // 4. Terms agreement
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Signup data:', formData);
            alert('Account creation successful! Redirecting to login...');
            navigate('/');
        }, 2000);
    };

    return (
        <div className="signup-page">
            <div className="signup-page__content">
                <div className="signup-page__header">
                    <div className="signup-page__logo-placeholder">
                        <img src="/src/assets/images/logo-placeholder.png" alt="City Health Office Logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                        <div style={{ display: 'none', width: '60px', height: '60px', background: 'white', borderRadius: '50%', margin: '0 auto' }}></div>
                    </div>
                    <h1 className="signup-page__title">City Health Office 3</h1>
                    <h2 className="signup-page__subtitle">Patient & Resource Management System</h2>
                </div>

                <div className="signup-card">
                    <h3 className="signup-card__title">Staff Registration</h3>

                    <form className="signup-form" onSubmit={handleSubmit} noValidate>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label required">First Name</label>
                                <div className={`input-wrapper ${errors.firstName ? 'input-error' : ''}`}>
                                    <input type="text" id="firstName" className="form-input" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} disabled={isLoading} />
                                </div>
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label required">Last Name</label>
                                <div className={`input-wrapper ${errors.lastName ? 'input-error' : ''}`}>
                                    <input type="text" id="lastName" className="form-input" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} disabled={isLoading} />
                                </div>
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label required">Email Address</label>
                            <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
                                <input type="email" id="email" className="form-input" placeholder="your.email@cho3.gov.ph" value={formData.email} onChange={handleChange} disabled={isLoading} />
                            </div>
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label required">Phone Number</label>
                            <div className={`input-wrapper ${errors.phone ? 'input-error' : ''}`}>
                                <input type="tel" id="phone" className="form-input" placeholder="09XX XXX XXXX" value={formData.phone} onChange={handleChange} disabled={isLoading} maxLength={11} />
                            </div>
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="role" className="form-label required">Role</label>
                                <div className={`input-wrapper ${errors.role ? 'input-error' : ''}`}>
                                    <select id="role" className="form-input form-select" value={formData.role} onChange={handleChange} disabled={isLoading}>
                                        <option value="" disabled>Select role</option>
                                        <option value="nurse">Nurse</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                {errors.role && <span className="error-text">{errors.role}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="department" className="form-label required">Department</label>
                                <div className={`input-wrapper ${errors.department ? 'input-error' : ''}`}>
                                    <select id="department" className="form-input form-select" value={formData.department} onChange={handleChange} disabled={isLoading}>
                                        <option value="" disabled>Select department</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="emergency">Emergency</option>
                                        <option value="cardiology">Cardiology</option>
                                    </select>
                                </div>
                                {errors.department && <span className="error-text">{errors.department}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="employeeId" className="form-label required">Employee ID</label>
                            <div className={`input-wrapper ${errors.employeeId ? 'input-error' : ''}`}>
                                <input type="text" id="employeeId" className="form-input" placeholder="CHO3-XXXX" value={formData.employeeId} onChange={handleChange} disabled={isLoading} />
                            </div>
                            {errors.employeeId && <span className="error-text">{errors.employeeId}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label required">Password</label>
                            <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="form-input"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label required">Confirm Password</label>
                            <div className={`input-wrapper ${errors.confirmPassword ? 'input-error' : ''}`}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className="form-input"
                                    placeholder="Re-enter your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-container">
                                <input type="checkbox" id="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} disabled={isLoading} />
                                <span className={`checkmark ${errors.agreeToTerms ? 'checkmark-error' : ''}`}></span>
                                <span className={`checkbox-label ${errors.agreeToTerms ? 'label-error' : ''}`}>
                                    I agree to the <a href="#" className="highlight-link">Terms of Service</a> and <a href="#" className="highlight-link">Privacy Policy</a>
                                </span>
                            </label>
                            {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
                        </div>

                        <button type="submit" className="btn-signup" disabled={isLoading}>
                            {isLoading ? (
                                <div className="btn-loading-content">
                                    <Loader2 className="spinner" size={20} />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="signup-card__footer">
                        <p>Already have an account? <Link to="/" className="login-link">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
