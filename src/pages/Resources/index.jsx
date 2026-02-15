import React, { useState, useMemo } from 'react';
import {
    Package,
    Stethoscope,
    HardHat,
    Smartphone,
    ClipboardList,
    History,
    BarChart3,
    Plus,
    Search,
    Filter,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Settings,
    User,
    ArrowRight,
    Bell,
    Pin,
    Image as ImageIcon,
    Download,
    FileText,
    MoreVertical,
    Trash2,
    ArrowUpCircle,
    CheckSquare,
    Square,
    Flag,
    Star,
    Wrench
} from 'lucide-react';
import '../../styles/pages/_resources.css';

const Resources = () => {
    const [activeTab, setActiveTab] = useState('medical');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    // New Advanced States
    const [selectedItems, setSelectedItems] = useState([]);
    const [pinnedItems, setPinnedItems] = useState(new Set(['MED-002', 'OFF-101']));
    const [activeFilters, setActiveFilters] = useState([]);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Low stock: Surgical Gloves (Storage B)', type: 'warning' },
        { id: 2, text: 'Maintenance due: Main Generator', type: 'info' }
    ]);

    // Dashboard Data
    const stats = [
        { label: 'Total Items', value: '1,284', icon: Package, type: 'total' },
        { label: 'Low Stock Items', value: '12', icon: AlertCircle, type: 'low' },
        { label: 'Pending Requests', value: '5', icon: ClipboardList, type: 'pending' },
        { label: 'Items Needing Maintenance', value: '3', icon: History, type: 'maint' }
    ];

    // Navigation Items
    const navTabs = [
        { id: 'medical', label: 'Medical Supplies', icon: Stethoscope },
        { id: 'office', label: 'Office Supplies', icon: Package },
        { id: 'infrastructure', label: 'Infrastructure', icon: HardHat },
        { id: 'equipment', label: 'Equipment', icon: Smartphone },
        { id: 'requests', label: 'Requests & Approvals', icon: ClipboardList },
        { id: 'logs', label: 'Maintenance Logs', icon: History },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    // Mock Data for Tables
    const medicalSupplies = [
        { id: 'MED-001', name: 'Surgical Masks', quantity: 500, unit: 'Box', supplier: 'HealthCorp', location: 'Storage A', condition: 'New', stockLevel: 'high', expiry: '2025-12-01' },
        { id: 'MED-002', name: 'Disposable Gloves', quantity: 45, unit: 'Box', supplier: 'MedSupply Co', location: 'Storage B', condition: 'New', stockLevel: 'low', expiry: '2024-05-15' },
        { id: 'MED-003', name: 'Cotton Swabs', quantity: 10, unit: 'Pack', supplier: 'HealthCorp', location: 'Storage A', condition: 'New', stockLevel: 'critical', expiry: '2025-08-20' },
        { id: 'MED-004', name: 'First Aid Kit', quantity: 15, unit: 'Unit', supplier: 'SafetyFirst', location: 'Ward 1', condition: 'New', stockLevel: 'high', expiry: 'N/A' },
    ];

    const officeSupplies = [
        { id: 'OFF-101', name: 'A4 Paper Reams', quantity: 120, unit: 'Ream', supplier: 'OfficePro', location: 'Office Supply Rm', condition: 'New', stockLevel: 'high' },
        { id: 'OFF-102', name: 'Ballpoint Pens', quantity: 12, unit: 'Box', supplier: 'OfficePro', location: 'Admin Desk', condition: 'New', stockLevel: 'low' },
    ];

    const infrastructureItems = [
        { id: 'INF-001', item: 'Air Conditioning Unit', location: 'Ward 1', condition: 'Excellent', lastMaint: '2024-01-15', nextMaint: '2024-07-15', responsible: 'Tech Solutions' },
        { id: 'INF-002', item: 'Main Generator', location: 'Basement', condition: 'Fair', lastMaint: '2023-11-20', nextMaint: '2024-02-20', responsible: 'PowerGuard' },
        { id: 'INF-003', item: 'Water Filtration System', location: 'Kitchen', condition: 'Excellent', lastMaint: '2023-12-05', nextMaint: '2024-06-05', responsible: 'AquaClear' },
    ];

    const equipmentItems = [
        { id: 'EQ-201', name: 'Defibrillator', location: 'Emergency Rm', condition: 'Excellent', serial: 'SN-445522', supplier: 'MedTech', status: 'Operational' },
        { id: 'EQ-202', name: 'Patient Monitor', location: 'ICU-1', condition: 'Fair', serial: 'SN-998877', supplier: 'VisionCare', status: 'In Use' },
    ];

    const requests = [
        { id: 'REQ-452', item: 'Printer Ink', quantity: 2, requestor: 'Dr. Smith', department: 'Pediatrics', status: 'Pending' },
        { id: 'REQ-451', item: 'Syringes (5ml)', quantity: 100, requestor: 'Nurse Jean', department: 'General Med', status: 'Approved' },
        { id: 'REQ-450', item: 'Stethoscope', quantity: 1, requestor: 'Dr. Lee', department: 'Cardiology', status: 'Rejected' },
    ];

    const maintenanceLogs = [
        { date: '2024-02-10', item: 'Elevator A', action: 'Cable Lubrication', technicin: 'VertiMove', cost: '$450', status: 'Completed' },
        { date: '2024-02-05', item: 'Centrifuge', action: 'Calibration', technicin: 'LabServices', cost: '$120', status: 'Completed' },
    ];

    // Helper: Toggle Selection
    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Helper: Toggle Pin
    const togglePin = (id) => {
        setPinnedItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const renderAuditPreview = (id) => (
        <div className="audit-hover-preview">
            <h5 style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Recent Activity</h5>
            <div className="preview-item">Item stock updated by Admin (+50)</div>
            <div className="preview-item">Location changed to Ward 2</div>
            <div className="preview-item" style={{ border: 'none' }}>Maintenance logged by Tech</div>
        </div>
    );

    const renderTable = () => {
        switch (activeTab) {
            case 'medical':
            case 'office':
                const data = activeTab === 'medical' ? medicalSupplies : officeSupplies;
                return (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}><Square size={18} style={{ opacity: 0.3 }} /></th>
                                <th style={{ width: '40px' }}></th>
                                <th>Item Name</th>
                                <th>Code/ID</th>
                                <th>Quantity</th>
                                <th>Location</th>
                                <th>Stock Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className={`${selectedItems.includes(item.id) ? 'selected-row' : ''}`}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="res-checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => toggleSelect(item.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className={`pin-cell ${pinnedItems.has(item.id) ? 'pinned' : ''}`} onClick={() => togglePin(item.id)}>
                                            <Pin size={16} fill={pinnedItems.has(item.id) ? 'currentColor' : 'none'} />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div className="item-img-cell"><ImageIcon size={18} /></div>
                                            <span className="font-bold">{item.name}</span>
                                        </div>
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.quantity} {item.unit}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <span className={`stock-badge stock-${item.stockLevel}`}>
                                            {item.stockLevel === 'critical' ? '⚠️ ' : ''}{item.stockLevel}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <div className="history-preview-trigger">
                                                <button className="btn-icon" title="View Audit Trail"><History size={16} /></button>
                                                {renderAuditPreview(item.id)}
                                            </div>
                                            <button className="btn-icon btn-edit" title="Edit Item Details"><Settings size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'infrastructure':
                return (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}></th>
                                <th>Item</th>
                                <th>Location</th>
                                <th>Condition</th>
                                <th>Last Maintenance</th>
                                <th>Next Maintenance</th>
                                <th>Responsible</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infrastructureItems.map((item) => (
                                <tr key={item.id} className="table-row-anim">
                                    <td><div className={`pin-cell ${pinnedItems.has(item.id) ? 'pinned' : ''}`} onClick={() => togglePin(item.id)}><Pin size={16} fill={pinnedItems.has(item.id) ? 'currentColor' : 'none'} /></div></td>
                                    <td className="font-bold">{item.item}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <span className={`cond-${item.condition.toLowerCase()}`} style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            {item.condition === 'Excellent' ? <CheckCircle2 size={14} /> : <Wrench size={14} />}
                                            {item.condition}
                                        </span>
                                    </td>
                                    <td>{item.lastMaint}</td>
                                    <td>{item.nextMaint}</td>
                                    <td>{item.responsible}</td>
                                    <td>
                                        <button className="btn-icon btn-edit" title="Log Maintenance Action"><ClipboardList size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'equipment':
                return (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Serial No.</th>
                                <th>Location</th>
                                <th>Condition</th>
                                <th>Supplier</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentItems.map((item) => (
                                <tr key={item.id} className="table-row-anim">
                                    <td className="font-bold">{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>{item.location}</td>
                                    <td className={`cond-${item.condition.toLowerCase()}`} style={{ fontWeight: 700 }}>{item.condition}</td>
                                    <td>{item.supplier}</td>
                                    <td>
                                        <span className={`status-badge ${item.status === 'Operational' ? 'completed' : 'pending'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-icon" title="View Logs"><History size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'requests':
                return (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Requestor</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id} className="table-row-anim">
                                    <td>{req.id}</td>
                                    <td className="font-bold">{req.item}</td>
                                    <td>{req.quantity}</td>
                                    <td>{req.requestor}</td>
                                    <td>
                                        <span className={`status-badge ${req.status.toLowerCase()}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon" style={{ color: '#16a34a' }} title="Approve Request"><CheckCircle2 size={16} /></button>
                                            <button className="btn-icon" style={{ color: '#dc2626' }} title="Reject Request"><Plus size={16} style={{ transform: 'rotate(45deg)' }} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'logs':
                return (
                    <table className="standard-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Action Taken</th>
                                <th>Technician</th>
                                <th>Cost</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceLogs.map((log, idx) => (
                                <tr key={idx} className="table-row-anim">
                                    <td>{log.date}</td>
                                    <td className="font-bold">{log.item}</td>
                                    <td>{log.action}</td>
                                    <td>{log.technicin}</td>
                                    <td>{log.cost}</td>
                                    <td>
                                        <span className="status-badge completed">{log.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'analytics':
                return (
                    <div className="analytics-placeholder">
                        <BarChart3 size={64} />
                        <h3>Analytics & Reports</h3>
                        <p>Detailed performance graphs and stock analytics will be available here.</p>
                        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Feature coming soon.</p>
                    </div>
                );
            default:
                return <div className="analytics-placeholder"><Package size={48} /><p>Section under development.</p></div>;
        }
    };

    return (
        <div className="resources-page">
            {/* Header with Notifications */}
            <div className="res-nav-header">
                <div className="resources-dashboard">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="resource-stat-card">
                            <div className={`stat-icon ${stat.type}`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="metric-label">{stat.label}</span>
                                <h4 className="metric-value">{stat.value}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="notif-bell" style={{ marginLeft: '2rem' }}>
                    <Bell size={28} />
                    <span className="notif-badge">{notifications.length}</span>
                </div>
            </div>

            <div className="resources-main-layout">
                {/* 2. Side Navigation Tabs */}
                <aside className="resources-sidebar">
                    {navTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => { setActiveTab(tab.id); setSelectedItems([]); }}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* 3. Main Content Area */}
                <main className="resources-tab-content">
                    {/* Bulk Action Bar */}
                    {selectedItems.length > 0 && (
                        <div className="bulk-action-bar">
                            <div className="bulk-info">
                                <CheckSquare size={20} />
                                <span>{selectedItems.length} items selected</span>
                            </div>
                            <div className="bulk-btns">
                                <button className="btn-bulk"><ArrowUpCircle size={16} /> Check-out</button>
                                <button className="btn-bulk"><ArrowRight size={16} /> Move</button>
                                <button className="btn-bulk" style={{ background: 'rgba(220, 38, 38, 0.4)' }}><Trash2 size={16} /> Delete</button>
                                <button className="btn-bulk" onClick={() => setSelectedItems([])}>Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="tab-header">
                        <div className="tab-title-group">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <h3>{navTabs.find(t => t.id === activeTab)?.label}</h3>
                                {pinnedItems.size > 0 && activeTab === 'medical' && (
                                    <span className="status-badge active" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Star size={12} fill="currentColor" /> {pinnedItems.size} Pinned
                                    </span>
                                )}
                            </div>
                            <p>Manage and track your {navTabs.find(t => t.id === activeTab)?.label.toLowerCase()}</p>
                        </div>
                        <div className="tab-actions">
                            <button className="btn-action-res secondary" title="Export current view to Excel"><Download size={18} /> Export</button>
                            <button className="btn-action-res primary" onClick={() => (activeTab === 'requests' ? setIsRequestModalOpen(true) : setIsAddModalOpen(true))}>
                                <Plus size={18} /> {activeTab === 'requests' ? 'Submit Request' : 'Add Item'}
                            </button>
                        </div>
                    </div>

                    {/* Quick Filter Tags */}
                    <div className="quick-filters">
                        <button className="filter-pill active">All Items</button>
                        <button className="filter-pill"><AlertCircle size={14} /> Low Stock</button>
                        <button className="filter-pill"><Wrench size={14} /> Needs Maintenance</button>
                        <button className="filter-pill"><Calendar size={14} /> Expiring Soon</button>
                        <button className="filter-pill"><Star size={14} /> Favorites</button>
                    </div>

                    {/* Table Filters */}
                    <div className="resource-table-controls">
                        <div className="search-bar-res">
                            <Search className="search-icon-res" size={18} />
                            <input
                                type="text"
                                placeholder={`Search ${navTabs.find(t => t.id === activeTab)?.label}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn-export" title="Download as CSV"><FileText size={16} /> CSV</button>
                            <button className="btn-export" title="Download as PDF"><Download size={16} /> PDF</button>
                            <button className="btn-action-res secondary"><Filter size={18} /> Filter</button>
                        </div>
                    </div>

                    {/* Dynamic Table Content */}
                    <div className="standard-table-container">
                        {renderTable()}
                    </div>
                </main>
            </div>

            {/* Modals remain same as previous step but with standardized styles */}
            {(isAddModalOpen || isRequestModalOpen) && (
                <div className="modal-overlay" onClick={() => { setIsAddModalOpen(false); setIsRequestModalOpen(false); }}>
                    <div className="modal-content modern-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-modern">
                            <div className="modal-icon-bg">
                                {isAddModalOpen ? <Plus size={24} /> : <ClipboardList size={24} />}
                            </div>
                            <h2>{isAddModalOpen ? 'Add New Resource' : 'Submit Resource Request'}</h2>
                            <p>{isAddModalOpen ? 'Complete the details to add an item to the inventory.' : 'Provide details for the items you need to request.'}</p>
                        </div>
                        <div className="modal-body-scroll">
                            <div className="form-group">
                                <label>Item Name <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. Surgical Masks" />
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Quantity</label>
                                    <input type="number" className="form-input" placeholder="0" />
                                </div>
                                <div className="form-group half">
                                    <label>Location</label>
                                    <input type="text" className="form-input" placeholder="Storage A / Ward 1" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea className="form-input" rows="3" placeholder="Additional information..."></textarea>
                            </div>
                            <div className="form-group">
                                <label>Upload Attachment (Manuals/Receipts)</label>
                                <div style={{ border: '2px dashed var(--border-color)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <ImageIcon style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drag and drop files here or click to browse</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer-modern">
                            <button className="btn-cancel-modern" onClick={() => { setIsAddModalOpen(false); setIsRequestModalOpen(false); }}>Cancel</button>
                            <button className="btn-save-modern" onClick={() => { setIsAddModalOpen(false); setIsRequestModalOpen(false); }}>
                                {isAddModalOpen ? 'Save Item' : 'Submit Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
