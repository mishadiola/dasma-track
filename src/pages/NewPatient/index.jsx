import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Phone, Mail, Heart, Pill, AlertCircle, Save, X, Activity, Droplet } from 'lucide-react';

const NewPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        bloodType: '',
        address: '',
        city: 'Dasmariñas',
        barangay: '',
        zipCode: '4114',
        phone: '',
        email: '',
        emergencyName: '',
        emergencyPhone: '',
        medicalHistory: '',
        medications: '',
        allergies: '',
        status: 'Active'
    });

    const dasmaBarangays = [
        "Burol", "Langkaan I", "Langkaan II", "Paliparan I", "Paliparan II", "Paliparan III",
        "Sabang", "Salawag", "Salitran I", "Salitran II", "Salitran III", "Salitran IV",
        "Sampaloc I", "Sampaloc II", "Sampaloc III", "Sampaloc IV", "Sampaloc V",
        "San Agustin I", "San Agustin II", "San Agustin III",
        "San Andres I", "San Andres II",
        "San Antonio De Padua I", "San Antonio De Padua II",
        "San Dionisio", "San Esteban", "San Francisco I", "San Francisco II",
        "San Isidro Labrador I", "San Isidro Labrador II",
        "San Jose", "San Juan", "San Lorenzo Ruiz I", "San Lorenzo Ruiz II",
        "San Luis I", "San Luis II", "San Manuel I", "San Manuel II",
        "San Mateo", "San Miguel I", "San Miguel II", "San Nicolas I", "San Nicolas II",
        "San Peter I", "San Peter II", "San Roque", "San Simon",
        "Santa Cristina I", "Santa Cristina II", "Santa Cruz I", "Santa Cruz II",
        "Santa Fe", "Santa Lucia", "Santa Maria", "Santo Cristo", "Santo Niño I", "Santo Niño II",
        "Victoria Reyes", "Zone I", "Zone IA", "Zone II", "Zone III", "Zone IV"
    ].sort();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone number formatting
        if (name === 'phone' || name === 'emergencyPhone') {
            // Remove non-digits
            const cleaned = value.replace(/\D/g, '');
            // Limit to 11 digits
            const truncated = cleaned.slice(0, 11);

            // Format as 09XX XXX XXXX
            let formatted = truncated;
            if (truncated.length > 4) {
                formatted = `${truncated.slice(0, 4)} ${truncated.slice(4)}`;
            }
            if (truncated.length > 7) {
                formatted = `${formatted.slice(0, 8)} ${truncated.slice(7)}`;
            }

            setFormData(prev => ({ ...prev, [name]: formatted }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Auto-calculate age if DOB changes
        if (name === 'dateOfBirth') {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (value) {
                setFormData(prev => ({ ...prev, [name]: value, age: age.toString() }));
            }
        }

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.barangay) newErrors.barangay = 'Barangay is required';

        // Phone validation
        const phoneRegex = /^09\d{9}$/;
        const cleanPhone = formData.phone.replace(/\s/g, '');
        if (!formData.phone) {
            newErrors.phone = 'Phone Number is required';
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.phone = 'Invalid format. Use 09XX XXX XXXX';
        }

        if (!formData.emergencyName) newErrors.emergencyName = 'Emergency Contact Name is required';

        const cleanEmergencyPhone = formData.emergencyPhone.replace(/\s/g, '');
        if (!formData.emergencyPhone) {
            newErrors.emergencyPhone = 'Emergency Contact Phone is required';
        } else if (!phoneRegex.test(cleanEmergencyPhone)) {
            newErrors.emergencyPhone = 'Invalid format. Use 09XX XXX XXXX';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setShowSuccess(true);
                // Redirect after success
                setTimeout(() => {
                    navigate('/patients');
                }, 1500);
            }, 1000);
        } else {
            // Scroll to top to see errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="new-patient-page">
            <div className="page-header">
                <div className="header-content">
                    <div className="icon-wrapper">
                        <User size={32} />
                    </div>
                    <div>
                        <h1>New Patient Registration</h1>
                        <p>Complete all required fields to register a new patient</p>
                    </div>
                </div>
                <button className="btn-cancel-top" onClick={() => navigate('/patients')}>
                    <X size={20} /> Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="patient-form">

                {/* Personal Information */}
                <section className="form-section">
                    <div className="section-header">
                        <h2>Personal Information</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name <span className="required">*</span></label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className={errors.firstName ? 'error' : ''}
                            />
                            {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Last Name <span className="required">*</span></label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className={errors.lastName ? 'error' : ''}
                            />
                            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Date of Birth <span className="required">*</span></label>
                            <div className="input-icon-wrapper">
                                <Calendar size={18} className="input-icon" />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className={errors.dateOfBirth ? 'error' : ''}
                                />
                            </div>
                            {errors.dateOfBirth && <span className="error-msg">{errors.dateOfBirth}</span>}
                        </div>

                        <div className="form-group small">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                readOnly
                                className="readonly"
                                placeholder="Auto"
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender <span className="required">*</span></label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={errors.gender ? 'error' : ''}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <span className="error-msg">{errors.gender}</span>}
                        </div>

                        <div className="form-group">
                            <label>Blood Type</label>
                            <div className="input-icon-wrapper">
                                <Droplet size={18} className="input-icon" />
                                <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
                                    <option value="">Select Blood Type</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="form-section">
                    <div className="section-header">
                        <h2>Contact Information</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Address <span className="required">*</span></label>
                            <div className="input-icon-wrapper">
                                <MapPin size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street address, Apartment, etc."
                                    className={errors.address ? 'error' : ''}
                                />
                            </div>
                            {errors.address && <span className="error-msg">{errors.address}</span>}
                        </div>

                        <div className="form-group">
                            <label>Barangay</label>
                            <select
                                name="barangay"
                                value={formData.barangay}
                                onChange={handleChange}
                                className={errors.barangay ? 'error' : ''}
                            >
                                <option value="">Select Barangay</option>
                                {dasmaBarangays.map(brgy => (
                                    <option key={brgy} value={brgy}>{brgy}</option>
                                ))}
                            </select>
                            {errors.barangay && <span className="error-msg">{errors.barangay}</span>}
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} readOnly className="readonly" />
                        </div>

                        <div className="form-group">
                            <label>Zip Code</label>
                            <input type="text" name="zipCode" value={formData.zipCode} readOnly className="readonly" />
                        </div>

                        <div className="form-group">
                            <label>Phone Number <span className="required">*</span></label>
                            <div className="input-icon-wrapper">
                                <Phone size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="09XX XXX XXXX"
                                    className={errors.phone ? 'error' : ''}
                                />
                            </div>
                            {errors.phone && <span className="error-msg">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-icon-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="patient@example.com" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Emergency Contact Name <span className="required">*</span></label>
                            <input
                                type="text"
                                name="emergencyName"
                                value={formData.emergencyName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className={errors.emergencyName ? 'error' : ''}
                            />
                            {errors.emergencyName && <span className="error-msg">{errors.emergencyName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Emergency Contact Phone <span className="required">*</span></label>
                            <div className="input-icon-wrapper">
                                <Phone size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                    placeholder="09XX XXX XXXX"
                                    className={errors.emergencyPhone ? 'error' : ''}
                                />
                            </div>
                            {errors.emergencyPhone && <span className="error-msg">{errors.emergencyPhone}</span>}
                        </div>
                    </div>
                </section>

                {/* Medical Information */}
                <section className="form-section">
                    <div className="section-header">
                        <h2>Medical Information</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="form-grid full-grid">
                        <div className="form-group full-width">
                            <label>Medical History</label>
                            <div className="input-icon-wrapper top-align">
                                <Activity size={18} className="input-icon" />
                                <textarea
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleChange}
                                    placeholder="List any past surgeries, illnesses, or conditions..."
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Current Medications</label>
                            <div className="input-icon-wrapper top-align">
                                <Pill size={18} className="input-icon" />
                                <textarea
                                    name="medications"
                                    value={formData.medications}
                                    onChange={handleChange}
                                    placeholder="List current medications and dosages..."
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label className="text-warning">Known Allergies</label>
                            <div className="input-icon-wrapper top-align">
                                <AlertCircle size={18} className="input-icon warning-icon" />
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    placeholder="List any known allergies (food, drug, latex, etc.)..."
                                    rows="2"
                                    className="warning-input"
                                ></textarea>
                            </div>
                            <span className="info-text">Important: Please list all known allergies to prevent adverse reactions</span>
                        </div>
                    </div>
                </section>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate('/patients')}>Cancel</button>
                    <button type="submit" className="btn-save" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span>Saving...</span>
                        ) : (
                            <>
                                <Save size={20} /> Save Patient
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Success Overlay */}
            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-content">
                        <div className="success-icon">
                            <Save size={40} />
                        </div>
                        <h2>Registration Successful!</h2>
                        <p>New patient record has been created.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPatient;
