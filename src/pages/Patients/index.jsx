import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Plus, Calendar, Folder, Edit, ChevronLeft, ChevronRight,
    Archive, X, Save, Trash2, User, Phone, Clock, ChevronUp, ChevronDown, RotateCcw
} from 'lucide-react';

const generateMockPatients = () => {
    const specificNames = [
        { name: 'Mish Diola', gender: 'Female' },
        { name: 'Jane Tadeo', gender: 'Female' },
        { name: 'Naomi Magsino', gender: 'Female' },
        { name: 'Safia Baig', gender: 'Female' },
    ];

    const filipinoNames = [
        { name: 'Juan Dela Cruz', gender: 'Male' },
        { name: 'Maria Santos', gender: 'Female' },
        { name: 'Jose Rizal', gender: 'Male' },
        { name: 'Andres Bonifacio', gender: 'Male' },
        { name: 'Gabriela Silang', gender: 'Female' },
        { name: 'Antonio Luna', gender: 'Male' },
        { name: 'Melchora Aquino', gender: 'Female' },
        { name: 'Emilio Aguinaldo', gender: 'Male' },
        { name: 'Apolinario Mabini', gender: 'Male' },
        { name: 'Teresa Magbanua', gender: 'Female' },
        { name: 'Coco Martin', gender: 'Male' },
        { name: 'Anne Curtis', gender: 'Female' },
        { name: 'Vice Ganda', gender: 'Male' },
        { name: 'Kathryn Bernardo', gender: 'Female' },
        { name: 'Daniel Padilla', gender: 'Male' },
        { name: 'Liza Soberano', gender: 'Female' },
        { name: 'Enrique Gil', gender: 'Male' },
        { name: 'Marian Rivera', gender: 'Female' },
        { name: 'Dingdong Dantes', gender: 'Male' },
        { name: 'Angel Locsin', gender: 'Female' },
        { name: 'Bea Alonzo', gender: 'Female' },
        { name: 'John Lloyd Cruz', gender: 'Male' },
        { name: 'Sarah Geronimo', gender: 'Female' },
        { name: 'Piolo Pascual', gender: 'Male' },
        { name: 'Regine Velasquez', gender: 'Female' },
        { name: 'Ogie Alcasid', gender: 'Male' },
        { name: 'Arianne Bautista', gender: 'Female' },
        { name: 'Alden Richards', gender: 'Male' },
        { name: 'Maine Mendoza', gender: 'Female' },
        { name: 'Julia Barretto', gender: 'Female' },
    ];

    const allNames = [...specificNames, ...filipinoNames];

    return allNames.map((person, index) => {
        // Generate random date within last 2 years
        const date = new Date();
        const daysBack = Math.floor(Math.random() * 730); // 0 to 730 days
        date.setDate(date.getDate() - daysBack);

        // Format date as YYYY-MM-DD for input compatibility
        const visitDate = date.toISOString().split('T')[0];

        // Status Logic: Inactive if visited more than 6 months (180 days) ago
        const isInactive = daysBack > 180;

        return {
            id: `2025-${String(index + 1).padStart(2, '0')}`,
            name: person.name,
            age: Math.floor(Math.random() * (70 - 18) + 18),
            gender: person.gender,
            phone: `09${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
            lastVisit: visitDate,
            status: isInactive ? 'Inactive' : 'Active'
        };
    });
};

const initialPatients = generateMockPatients();

const Patients = () => {
    const navigate = useNavigate();
    const filterRef = useRef(null);
    const [patients, setPatients] = useState(initialPatients);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'lastVisit', direction: 'desc' });

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    const itemsPerPage = 8;

    // Click outside to close filter panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilterPanel(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isFilterApplied = searchTerm !== '' || selectedDate !== '' || statusFilter !== 'all' || genderFilter !== 'all';

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedDate('');
        setStatusFilter('all');
        setGenderFilter('all');
        setCurrentPage(1);
    };

    // Filter Logic
    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phone.includes(searchTerm);

        const matchesDate = selectedDate ? patient.lastVisit === selectedDate : true;
        const matchesStatus = statusFilter === 'all' ? true : patient.status.toLowerCase() === statusFilter;
        const matchesGender = genderFilter === 'all' ? true : patient.gender.toLowerCase() === genderFilter;

        return matchesSearch && matchesDate && matchesStatus && matchesGender;
    });

    // Sorting Logic
    const sortedPatients = [...filteredPatients].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (sortConfig.key === 'age') {
            valA = parseInt(valA);
            valB = parseInt(valB);
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Pagination Logic
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatients = sortedPatients.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return <ChevronUp size={14} style={{ opacity: 0.3 }} />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="active-sort" /> : <ChevronDown size={14} className="active-sort" />;
    };

    // Handlers
    const openEditModal = (patient) => {
        setSelectedPatient(patient);
        setEditFormData({ ...patient });
        setIsEditModalOpen(true);
        setSaveSuccess(false);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const saveEdit = () => {
        setTimeout(() => {
            setPatients(prev => prev.map(p => p.id === selectedPatient.id ? editFormData : p));
            setSaveSuccess(true);
            setTimeout(() => {
                setIsEditModalOpen(false);
                setSelectedPatient(null);
                setSaveSuccess(false);
            }, 1000);
        }, 500);
    };

    const openArchiveModal = (patient) => {
        setSelectedPatient(patient);
        setIsArchiveModalOpen(true);
    };

    const confirmArchive = () => {
        setPatients(prev => prev.filter(p => p.id !== selectedPatient.id));
        setIsArchiveModalOpen(false);
        setSelectedPatient(null);
    };

    return (
        <div className="patients-page">
            <div className="patients-header">
                <div className="header-title">
                    <div className="header-icon">
                        <div className="user-icon-circle">
                            <User size={28} />
                        </div>
                    </div>
                    <div>
                        <h1>Patient Records</h1>
                        <p>Search and manage patient information</p>
                    </div>
                </div>
                <button className="btn-new-patient" onClick={() => navigate('/patients/new')}>
                    <Plus size={20} />
                    <span>New Patient</span>
                </button>
            </div>

            <div className="filters-bar">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search by name, Patient ID, or Phone #"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                    <Search size={18} className="search-icon" />
                </div>

                <div className="date-filter">
                    <input
                        type="date"
                        className="date-input-custom"
                        value={selectedDate}
                        onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
                    />
                    <Calendar size={18} className="calendar-icon" />
                </div>

                <div className="filter-container" ref={filterRef}>
                    <button
                        className={`btn-filter ${showFilterPanel ? 'active' : ''}`}
                        onClick={() => setShowFilterPanel(!showFilterPanel)}
                    >
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                    {showFilterPanel && (
                        <div className="filter-dropdown dropdown-anim">
                            <div className="filter-option">
                                <label>Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="filter-option">
                                <label>Gender</label>
                                <select
                                    value={genderFilter}
                                    onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    className="btn-clear-minimal"
                    onClick={clearFilters}
                    disabled={!isFilterApplied}
                >
                    <RotateCcw size={16} />
                    <span>Clear Filters</span>
                </button>
            </div>

            {/* Top Pagination & Summary Controls */}
            <div className="table-controls-top">
                <div className="table-summary-compact">
                    {sortedPatients.length > 0 ? (
                        <p>Showing <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedPatients.length)}</strong> of <strong>{sortedPatients.length}</strong> patients</p>
                    ) : (
                        <p>No records found</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-top">
                        <div className="pagination-info-mini">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="pagination-btns-mini">
                            <button
                                className="page-btn-mini"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                className="page-btn-mini"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="standard-table-container">
                {sortedPatients.length > 0 ? (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('id')} className="sortable">
                                    <div className="th-content">ID {renderSortIcon('id')}</div>
                                </th>
                                <th onClick={() => requestSort('name')} className="sortable">
                                    <div className="th-content">Name {renderSortIcon('name')}</div>
                                </th>
                                <th onClick={() => requestSort('age')} className="sortable">
                                    <div className="th-content">Age {renderSortIcon('age')}</div>
                                </th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th onClick={() => requestSort('lastVisit')} className="sortable">
                                    <div className="th-content">Last Visit {renderSortIcon('lastVisit')}</div>
                                </th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.map(patient => (
                                <tr key={patient.id} className="table-row-anim">
                                    <td className="font-bold">{patient.id}</td>
                                    <td className="font-bold text-dark">{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.lastVisit}</td>
                                    <td>
                                        <span className={`status-badge ${patient.status.toLowerCase()}`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon btn-edit" title="Edit" onClick={() => openEditModal(patient)}>
                                                <Edit size={18} />
                                            </button>
                                            <button className="btn-icon btn-archive" title="Archive" onClick={() => openArchiveModal(patient)}>
                                                <Archive size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <Folder size={48} className="empty-icon" />
                        <h3>No records matching your search</h3>
                        <p>Try adjusting your filters or clearing them to see all patients.</p>
                        <button className="btn-clear-filters" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Components */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content modern-modal">
                        <button className="btn-close-absolute" onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>

                        <div className="modal-header-modern">
                            <div className="modal-icon-bg">
                                <Edit size={24} />
                            </div>
                            <h2>Edit Patient Details</h2>
                            <p>Update information for {selectedPatient?.id}</p>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <User size={18} className="input-icon" />
                                    <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="form-input" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Age</label>
                                    <input type="number" name="age" value={editFormData.age} onChange={handleEditChange} className="form-input" />
                                </div>
                                <div className="form-group half">
                                    <label>Gender</label>
                                    <select name="gender" value={editFormData.gender} onChange={handleEditChange} className="form-input">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <div className="input-with-icon">
                                    <Phone size={18} className="input-icon" />
                                    <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} className="form-input" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Last Visit</label>
                                    <input type="date" name="lastVisit" value={editFormData.lastVisit} onChange={handleEditChange} className="form-input" />
                                </div>
                                <div className="form-group half">
                                    <label>Status</label>
                                    <select name="status" value={editFormData.status} onChange={handleEditChange} className="form-input">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="view-more-link">
                                <button
                                    className="view-more-btn"
                                    onClick={() => navigate(`/patients/${selectedPatient?.id}`)}
                                >
                                    View full patient record &rarr;
                                </button>
                            </div>
                        </div>

                        <div className="modal-footer-modern">
                            {saveSuccess ? (
                                <div className="success-message">
                                    <span>Changes Saved Successfully!</span>
                                </div>
                            ) : (
                                <>
                                    <button className="btn-cancel-modern" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                    <button className="btn-save-modern" onClick={saveEdit}>Save Changes</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isArchiveModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content compact-modal">
                        <div className="modal-header">
                            <h2 className="text-danger">Archive Record</h2>
                            <button className="btn-close" onClick={() => setIsArchiveModalOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to archive the record for <strong>{selectedPatient?.name}</strong>?</p>
                            <p className="text-muted">This action can be undone by an administrator later.</p>
                        </div>
                        <div className="modal-footer-compact">
                            <button className="btn-cancel" onClick={() => setIsArchiveModalOpen(false)}>Cancel</button>
                            <button className="btn-confirm-archive" onClick={confirmArchive}>
                                <Trash2 size={16} /> Yes, Archive
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
