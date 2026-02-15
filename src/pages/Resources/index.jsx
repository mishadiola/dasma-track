import React, { useState, useEffect } from 'react';
import {
    Package, Search, Plus, Edit, Archive, Trash2,
    ChevronDown, ChevronUp, Download, Eye,
    Activity, Database, LayoutPanelTop,
    MoreHorizontal, Filter, Save, X, AlertCircle,
    User, MapPin, Tag, Box, Info,
    Stethoscope, FlaskConical, Droplets, Smile,
    Pill, Truck, Monitor, BookOpen, Clock,
    CheckCircle2, PlusCircle, MinusCircle, RefreshCcw
} from 'lucide-react';

const DEPARTMENTS = [
    { id: 'admin', name: 'Administration', color: '#6b7280', icon: Database },
    { id: 'public_health', name: 'Public Health', color: '#059669', icon: Stethoscope },
    { id: 'lab', name: 'Laboratory', color: '#3b82f6', icon: FlaskConical },
    { id: 'pharmacy', name: 'Pharmacy', color: '#7c3aed', icon: Pill },
    { id: 'sanitation', name: 'Sanitation / Environmental', color: '#0369a1', icon: Droplets },
];

const CATEGORIES = ['Equipment', 'Supplies', 'Software', 'Medicines', 'Furniture'];
const STATUSES = ['Active', 'Inactive', 'Archived'];
const LOCATIONS = ['Main Clinic', 'Storage Room A', 'Pharmacy Depot', 'Lab Area', 'Admin Office'];

const generateMockResources = () => {
    return [
        { id: 1, name: 'First Aid Kit Premium', category: 'Supplies', status: 'Active', quantity: 15, lowStockBatch: 5, location: 'Main Clinic', loggedBy: 'Mish Diola', department: 'public_health', dateAdded: '2024-01-15' },
        { id: 2, name: 'Professional Stethoscope', category: 'Equipment', status: 'Active', quantity: 4, lowStockBatch: 2, location: 'Main Clinic', loggedBy: 'Nurse Clara', department: 'public_health', dateAdded: '2024-01-20' },
        { id: 3, name: 'Waste Bin Industrial', category: 'Equipment', status: 'Active', quantity: 20, lowStockBatch: 5, location: 'Main Clinic', loggedBy: 'Jane Tadeo', department: 'sanitation', dateAdded: '2024-02-05' },
        { id: 4, name: 'Advanced Inventory Software', category: 'Software', status: 'Active', quantity: 1, lowStockBatch: 0, location: 'Admin Office', loggedBy: 'Naomi Magsino', department: 'admin', dateAdded: '2023-12-10' },
        { id: 5, name: 'Protocol Manual V2', category: 'Manual', status: 'Inactive', quantity: 10, lowStockBatch: 2, location: 'Storage Room A', loggedBy: 'Safia Baig', department: 'admin', dateAdded: '2023-11-20' },
        { id: 6, name: 'Hand Sanitizer Gel 500ml', category: 'Supplies', status: 'Active', quantity: 50, lowStockBatch: 10, location: 'Storage Room A', loggedBy: 'Jane Tadeo', department: 'sanitation', dateAdded: '2024-02-10' },
        { id: 7, name: 'Centrifuge Machine X-100', category: 'Equipment', status: 'Active', quantity: 1, lowStockBatch: 1, location: 'Lab Area', loggedBy: 'Lab Technician', department: 'lab', dateAdded: '2024-02-28' },
        { id: 8, name: 'Paracetamol (Box of 100)', category: 'Medicines', status: 'Active', quantity: 100, lowStockBatch: 20, location: 'Pharmacy Depot', loggedBy: 'Pharmacist', department: 'pharmacy', dateAdded: '2024-03-01' },
    ];
};

const Resources = () => {
    const [resources, setResources] = useState(generateMockResources());
    const [activeDept, setActiveDept] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [lastActionId, setLastActionId] = useState(null);

    // Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);

    const [selectedResource, setSelectedResource] = useState(null);
    const [stockAdjustment, setStockAdjustment] = useState({ type: 'add', quantity: 0, reason: '' });
    const [formData, setFormData] = useState({
        name: '', category: CATEGORIES[0], department: DEPARTMENTS[0].id,
        status: 'Active', quantity: 0, lowStockBatch: 0, location: LOCATIONS[0], loggedBy: 'Current User'
    });

    // Summary Stats
    const totalResources = resources.length;
    const activeItems = resources.filter(r => r.status === 'Active').length;
    const lowStockItems = resources.filter(r => r.quantity <= r.lowStockBatch).length;

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredResources = resources.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.loggedBy.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = activeDept === 'all' || r.department === activeDept;
        return matchesSearch && matchesDept;
    });

    const openStockModal = (resource, type) => {
        setSelectedResource(resource);
        setStockAdjustment({ type, quantity: 0, reason: '' });
        setIsStockModalOpen(true);
    };

    const handleStockSubmit = () => {
        const adjustment = stockAdjustment.type === 'add' ? stockAdjustment.quantity : -stockAdjustment.quantity;
        const newQuantity = Math.max(0, selectedResource.quantity + adjustment);

        setResources(prev => prev.map(r =>
            r.id === selectedResource.id
                ? { ...r, quantity: newQuantity, dateUpdated: new Date().toISOString() }
                : r
        ));

        setLastActionId(selectedResource.id);
        setTimeout(() => setLastActionId(null), 2000);
        setIsStockModalOpen(false);
    };

    const saveResource = () => {
        if (isEditModalOpen) {
            setResources(prev => prev.map(r => r.id === selectedResource.id ? { ...formData, id: r.id } : r));
            setIsEditModalOpen(false);
        } else {
            const newRes = {
                ...formData,
                id: Math.max(...resources.map(r => r.id)) + 1,
                dateAdded: new Date().toISOString().split('T')[0]
            };
            setResources(prev => [newRes, ...prev]);
            setLastActionId(newRes.id);
            setTimeout(() => setLastActionId(null), 2000);
            setIsAddModalOpen(false);
        }
    };

    const deleteResource = () => {
        setResources(prev => prev.filter(r => r.id !== selectedResource.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="resources-page v2">
            <div className="consultations-header">
                <div className="header-title">
                    <div className="icon-circle">
                        <Package size={24} />
                    </div>
                    <div>
                        <h1>Resource Management</h1>
                        <p>Track health office assets across 5 core departments</p>
                    </div>
                </div>
                <button className="btn-new-consultation" onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={20} />
                    New Resource
                </button>
            </div>

            {/* Compact Summary Metrics */}
            <div className="compact-metrics">
                <button
                    className={`metric-btn blue ${activeDept === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveDept('all')}
                >
                    <div className="metric-icon"><LayoutPanelTop size={18} /></div>
                    <div className="metric-data">
                        <span className="metric-value">{totalResources}</span>
                        <span className="metric-label">Total Resources</span>
                    </div>
                </button>
                <div className="metric-btn green no-click">
                    <div className="metric-icon"><CheckCircle2 size={18} /></div>
                    <div className="metric-data">
                        <span className="metric-value">{activeItems}</span>
                        <span className="metric-label">Active Items</span>
                    </div>
                </div>
                <div className="metric-btn orange no-click">
                    <div className="metric-icon"><AlertCircle size={18} /></div>
                    <div className="metric-data">
                        <span className="metric-value">{lowStockItems}</span>
                        <span className="metric-label">Low Stock</span>
                    </div>
                </div>
            </div>

            {/* Modern Controls */}
            <div className="resources-controls-v2">
                <div className="dept-buttons">
                    {DEPARTMENTS.map(dept => (
                        <button
                            key={dept.id}
                            className={`dept-bubble ${activeDept === dept.id ? 'active' : ''}`}
                            onClick={() => setActiveDept(dept.id)}
                            style={{ '--dept-color': dept.color }}
                        >
                            {dept.name}
                        </button>
                    ))}
                </div>
                <div className="search-box-modern">
                    <Search className="search-icon-v2" size={18} />
                    <input
                        type="text"
                        placeholder="Search resources by name, category, or staff..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input-v2"
                    />
                </div>
            </div>

            {/* Resource Table */}
            <div className="table-container-v2">
                <table className="resource-table-v2">
                    <thead>
                        <tr>
                            <th>Resource Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Availability</th>
                            <th className="hide-mobile">Location</th>
                            <th className="hide-mobile">Logged By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResources.map(res => (
                            <tr key={res.id} className={lastActionId === res.id ? 'recent-update' : ''}>
                                <td data-label="Resource Name" className="clickable-name" onClick={() => { setSelectedResource(res); setIsViewModalOpen(true); }}>
                                    {res.name}
                                </td>
                                <td data-label="Category"><span className="badge-category">{res.category}</span></td>
                                <td data-label="Status">
                                    <span className={`badge-status ${res.status.toLowerCase()}`}>
                                        {res.status}
                                    </span>
                                </td>
                                <td data-label="Availability">
                                    <div className="stock-control-group">
                                        <button className="stock-btn minus" onClick={() => openStockModal(res, 'remove')}>-</button>
                                        <span className="stock-display">{res.quantity}</span>
                                        <button className="stock-btn plus" onClick={() => openStockModal(res, 'add')}>+</button>
                                    </div>
                                </td>
                                <td data-label="Location" className="hide-mobile">{res.location}</td>
                                <td data-label="Logged By" className="hide-mobile">{res.loggedBy}</td>
                                <td data-label="Actions">
                                    <div className="mini-actions">
                                        <button className="btn-m edit" onClick={() => { setSelectedResource(res); setFormData({ ...res }); setIsEditModalOpen(true); }}><Edit size={14} /></button>
                                        <button className="btn-m view" onClick={() => { setSelectedResource(res); setIsViewModalOpen(true); }}><Eye size={14} /></button>
                                        <button className="btn-m del" onClick={() => { setSelectedResource(res); setIsDeleteModalOpen(true); }}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Stock Management Modal */}
            {isStockModalOpen && selectedResource && (
                <div className="modal-overlay">
                    <div className="modal-v2 compact">
                        <div className="modal-header-v2">
                            <h3>{stockAdjustment.type === 'add' ? 'Add Stock' : 'Remove Stock'}</h3>
                            <p>{selectedResource.name}</p>
                        </div>
                        <div className="modal-body-v2">
                            <div className="form-group-v2">
                                <label>Quantity to {stockAdjustment.type === 'add' ? 'Add' : 'Remove'}</label>
                                <input
                                    type="number"
                                    className="input-v2"
                                    value={stockAdjustment.quantity}
                                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, quantity: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="form-group-v2">
                                <label>Reason / Note (Optional)</label>
                                <textarea
                                    className="input-v2"
                                    placeholder="e.g. Monthly replenishment"
                                    value={stockAdjustment.reason}
                                    onChange={(e) => setStockAdjustment({ ...stockAdjustment, reason: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer-v2">
                            <button className="btn-v2 secondary" onClick={() => setIsStockModalOpen(false)}>Cancel</button>
                            <button className={`btn-v2 primary ${stockAdjustment.type === 'add' ? 'bg-green' : 'bg-red'}`} onClick={handleStockSubmit}>
                                Confirm Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {(isAddModalOpen || isEditModalOpen) && (
                <div className="modal-overlay">
                    <div className="modal-v2">
                        <div className="modal-header-v2">
                            <h3>{isAddModalOpen ? 'New Resource' : 'Edit Resource'}</h3>
                        </div>
                        <div className="modal-body-v2 grid">
                            <div className="form-group-v2 full">
                                <label>Name</label>
                                <input className="input-v2" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group-v2">
                                <label>Category</label>
                                <select className="input-v2" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group-v2">
                                <label>Department</label>
                                <select className="input-v2" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}>
                                    {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group-v2">
                                <label>Status</label>
                                <select className="input-v2" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="form-group-v2">
                                <label>Initial Quantity</label>
                                <input type="number" className="input-v2" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="form-group-v2">
                                <label>Location</label>
                                <select className="input-v2" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}>
                                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <div className="form-group-v2">
                                <label>Logged By</label>
                                <input className="input-v2" disabled value={formData.loggedBy} />
                            </div>
                        </div>
                        <div className="modal-footer-v2">
                            <button className="btn-v2 secondary" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>Cancel</button>
                            <button className="btn-v2 primary bg-green" onClick={saveResource}>Save Resource</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && selectedResource && (
                <div className="modal-overlay">
                    <div className="modal-v2">
                        <div className="modal-header-v2" style={{ borderBottom: `4px solid ${DEPARTMENTS.find(d => d.id === selectedResource.department)?.color}` }}>
                            <h3>Resource Details</h3>
                            <p>Resource ID: RES-{selectedResource.id}</p>
                        </div>
                        <div className="modal-body-v2 detail-view">
                            <div className="detail-row"><span>Name:</span> <strong>{selectedResource.name}</strong></div>
                            <div className="detail-row"><span>Category:</span> <strong>{selectedResource.category}</strong></div>
                            <div className="detail-row"><span>Department:</span> <strong>{DEPARTMENTS.find(d => d.id === selectedResource.department)?.name}</strong></div>
                            <div className="detail-row"><span>Quantity:</span> <strong>{selectedResource.quantity} Units</strong></div>
                            <div className="detail-row"><span>Status:</span> <strong className={`tag-${selectedResource.status.toLowerCase()}`}>{selectedResource.status}</strong></div>
                            <div className="detail-row"><span>Location:</span> <strong>{selectedResource.location}</strong></div>
                            <div className="detail-row"><span>Logged By:</span> <strong>{selectedResource.loggedBy}</strong></div>
                            <div className="detail-row"><span>Date Added:</span> <strong>{selectedResource.dateAdded}</strong></div>
                        </div>
                        <div className="modal-footer-v2">
                            <button className="btn-v2 secondary" onClick={() => setIsViewModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedResource && (
                <div className="modal-overlay">
                    <div className="modal-v2 compact">
                        <div className="modal-header-v2 bg-red-light">
                            <AlertCircle size={40} color="#dc2626" />
                            <h3>Confirm Deletion</h3>
                        </div>
                        <div className="modal-body-v2 centered">
                            <p>Are you sure you want to delete <strong>{selectedResource.name}</strong>?</p>
                            <p className="text-muted small">This action will remove the resource from the database permanently.</p>
                        </div>
                        <div className="modal-footer-v2 split">
                            <button className="btn-v2 secondary full" onClick={() => setIsDeleteModalOpen(false)}>No, Cancel</button>
                            <button className="btn-v2 primary bg-red full" onClick={deleteResource}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
