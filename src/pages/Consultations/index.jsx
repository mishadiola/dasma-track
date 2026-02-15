import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Plus, Calendar, User, Edit, Archive,
    ChevronLeft, ChevronRight, X, Save, FileText, Stethoscope,
    Clock, AlertCircle, ChevronDown
} from 'lucide-react';

// Predefined consultation types
const CONSULTATION_TYPES = [
    'General Checkup',
    'Follow-up',
    'Consultation',
    'Routine Checkup',
    'Procedure',
    'Vaccination',
    'Prenatal Checkup',
    'Pediatric Consultation',
    'Emergency'
];

// Generate mock consultation data
const generateMockConsultations = () => {
    const patients = [
        'Maria Santos', 'Juan Dela Cruz', 'Jose Rizal', 'Andres Bonifacio',
        'Gabriela Silang', 'Antonio Luna', 'Melchora Aquino', 'Emilio Aguinaldo',
        'Apolinario Mabini', 'Teresa Magbanua', 'Coco Martin', 'Anne Curtis',
        'Mish Diola', 'Jane Tadeo', 'Naomi Magsino', 'Safia Baig'
    ];

    const doctors = ['Dr. Reyes', 'Dr. Cruz', 'Dr. Santos', 'Dr. Garcia', 'Dr. Mendoza'];

    const notes = [
        'Patient is healthy, no issues found.',
        'Blood pressure monitoring - within normal range.',
        'Prescribed medication for mild condition.',
        'Recommended follow-up in 2 weeks.',
        'Patient is compliant with treatment.',
        'Vaccination administered successfully.',
        'Referred to specialist for further evaluation.',
        'Routine checkup completed.',
        'Patient advised on lifestyle changes.',
        'No significant findings.'
    ];

    return patients.map((patient, index) => {
        const date = new Date();
        const daysBack = Math.floor(Math.random() * 180);
        date.setDate(date.getDate() - daysBack);

        return {
            id: `C-2024-${String(index + 1).padStart(5, '0')}`,
            patientId: `P-2024-${String(index + 1).padStart(6, '0')}`,
            patientName: patient,
            date: date.toISOString().split('T')[0],
            dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            doctor: doctors[Math.floor(Math.random() * doctors.length)],
            reason: CONSULTATION_TYPES[Math.floor(Math.random() * CONSULTATION_TYPES.length)],
            notes: notes[Math.floor(Math.random() * notes.length)],
            prescription: Math.random() > 0.5 ? 'Prescribed medication' : 'No prescription',
            status: Math.random() > 0.2 ? 'Completed' : 'Pending'
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

const Consultations = () => {
    const navigate = useNavigate();
    const [consultations, setConsultations] = useState(generateMockConsultations());
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterConsultationType, setFilterConsultationType] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal states
    const [isNewConsultationModalOpen, setIsNewConsultationModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isPatientNotFoundModalOpen, setIsPatientNotFoundModalOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Patient search states
    const [patientSearchTerm, setPatientSearchTerm] = useState('');
    const [showPatientDropdown, setShowPatientDropdown] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Form data
    const [newConsultationData, setNewConsultationData] = useState({
        patientName: '',
        date: new Date().toISOString().split('T')[0],
        doctor: '',
        reason: '',
        notes: '',
        prescription: ''
    });

    const [editFormData, setEditFormData] = useState({});

    // Get unique patients and doctors for filters
    const uniquePatients = [...new Set(consultations.map(c => c.patientName))].sort();
    const uniqueDoctors = [...new Set(consultations.map(c => c.doctor))].sort();

    // Check for pending consultation on component mount
    React.useEffect(() => {
        const pendingConsultation = sessionStorage.getItem('pendingConsultation');
        if (pendingConsultation) {
            const data = JSON.parse(pendingConsultation);
            setNewConsultationData(data);
            setPatientSearchTerm(data.patientName);
            setSelectedPatient(data.patientName);
            sessionStorage.removeItem('pendingConsultation');
            // Open the consultation modal automatically
            setTimeout(() => {
                setIsNewConsultationModalOpen(true);
            }, 500);
        }
    }, []);

    // Filter patients based on search term
    const filteredPatientsList = uniquePatients.filter(patient =>
        patient.toLowerCase().includes(patientSearchTerm.toLowerCase())
    );

    // Filter consultations
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch =
            consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.reason.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDoctor = !filterDoctor || consultation.doctor === filterDoctor;
        const matchesType = !filterConsultationType || consultation.reason === filterConsultationType;

        const consultationDate = new Date(consultation.date);
        const matchesDate = !filterDate || consultation.date === filterDate;

        return matchesSearch && matchesDoctor && matchesType && matchesDate;
    });

    // Pagination
    const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentConsultations = filteredConsultations.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm('');
        setFilterDoctor('');
        setFilterConsultationType('');
        setFilterDate('');
        setCurrentPage(1);
    };

    // Patient selection handlers
    const handlePatientSearch = (e) => {
        setPatientSearchTerm(e.target.value);
        setShowPatientDropdown(true);
        setSelectedPatient(null);
    };

    const selectPatient = (patient) => {
        setSelectedPatient(patient);
        setPatientSearchTerm(patient);
        setNewConsultationData({ ...newConsultationData, patientName: patient });
        setShowPatientDropdown(false);
    };

    // New Consultation handlers
    const openNewConsultationModal = () => {
        setNewConsultationData({
            patientName: '',
            date: new Date().toISOString().split('T')[0],
            doctor: '',
            reason: '',
            notes: '',
            prescription: ''
        });
        setPatientSearchTerm('');
        setSelectedPatient(null);
        setIsNewConsultationModalOpen(true);
    };

    const handleNewConsultationChange = (e) => {
        setNewConsultationData({ ...newConsultationData, [e.target.name]: e.target.value });
    };

    const saveNewConsultation = () => {
        // Validate patient exists
        if (!uniquePatients.includes(newConsultationData.patientName)) {
            setIsNewConsultationModalOpen(false);
            setIsPatientNotFoundModalOpen(true);
            return;
        }

        const newConsultation = {
            id: `C-2024-${String(consultations.length + 1).padStart(5, '0')}`,
            patientId: `P-2024-${String(consultations.length + 1).padStart(6, '0')}`,
            patientName: newConsultationData.patientName,
            date: newConsultationData.date,
            dateFormatted: new Date(newConsultationData.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            }),
            doctor: newConsultationData.doctor,
            reason: newConsultationData.reason,
            notes: newConsultationData.notes,
            prescription: newConsultationData.prescription,
            status: 'Completed'
        };

        setConsultations([newConsultation, ...consultations]);
        setIsNewConsultationModalOpen(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    // Handle redirect to patient creation
    const handleCreatePatientFirst = () => {
        setIsPatientNotFoundModalOpen(false);
        // Store consultation data in sessionStorage to resume after patient creation
        sessionStorage.setItem('pendingConsultation', JSON.stringify(newConsultationData));
        navigate('/patients/new');
    };

    // Edit handlers
    const openEditModal = (consultation) => {
        setSelectedConsultation(consultation);
        setEditFormData({ ...consultation });
        setIsEditModalOpen(true);
        setSaveSuccess(false);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const saveEdit = () => {
        setTimeout(() => {
            setConsultations(prev => prev.map(c => c.id === selectedConsultation.id ? {
                ...editFormData,
                dateFormatted: new Date(editFormData.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                })
            } : c));
            setSaveSuccess(true);
            setTimeout(() => {
                setIsEditModalOpen(false);
                setSelectedConsultation(null);
                setSaveSuccess(false);
            }, 1000);
        }, 500);
    };

    // Archive handlers
    const openArchiveModal = (consultation) => {
        setSelectedConsultation(consultation);
        setIsArchiveModalOpen(true);
    };

    const confirmArchive = () => {
        setConsultations(prev => prev.filter(c => c.id !== selectedConsultation.id));
        setIsArchiveModalOpen(false);
        setSelectedConsultation(null);
        if (currentConsultations.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="consultations-page">
            {/* Header */}
            <div className="consultations-header">
                <div className="header-title">
                    <div className="icon-circle">
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <h1>Consultations</h1>
                        <p>Manage patient consultations and medical records</p>
                    </div>
                </div>
                <button className="btn-new-consultation" onClick={openNewConsultationModal}>
                    <Plus size={20} />
                    New Consultation
                </button>
            </div>

            {/* Success Message */}
            {saveSuccess && (
                <div className="success-banner">
                    <AlertCircle size={20} />
                    Consultation saved successfully!
                </div>
            )}

            {/* Filters Bar */}
            <div className="filters-bar">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search by patient, doctor, or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" size={18} />
                </div>

                <div className="date-filter">
                    <input
                        type="date"
                        className="date-input-custom"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        placeholder="Filter by Date"
                    />
                    <Calendar className="calendar-icon" size={18} />
                </div>

                <div className="type-filter">
                    <select
                        value={filterConsultationType}
                        onChange={(e) => setFilterConsultationType(e.target.value)}
                        className="type-select"
                    >
                        <option value="">All Types</option>
                        {CONSULTATION_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <ChevronDown className="select-icon" size={18} />
                </div>

                <div className="filter-container">
                    <button
                        className={`btn-filter ${showFilterDropdown ? 'active' : ''}`}
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    >
                        <Filter size={18} />
                        More Filters
                    </button>
                    {showFilterDropdown && (
                        <div className="filter-dropdown">
                            <div className="filter-option">
                                <label>Doctor</label>
                                <select value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)}>
                                    <option value="">All Doctors</option>
                                    {uniqueDoctors.map(doctor => (
                                        <option key={doctor} value={doctor}>{doctor}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="consultations-summary">
                Showing {currentConsultations.length} of {filteredConsultations.length} consultations
                {(searchTerm || filterDoctor || filterConsultationType || filterDate) && (
                    <button className="btn-clear-filters" onClick={clearFilters}>
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Table */}
            {currentConsultations.length > 0 ? (
                <div className="table-container">
                    <table className="consultations-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Type</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentConsultations.map((consultation) => (
                                <tr key={consultation.id} className="table-row-anim">
                                    <td>
                                        <button
                                            className="patient-name-link"
                                            onClick={() => navigate(`/patients/${consultation.patientId}`)}
                                        >
                                            <User size={16} />
                                            {consultation.patientName}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="date-cell">
                                            <Calendar size={14} />
                                            {consultation.dateFormatted}
                                        </div>
                                    </td>
                                    <td className="text-dark font-bold">{consultation.doctor}</td>
                                    <td>
                                        <span className="type-badge">{consultation.reason}</span>
                                    </td>
                                    <td className="notes-cell">{consultation.notes}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon btn-edit"
                                                title="Edit"
                                                onClick={() => openEditModal(consultation)}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                className="btn-icon btn-archive"
                                                title="Archive"
                                                onClick={() => openArchiveModal(consultation)}
                                            >
                                                <Archive size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <FileText className="empty-icon" size={64} />
                    <h3>No consultations found</h3>
                    <p>Try adjusting your search or filters</p>
                    {(searchTerm || filterDoctor || filterConsultationType || filterDate) && (
                        <button className="btn-clear-filters" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination-footer">
                    <div className="pagination-controls">
                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="page-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* New Consultation Modal */}
            {isNewConsultationModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content modern-modal">
                        <button className="btn-close-absolute" onClick={() => setIsNewConsultationModalOpen(false)}>
                            <X size={20} />
                        </button>

                        <div className="modal-header-modern">
                            <div className="modal-icon-bg">
                                <Plus size={24} />
                            </div>
                            <h2>New Consultation</h2>
                            <p>Record a new patient consultation</p>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="form-group">
                                <label>Patient Name <span className="required">*</span></label>
                                <div className="patient-search-container">
                                    <input
                                        type="text"
                                        value={patientSearchTerm}
                                        onChange={handlePatientSearch}
                                        onFocus={() => setShowPatientDropdown(true)}
                                        className="form-input"
                                        placeholder="Search for a patient..."
                                        autoComplete="off"
                                    />
                                    <Search className="patient-search-icon" size={18} />
                                    {showPatientDropdown && filteredPatientsList.length > 0 && (
                                        <div className="patient-dropdown">
                                            {filteredPatientsList.map(patient => (
                                                <div
                                                    key={patient}
                                                    className="patient-option"
                                                    onClick={() => selectPatient(patient)}
                                                >
                                                    <User size={16} />
                                                    {patient}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Date <span className="required">*</span></label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newConsultationData.date}
                                        onChange={handleNewConsultationChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>Doctor <span className="required">*</span></label>
                                    <select
                                        name="doctor"
                                        value={newConsultationData.doctor}
                                        onChange={handleNewConsultationChange}
                                        className="form-input"
                                    >
                                        <option value="">Select Doctor</option>
                                        {uniqueDoctors.map(doctor => (
                                            <option key={doctor} value={doctor}>{doctor}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Consultation Type <span className="required">*</span></label>
                                <select
                                    name="reason"
                                    value={newConsultationData.reason}
                                    onChange={handleNewConsultationChange}
                                    className="form-input"
                                >
                                    <option value="">Select Type</option>
                                    {CONSULTATION_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    name="notes"
                                    value={newConsultationData.notes}
                                    onChange={handleNewConsultationChange}
                                    className="form-input"
                                    rows="3"
                                    placeholder="Additional notes or observations"
                                />
                            </div>

                            <div className="form-group">
                                <label>Prescription</label>
                                <textarea
                                    name="prescription"
                                    value={newConsultationData.prescription}
                                    onChange={handleNewConsultationChange}
                                    className="form-input"
                                    rows="2"
                                    placeholder="Prescribed medications or treatments"
                                />
                            </div>
                        </div>

                        <div className="modal-footer-modern">
                            <button className="btn-cancel-modern" onClick={() => setIsNewConsultationModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn-save-modern" onClick={saveNewConsultation}>
                                <Save size={18} />
                                Save Consultation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && selectedConsultation && (
                <div className="modal-overlay">
                    <div className="modal-content modern-modal">
                        <button className="btn-close-absolute" onClick={() => setIsEditModalOpen(false)}>
                            <X size={20} />
                        </button>

                        <div className="modal-header-modern">
                            <div className="modal-icon-bg">
                                <Edit size={24} />
                            </div>
                            <h2>Edit Consultation</h2>
                            <p>{selectedConsultation.patientName}</p>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={editFormData.date}
                                        onChange={handleEditChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>Doctor</label>
                                    <select
                                        name="doctor"
                                        value={editFormData.doctor}
                                        onChange={handleEditChange}
                                        className="form-input"
                                    >
                                        {uniqueDoctors.map(doctor => (
                                            <option key={doctor} value={doctor}>{doctor}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Consultation Type</label>
                                <select
                                    name="reason"
                                    value={editFormData.reason}
                                    onChange={handleEditChange}
                                    className="form-input"
                                >
                                    {CONSULTATION_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    name="notes"
                                    value={editFormData.notes}
                                    onChange={handleEditChange}
                                    className="form-input"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>Prescription</label>
                                <textarea
                                    name="prescription"
                                    value={editFormData.prescription}
                                    onChange={handleEditChange}
                                    className="form-input"
                                    rows="2"
                                />
                            </div>
                        </div>

                        <div className="modal-footer-modern">
                            {saveSuccess ? (
                                <div className="success-message">
                                    <Save size={18} />
                                    Saved successfully!
                                </div>
                            ) : (
                                <>
                                    <button className="btn-cancel-modern" onClick={() => setIsEditModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn-save-modern" onClick={saveEdit}>
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Archive Modal */}
            {isArchiveModalOpen && selectedConsultation && (
                <div className="modal-overlay">
                    <div className="modal-content compact-modal">
                        <div className="modal-header">
                            <h3>Archive Consultation</h3>
                            <button className="btn-close" onClick={() => setIsArchiveModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <p>Are you sure you want to archive this consultation for <strong>{selectedConsultation.patientName}</strong>?</p>
                        <p className="text-muted">This consultation will be moved to the archive.</p>
                        <div className="modal-footer-compact">
                            <button className="btn-cancel" onClick={() => setIsArchiveModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn-confirm-archive" onClick={confirmArchive}>
                                <Archive size={18} />
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient Not Found Modal */}
            {isPatientNotFoundModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content warning-modal">
                        <div className="modal-header-warning">
                            <div className="warning-icon-bg">
                                <AlertCircle size={48} />
                            </div>
                            <h3>Patient Record Not Found</h3>
                            <p>The patient "{newConsultationData.patientName}" does not exist in the system.</p>
                        </div>
                        <div className="modal-body-warning">
                            <p>To create a consultation, you must first create a patient record.</p>
                            <p className="text-muted">You will be redirected to the Patient Creation Form. After saving the patient, you can continue creating the consultation.</p>
                        </div>
                        <div className="modal-footer-compact">
                            <button className="btn-cancel" onClick={() => setIsPatientNotFoundModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn-create-patient" onClick={handleCreatePatientFirst}>
                                <User size={18} />
                                Create Patient Record
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Consultations;
