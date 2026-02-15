import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Edit, Archive, User, Phone, Mail, MapPin,
    Calendar, Heart, Pill, AlertCircle, FileText, Activity,
    Droplet, Clock
} from 'lucide-react';

const PatientProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showArchiveModal, setShowArchiveModal] = useState(false);

    // Placeholder patient data
    const patient = {
        id: id || 'P-2024-001234',
        name: 'Maria Santos',
        age: 34,
        gender: 'Female',
        bloodType: 'O+',
        status: 'Active',
        dateOfBirth: '5/15/1990',
        phone: '0917 123 4567',
        email: 'maria.santos@email.com',
        address: {
            street: '123 Barangay Street',
            barangay: 'Salawag',
            city: 'Dasmariñas',
            zipCode: '4114'
        },
        emergencyContact: {
            name: 'Juan Santos',
            relationship: 'Son',
            phone: '0918 765 4321'
        },
        medical: {
            lastVisit: 'Nov 5, 2024',
            history: 'Hypertension (Diagnosed 2024), Previous appendectomy (2015)',
            allergies: 'Penicillin, Shellfish',
            currentMedications: 'Losartan 50mg (1x daily), Vitamin D3 1000IU',
            notes: 'Patient is compliant with medication. Blood pressure monitoring recommended.'
        },
        stats: {
            totalConsultations: 4,
            lastCheckup: 'Nov 5',
            upcoming: 4
        },
        visitHistory: [
            {
                date: '11/5/2024',
                reason: 'General Checkup',
                doctor: 'Dr. Reyes',
                notes: 'Blood pressure monitoring - healthy'
            },
            {
                date: '10/12/2024',
                reason: 'Follow-up',
                doctor: 'Dr. Cruz',
                notes: 'Blood pressure monitoring'
            },
            {
                date: '9/20/2024',
                reason: 'Consultation',
                doctor: 'Dr. Reyes',
                notes: 'Mild hypertension - medication prescribed'
            }
        ]
    };

    const handleArchive = () => {
        setShowArchiveModal(false);
        // Simulate archive action
        alert('Patient archived successfully');
        navigate('/patients');
    };

    return (
        <div className="patient-profile-page">
            {/* Header */}
            <div className="profile-header">
                <button className="btn-back" onClick={() => navigate('/patients')}>
                    <ArrowLeft size={20} />
                    Back to Patient List
                </button>
                <div className="header-actions">
                    <button className="btn-edit">
                        <Edit size={18} />
                        Edit Profile
                    </button>
                    <button className="btn-archive" onClick={() => setShowArchiveModal(true)}>
                        <Archive size={18} />
                        Archive
                    </button>
                </div>
            </div>

            {/* Patient Overview Card */}
            <div className="patient-overview-card">
                <div className="patient-avatar">
                    <div className="avatar-circle">
                        <span>{patient.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                </div>
                <div className="patient-header-info">
                    <h1>{patient.name}</h1>
                    <p className="patient-id">Patient ID: {patient.id}</p>
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                    </span>
                </div>
                <div className="patient-quick-info">
                    <div className="info-item">
                        <User size={18} />
                        <div>
                            <span className="label">Age</span>
                            <span className="value">{patient.age} years old</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <Activity size={18} />
                        <div>
                            <span className="label">Gender</span>
                            <span className="value">{patient.gender}</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <Droplet size={18} />
                        <div>
                            <span className="label">Blood Type</span>
                            <span className="value">{patient.bloodType}</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <Calendar size={18} />
                        <div>
                            <span className="label">Date of Birth</span>
                            <span className="value">{patient.dateOfBirth}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <FileText size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Consultations</span>
                        <span className="stat-value">{patient.stats.totalConsultations}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon checkup">
                        <Calendar size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Last Checkup</span>
                        <span className="stat-value">{patient.stats.lastCheckup}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon upcoming">
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Upcoming</span>
                        <span className="stat-value">{patient.stats.upcoming}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="profile-content-grid">
                {/* Contact Information */}
                <div className="info-section">
                    <div className="section-header">
                        <Phone size={20} />
                        <h2>Contact Information</h2>
                    </div>
                    <div className="section-content">
                        <div className="info-row">
                            <Phone size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Phone</span>
                                <span className="info-value">{patient.phone}</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <Mail size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Email</span>
                                <span className="info-value">{patient.email}</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <MapPin size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Address</span>
                                <span className="info-value">
                                    {patient.address.street}, {patient.address.barangay}<br />
                                    {patient.address.city}, {patient.address.zipCode}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="info-section">
                    <div className="section-header">
                        <AlertCircle size={20} />
                        <h2>Emergency Contact</h2>
                    </div>
                    <div className="section-content">
                        <div className="info-row">
                            <User size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Name</span>
                                <span className="info-value">{patient.emergencyContact.name}</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <Heart size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Relationship</span>
                                <span className="info-value">{patient.emergencyContact.relationship}</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <Phone size={16} className="row-icon" />
                            <div>
                                <span className="info-label">Phone</span>
                                <span className="info-value">{patient.emergencyContact.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medical Information */}
                <div className="info-section medical-section">
                    <div className="section-header">
                        <Activity size={20} />
                        <h2>Medical Summary</h2>
                    </div>
                    <div className="section-content">
                        <div className="medical-item">
                            <div className="medical-label">
                                <Calendar size={16} />
                                Last Visit Date
                            </div>
                            <div className="medical-value">{patient.medical.lastVisit}</div>
                        </div>
                        <div className="medical-item">
                            <div className="medical-label">
                                <FileText size={16} />
                                Medical History
                            </div>
                            <div className="medical-value">{patient.medical.history}</div>
                        </div>
                        <div className="medical-item alert">
                            <div className="medical-label">
                                <AlertCircle size={16} />
                                Known Allergies
                            </div>
                            <div className="medical-value">{patient.medical.allergies}</div>
                        </div>
                        <div className="medical-item">
                            <div className="medical-label">
                                <Pill size={16} />
                                Current Medications
                            </div>
                            <div className="medical-value">{patient.medical.currentMedications}</div>
                        </div>
                        <div className="medical-item">
                            <div className="medical-label">
                                <FileText size={16} />
                                Notes
                            </div>
                            <div className="medical-value">{patient.medical.notes}</div>
                        </div>
                    </div>
                </div>

                {/* Visit History */}
                <div className="info-section visit-history-section">
                    <div className="section-header">
                        <Clock size={20} />
                        <h2>Recent Consultations</h2>
                    </div>
                    <div className="section-content">
                        <div className="visit-timeline">
                            {patient.visitHistory.map((visit, index) => (
                                <div key={index} className="visit-item">
                                    <div className="visit-date">
                                        <Calendar size={14} />
                                        {visit.date}
                                    </div>
                                    <div className="visit-details">
                                        <h4>{visit.reason}</h4>
                                        <p className="visit-doctor">Dr. {visit.doctor}</p>
                                        <p className="visit-notes">{visit.notes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Archive Modal */}
            {showArchiveModal && (
                <div className="modal-overlay">
                    <div className="modal-content archive-modal">
                        <h3>Archive Patient Record</h3>
                        <p>Are you sure you want to archive <strong>{patient.name}</strong>?</p>
                        <p className="modal-note">This record will be moved to the archive and can be restored later.</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowArchiveModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-confirm-archive" onClick={handleArchive}>
                                Archive Patient
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientProfile;
