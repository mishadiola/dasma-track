import React, { useState, useMemo, useEffect } from 'react';
import {
    Package,
    Stethoscope,
    HardHat,
    Smartphone,
    ClipboardList,
    History,
    Plus,
    Search,
    Filter,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Bell,
    Image as ImageIcon,
    Download,
    FileText,
    Trash2,
    ArrowUpCircle,
    ArrowRight,
    CheckSquare,
    Square,
    Wrench,
    Pencil,
    Check,
    LayoutGrid,
    ChevronLeft,
    ChevronRight,
    Droplets,
    Clock,
    TrendingUp,
    Building2,
    ArrowRightCircle
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    Cell
} from 'recharts';
import '../../styles/pages/_resources.css';

const ITEMS_PER_PAGE = 8;

const DEPARTMENTS = [
    'Admin', 'General Med', 'Pediatrics', 'Surgical', 'Emergency', 'Cardiology', 'Radiology', 'Kitchen', 'Utility', 'Records', 'OPD', 'Dental', 'Labor'
];

const LOCATIONS = [
    'Storage A', 'Storage B', 'Storage C', 'Office Supply Rm', 'Admin Desk', 'Ward 1', 'Ward 2', 'ICU-1', 'Radiology', 'Emergency Rm', 'Lobby', 'Basement', 'Kitchen', 'Janitor Rm', 'Restrooms'
];

const TAB_DESCRIPTIONS = {
    medical: 'Contains medicines and health-related supplies.',
    office: 'Includes administrative and office-use materials.',
    equipment: 'Tracks durable assets and medical equipment.',
    facilities: 'Manages infrastructure and facility-related resources.',
    consumables: 'Includes cleaning, hygiene, and other expendable operational items.',
    requests: 'Manage and review resource requests and approvals.'
};

const Resources = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestSubFilter, setRequestSubFilter] = useState('all');

    // Advanced States
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeQuickFilter, setActiveQuickFilter] = useState('All Items');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        status: 'all',
        category: 'all',
        dateRange: 'all'
    });
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Low stock: Surgical Gloves (Storage B)', type: 'warning' },
        { id: 2, text: 'Maintenance due: Main Generator', type: 'info' }
    ]);

    // Navigation Tabs
    const navTabs = [
        { id: 'overview', label: 'Overview', icon: LayoutGrid },
        { id: 'medical', label: 'Medical', icon: Stethoscope },
        { id: 'office', label: 'Office', icon: Package },
        { id: 'equipment', label: 'Equipment', icon: Smartphone },
        { id: 'facilities', label: 'Facilities', icon: Building2 },
        { id: 'consumables', label: 'Consumables', icon: Droplets },
        { id: 'requests', label: 'Requests & Approvals', icon: ClipboardList },
    ];

    // Mock Data
    const [medicalSupplies, setMedicalSupplies] = useState([
        { id: 'MED-001', name: 'Surgical Masks', quantity: 500, unit: 'Box', supplier: 'HealthCorp', location: 'Storage A', condition: 'New', stockLevel: 'high', expiry: '2025-12-01', department: 'Surgical' },
        { id: 'MED-002', name: 'Disposable Gloves', quantity: 45, unit: 'Box', supplier: 'MedSupply Co', location: 'Storage B', condition: 'New', stockLevel: 'low', expiry: '2024-05-15', department: 'General' },
        { id: 'MED-003', name: 'Cotton Swabs', quantity: 10, unit: 'Pack', supplier: 'HealthCorp', location: 'Storage A', condition: 'New', stockLevel: 'critical', expiry: '2025-08-20', department: 'General' },
        { id: 'MED-004', name: 'First Aid Kit', quantity: 15, unit: 'Unit', supplier: 'SafetyFirst', location: 'Ward 1', condition: 'New', stockLevel: 'high', expiry: 'N/A', department: 'Emergency' },
        { id: 'MED-005', name: 'Syringes (5ml)', quantity: 200, unit: 'Box', supplier: 'MedSupply Co', location: 'Storage C', condition: 'New', stockLevel: 'high', expiry: '2026-03-15', department: 'General' },
        { id: 'MED-006', name: 'Bandages', quantity: 30, unit: 'Roll', supplier: 'HealthCorp', location: 'Ward 2', condition: 'New', stockLevel: 'low', expiry: '2025-11-30', department: 'Emergency' },
    ]);

    const [officeSupplies, setOfficeSupplies] = useState([
        { id: 'OFF-101', name: 'A4 Paper Reams', quantity: 120, unit: 'Ream', supplier: 'OfficePro', location: 'Office Supply Rm', condition: 'New', stockLevel: 'high', department: 'Admin' },
        { id: 'OFF-102', name: 'Ballpoint Pens', quantity: 12, unit: 'Box', supplier: 'OfficePro', location: 'Admin Desk', condition: 'New', stockLevel: 'low', department: 'Admin' },
        { id: 'OFF-103', name: 'Stapler', quantity: 8, unit: 'Unit', supplier: 'OfficePro', location: 'Office Supply Rm', condition: 'Good', stockLevel: 'high', department: 'Admin' },
        { id: 'OFF-104', name: 'Folders (Letter)', quantity: 5, unit: 'Pack', supplier: 'OfficePro', location: 'Admin Desk', condition: 'New', stockLevel: 'critical', department: 'Records' },
    ]);

    const [facilitiesItems, setFacilitiesItems] = useState([
        { id: 'FAC-001', item: 'Air Conditioning Unit', name: 'Air Conditioning Unit', location: 'Ward 1', area: 'Ward 1', condition: 'Excellent', lastMaint: '2024-01-15', nextMaint: '2024-07-15', responsible: 'Tech Solutions', status: 'Operational' },
        { id: 'FAC-002', item: 'Main Generator', name: 'Main Generator', location: 'Basement', area: 'Utility', condition: 'Fair', lastMaint: '2023-11-20', nextMaint: '2024-02-20', responsible: 'PowerGuard', status: 'Operational' },
        { id: 'FAC-003', item: 'Water Filtration System', name: 'Water Filtration System', location: 'Kitchen', area: 'Kitchen', condition: 'Excellent', lastMaint: '2023-12-05', nextMaint: '2024-06-05', responsible: 'AquaClear', status: 'Operational' },
    ]);

    const [equipmentItems, setEquipmentItems] = useState([
        { id: 'EQ-201', name: 'Defibrillator', location: 'Emergency Rm', condition: 'Excellent', serial: 'SN-445522', supplier: 'MedTech', status: 'Active' },
        { id: 'EQ-202', name: 'Patient Monitor', location: 'ICU-1', condition: 'Fair', serial: 'SN-998877', supplier: 'VisionCare', status: 'Active' },
        { id: 'EQ-203', name: 'X-Ray Machine', location: 'Radiology', condition: 'Good', serial: 'SN-112233', supplier: 'MedTech', status: 'Under Repair' },
        { id: 'EQ-204', name: 'Wheelchair', location: 'Lobby', condition: 'Poor', serial: 'SN-667788', supplier: 'MobilityPlus', status: 'Damaged' },
    ]);

    const [consumablesItems, setConsumablesItems] = useState([
        { id: 'CON-301', name: 'Cleaning Detergent', quantity: 40, unit: 'Bottle', location: 'Janitor Rm', storageLocation: 'Janitor Room A', stockLevel: 'high', expiry: '2026-01-10', category: 'Cleaning' },
        { id: 'CON-302', name: 'Hand Sanitizer', quantity: 8, unit: 'Bottle', location: 'Lobby', storageLocation: 'Supply Closet B', stockLevel: 'low', expiry: '2025-09-30', category: 'Hygiene' },
        { id: 'CON-303', name: 'Trash Bags (Large)', quantity: 200, unit: 'Piece', location: 'Janitor Rm', storageLocation: 'Janitor Room A', stockLevel: 'high', expiry: 'N/A', category: 'Cleaning' },
        { id: 'CON-304', name: 'Paper Towels', quantity: 15, unit: 'Roll', location: 'Restrooms', storageLocation: 'Supply Closet C', stockLevel: 'low', expiry: 'N/A', category: 'Hygiene' },
        { id: 'CON-305', name: 'Disinfectant Spray', quantity: 25, unit: 'Can', location: 'All Floors', storageLocation: 'Janitor Room A', stockLevel: 'high', expiry: '2026-06-15', category: 'Cleaning' },
    ]);

    // Mock Monthly Consumption Data
    const consumptionData = [
        { month: 'Sep', medical: 450, office: 120, consumables: 300, equipment: 5, facilities: 12 },
        { month: 'Oct', medical: 520, office: 150, consumables: 350, equipment: 8, facilities: 15 },
        { month: 'Nov', medical: 480, office: 130, consumables: 420, equipment: 12, facilities: 20 },
        { month: 'Dec', medical: 610, office: 180, consumables: 500, equipment: 10, facilities: 18 },
        { month: 'Jan', medical: 550, office: 140, consumables: 480, equipment: 7, facilities: 25 },
        { month: 'Feb', medical: 580, office: 160, consumables: 450, equipment: 9, facilities: 22 },
    ];

    const [requests, setRequests] = useState([
        { id: 'REQ-452', item: 'Printer Ink', name: 'Printer Ink', quantity: 2, requestor: 'Dr. Smith', department: 'Pediatrics', status: 'Pending', date: '2024-02-12' },
        { id: 'REQ-451', item: 'Syringes (5ml)', name: 'Syringes (5ml)', quantity: 100, requestor: 'Nurse Jean', department: 'General Med', status: 'Approved', date: '2024-02-10' },
        { id: 'REQ-450', item: 'Stethoscope', name: 'Stethoscope', quantity: 1, requestor: 'Dr. Lee', department: 'Cardiology', status: 'Rejected', date: '2024-02-08' },
        { id: 'REQ-449', item: 'Surgical Gloves', name: 'Surgical Gloves', quantity: 50, requestor: 'Nurse Maria', department: 'Surgical', status: 'Pending', date: '2024-02-11' },
        { id: 'REQ-448', item: 'Blood Pressure Monitor', name: 'Blood Pressure Monitor', quantity: 2, requestor: 'Dr. Cruz', department: 'OPD', status: 'Approved', date: '2024-02-06' },
    ]);

    // All Item Names for Autocomplete
    const allItemNames = useMemo(() => {
        const names = [
            ...medicalSupplies.map(i => i.name),
            ...officeSupplies.map(i => i.name),
            ...facilitiesItems.map(i => i.name),
            ...equipmentItems.map(i => i.name),
            ...consumablesItems.map(i => i.name)
        ];
        return [...new Set(names)];
    }, [medicalSupplies, officeSupplies, facilitiesItems, equipmentItems, consumablesItems]);

    const [maintenanceLogs] = useState([
        { date: '2024-02-10', item: 'Elevator A', action: 'Cable Lubrication', technician: 'VertiMove', cost: '₱450', status: 'Completed' },
        { date: '2024-02-05', item: 'Centrifuge', action: 'Calibration', technician: 'LabServices', cost: '₱120', status: 'Completed' },
        { date: '2024-01-28', item: 'Main Generator', action: 'Oil Change', technician: 'PowerGuard', cost: '₱800', status: 'Completed' },
    ]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Reset page when switching tabs
    useEffect(() => {
        setCurrentPage(1);
        setSelectedItems([]);
        setSearchQuery('');
        setActiveQuickFilter('All Items');
        setRequestSubFilter('all');
    }, [activeTab]);

    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isFilterOpen && !e.target.closest('.filter-popup') && !e.target.closest('.btn-filter-trigger')) {
                setIsFilterOpen(false);
            }
            if (isNotifOpen && !e.target.closest('.notif-popup') && !e.target.closest('.notif-bell')) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isFilterOpen, isNotifOpen]);

    const handleCSVExport = () => {
        if (filteredData.length === 0) return;
        const headers = Object.keys(filteredData[0]).join(',');
        const rows = filteredData.map(item => Object.values(item).join(',')).join('\n');
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Resources_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePDFExport = () => {
        window.print();
    };

    const handleQuickFilterToggle = (filter) => {
        setActiveQuickFilter(prev => prev === filter ? 'All Items' : filter);
        setCurrentPage(1);
    };

    const handleEditClick = (item) => {
        setItemToEdit(item);
        setEditedData({ ...item });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (!editedData.name && !editedData.item) return;

        // Auto-update audit trail
        const timestamp = new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(' at ', ' – ');

        const finalData = {
            ...editedData,
            lastModified: timestamp,
            editedBy: 'Admin (DCHO3)' // In a real app, this would be the logged-in user
        };

        const updateList = (list, setList) => {
            setList(list.map(i => i.id === itemToEdit.id ? { ...finalData } : i));
        };

        switch (activeTab) {
            case 'medical': updateList(medicalSupplies, setMedicalSupplies); break;
            case 'office': updateList(officeSupplies, setOfficeSupplies); break;
            case 'facilities': updateList(facilitiesItems, setFacilitiesItems); break;
            case 'equipment': updateList(equipmentItems, setEquipmentItems); break;
            case 'consumables': updateList(consumablesItems, setConsumablesItems); break;
            case 'requests': updateList(requests, setRequests); break;
            default: break;
        }

        setIsEditModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const isDataChanged = useMemo(() => {
        if (!itemToEdit) return false;
        return JSON.stringify(itemToEdit) !== JSON.stringify(editedData);
    }, [itemToEdit, editedData]);

    const renderAuditPreview = (id) => (
        <div className="audit-hover-preview">
            <h5 style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Recent Activity</h5>
            <div className="preview-item">Item stock updated by Admin (+50)</div>
            <div className="preview-item">Location changed to Ward 2</div>
            <div className="preview-item" style={{ border: 'none' }}>Maintenance logged by Tech</div>
        </div>
    );

    // Filtered Data Logic
    const filteredData = useMemo(() => {
        let baseData = [];
        switch (activeTab) {
            case 'medical': baseData = medicalSupplies; break;
            case 'office': baseData = officeSupplies; break;
            case 'facilities': baseData = facilitiesItems; break;
            case 'equipment': baseData = equipmentItems; break;
            case 'consumables': baseData = consumablesItems; break;
            case 'requests': baseData = requests; break;
            default: baseData = [];
        }

        return baseData.filter(item => {
            const searchTerms = searchQuery.toLowerCase();
            const matchesSearch = Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerms)
            );

            let matchesQuickFilter = true;
            if (activeQuickFilter === 'Low Stock') {
                matchesQuickFilter = item.stockLevel === 'low' || item.stockLevel === 'critical';
            } else if (activeQuickFilter === 'Needs Maintenance') {
                matchesQuickFilter = item.condition === 'Fair' || item.condition === 'Poor' || (item.nextMaint && new Date(item.nextMaint) < new Date());
            } else if (activeQuickFilter === 'Expiring Soon') {
                matchesQuickFilter = item.expiry && item.expiry !== 'N/A' && new Date(item.expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
            }

            let matchesAdvanced = true;
            if (activeFilters.status !== 'all') {
                matchesAdvanced = matchesAdvanced && (item.status?.toLowerCase() === activeFilters.status || item.stockLevel === activeFilters.status);
            }

            // Request sub-filter
            let matchesRequestFilter = true;
            if (activeTab === 'requests' && requestSubFilter !== 'all') {
                matchesRequestFilter = item.status?.toLowerCase() === requestSubFilter;
            }

            return matchesSearch && matchesQuickFilter && matchesAdvanced && matchesRequestFilter;
        });
    }, [activeTab, searchQuery, activeQuickFilter, activeFilters, requestSubFilter, medicalSupplies, officeSupplies, facilitiesItems, equipmentItems, consumablesItems, requests]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Overview computed stats
    const overviewStats = useMemo(() => {
        const allItems = [...medicalSupplies, ...officeSupplies, ...facilitiesItems, ...equipmentItems, ...consumablesItems];
        const totalCount = allItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const lowStock = allItems.filter(i => i.stockLevel === 'low' || i.stockLevel === 'critical').length;
        const expiringItems = [...medicalSupplies, ...consumablesItems].filter(i => i.expiry && i.expiry !== 'N/A' && new Date(i.expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
        const pendingReqs = requests.filter(r => r.status === 'Pending').length;

        // Chart Data: Stock Distribution
        const stockDistribution = [
            { name: 'Medical', value: medicalSupplies.length, fullValue: medicalSupplies.reduce((sum, i) => sum + (i.quantity || 0), 0), color: '#ef4444', id: 'medical' },
            { name: 'Office', value: officeSupplies.length, fullValue: officeSupplies.reduce((sum, i) => sum + (i.quantity || 0), 0), color: '#3b82f6', id: 'office' },
            { name: 'Equipment', value: equipmentItems.length, fullValue: equipmentItems.length, color: '#f59e0b', id: 'equipment' },
            { name: 'Facilities', value: facilitiesItems.length, fullValue: facilitiesItems.length, color: '#8b5cf6', id: 'facilities' },
            { name: 'Consumables', value: consumablesItems.length, fullValue: consumablesItems.reduce((sum, i) => sum + (i.quantity || 0), 0), color: '#10b981', id: 'consumables' },
        ];

        // Chart Data: Consumption trends (aggregated from mock data)
        const trendData = consumptionData.map(d => ({
            name: d.month,
            Total: d.medical + d.office + d.consumables + d.equipment + d.facilities,
            Medical: d.medical,
            Office: d.office,
            Consumables: d.consumables
        }));

        return {
            totalCount,
            lowStock,
            expiringCount: expiringItems.length,
            pendingReqs,
            medicalCount: medicalSupplies.length,
            officeCount: officeSupplies.length,
            equipmentCount: equipmentItems.length,
            facilitiesCount: facilitiesItems.length,
            consumablesCount: consumablesItems.length,
            stockDistribution,
            trendData
        };
    }, [medicalSupplies, officeSupplies, facilitiesItems, equipmentItems, consumablesItems, requests]);

    const handleTabSwitch = (tabId) => {
        setActiveTab(tabId);
    };

    // ─── RENDER: Overview Tab ───
    const renderOverview = () => (
        <div className="res-overview-content">
            {/* Summary Cards */}
            <div className="res-overview-stats">
                <div className="res-overview-stat-card">
                    <div className="overview-stat-icon total"><Package size={22} /></div>
                    <div className="overview-stat-info">
                        <span className="overview-stat-value">{overviewStats.totalCount.toLocaleString()}</span>
                        <span className="overview-stat-label">Total Inventory</span>
                    </div>
                </div>
                <div className="res-overview-stat-card">
                    <div className="overview-stat-icon low"><AlertCircle size={22} /></div>
                    <div className="overview-stat-info">
                        <span className="overview-stat-value">{overviewStats.lowStock}</span>
                        <span className="overview-stat-label">Low Stock Items</span>
                    </div>
                </div>
                <div className="res-overview-stat-card">
                    <div className="overview-stat-icon expiring"><Calendar size={22} /></div>
                    <div className="overview-stat-info">
                        <span className="overview-stat-value">{overviewStats.expiringCount}</span>
                        <span className="overview-stat-label">Expiring Soon</span>
                    </div>
                </div>
                <div className="res-overview-stat-card">
                    <div className="overview-stat-icon pending"><ClipboardList size={22} /></div>
                    <div className="overview-stat-info">
                        <span className="overview-stat-value">{overviewStats.pendingReqs}</span>
                        <span className="overview-stat-label">Pending Requests</span>
                    </div>
                </div>
            </div>

            {/* Visual Analytics Section */}
            <div className="res-analytics-grid">
                {/* Bar Chart: Stock Distribution */}
                <div className="res-chart-card">
                    <div className="chart-card-header">
                        <h3 className="res-section-title">Current Stock Distribution by Department</h3>
                        <p className="res-section-subtitle">Total item varieties per resource category</p>
                    </div>
                    <div className="chart-container" style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={overviewStats.stockDistribution}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                onClick={(data) => {
                                    if (data && data.activePayload) {
                                        handleTabSwitch(data.activePayload[0].payload.id);
                                    }
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'var(--table-row-hover)' }}
                                    contentStyle={{
                                        backgroundColor: 'var(--card-bg)',
                                        borderColor: 'var(--border-color)',
                                        borderRadius: '8px',
                                        color: 'var(--text-color)'
                                    }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} cursor="pointer">
                                    {overviewStats.stockDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart: Consumption Trends */}
                <div className="res-chart-card">
                    <div className="chart-card-header">
                        <h3 className="res-section-title">Monthly Resource Consumption Trend</h3>
                        <p className="res-section-subtitle">Usage trends across all departments (last 6 months)</p>
                    </div>
                    <div className="chart-container" style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={overviewStats.trendData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card-bg)',
                                        borderColor: 'var(--border-color)',
                                        borderRadius: '8px',
                                        color: 'var(--text-color)'
                                    }}
                                />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                <Line type="monotone" dataKey="Medical" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Office" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Consumables" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Total" stroke="var(--active-sort)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="res-overview-section">
                <h3 className="res-section-title">Recent Activity</h3>
                <p className="res-section-subtitle">Latest updates across all categories</p>
                <div className="res-recent-activity">
                    {[
                        { id: 1, user: 'Dr. Baig', action: 'Requested 50x Paracetamol', time: '2 mins ago', type: 'request', color: '#10b981' },
                        { id: 2, user: 'Admin', action: 'Updated AC Unit status in Ward 1', time: '1 hour ago', type: 'update', color: '#3b82f6' },
                        { id: 3, user: 'Nurse Jane', action: 'Added 20x Surgical Gloves', time: '3 hours ago', type: 'inventory', color: '#f59e0b' },
                        { id: 4, user: 'System', action: 'Low stock alert for Hand Sanitizer', time: '5 hours ago', type: 'alert', color: '#ef4444' },
                        { id: 5, user: 'Dr. Reyes', action: 'Approved Office Supplies request', time: '1 day ago', type: 'approval', color: '#8b5cf6' },
                    ].map(activity => (
                        <div key={activity.id} className="res-activity-item">
                            <div className="activity-dot" style={{ background: activity.color }}></div>
                            <div className="activity-item-content">
                                <span className="activity-text"><strong>{activity.user}</strong> {activity.action}</span>
                                <span className="activity-time">{activity.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // ─── RENDER: Pagination ───
    const renderPagination = () => {
        if (totalPages <= 1) return null;
        return (
            <div className="res-pagination">
                <span className="res-pagination-info">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length}
                </span>
                <div className="res-pagination-btns">
                    <button
                        className="res-page-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`res-page-num ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="res-page-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        );
    };

    // ─── RENDER: Table Content ───
    const renderTable = () => {
        if (paginatedData.length === 0) {
            return (
                <div className="res-empty-placeholder">
                    <Search size={48} />
                    <p>No results found for your search/filter.</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'medical':
                return (
                    <>
                        <table className="standard-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><Square size={18} style={{ opacity: 0.3 }} /></th>
                                    <th>Item Name</th>
                                    <th>Code/ID</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Expiry</th>
                                    <th>Stock Level</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className={`table-row-anim ${selectedItems.includes(item.id) ? 'selected-row' : ''}`}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="res-checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
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
                                            {item.expiry && item.expiry !== 'N/A' && new Date(item.expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? (
                                                <span className="expiry-warning"><AlertCircle size={14} /> {item.expiry}</span>
                                            ) : (
                                                <span>{item.expiry}</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`stock-badge stock-${item.stockLevel}`}>
                                                {item.stockLevel === 'critical' ? <AlertCircle size={14} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> : ''}{item.stockLevel}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <div className="history-preview-trigger">
                                                    <button className="btn-icon" title="View Audit Trail"><History size={16} /></button>
                                                    {renderAuditPreview(item.id)}
                                                </div>
                                                <button className="btn-edit-label" onClick={() => handleEditClick(item)}>
                                                    <Pencil size={14} /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}
                    </>
                );

            case 'office':
                return (
                    <>
                        <table className="standard-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><Square size={18} style={{ opacity: 0.3 }} /></th>
                                    <th>Item Name</th>
                                    <th>Code/ID</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Stock Level</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className={`table-row-anim ${selectedItems.includes(item.id) ? 'selected-row' : ''}`}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="res-checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
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
                                                {item.stockLevel === 'critical' ? <AlertCircle size={14} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> : ''}{item.stockLevel}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <div className="history-preview-trigger">
                                                    <button className="btn-icon" title="View Audit Trail"><History size={16} /></button>
                                                    {renderAuditPreview(item.id)}
                                                </div>
                                                <button className="btn-edit-label" onClick={() => handleEditClick(item)}>
                                                    <Pencil size={14} /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}
                    </>
                );

            case 'facilities':
                return (
                    <>
                        <table className="standard-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Location</th>
                                    <th>Condition</th>
                                    <th>Last Maintenance</th>
                                    <th>Next Maintenance</th>
                                    <th>Responsible</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className="table-row-anim">
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
                                            <span className={`status-badge ${item.status === 'Operational' ? 'completed' : 'pending'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-edit-label" onClick={() => handleEditClick(item)}>
                                                <Pencil size={14} /> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}

                        {/* Maintenance Logs Section */}
                        <div className="res-subsection">
                            <h4 className="res-subsection-title"><History size={18} /> Maintenance Logs</h4>
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
                                            <td>{log.technician}</td>
                                            <td>{log.cost}</td>
                                            <td><span className="status-badge completed">{log.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                );

            case 'equipment':
                return (
                    <>
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
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className="table-row-anim">
                                        <td className="font-bold">{item.name}</td>
                                        <td>{item.serial}</td>
                                        <td>{item.location}</td>
                                        <td className={`cond-${item.condition.toLowerCase()}`} style={{ fontWeight: 700 }}>{item.condition}</td>
                                        <td>{item.supplier}</td>
                                        <td>
                                            <span className={`badge badge-${item.status === 'Active' ? 'healthy' : item.status === 'Under Repair' ? 'warning' : 'critical'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-edit-label" onClick={() => handleEditClick(item)}>
                                                    <Pencil size={14} /> Edit
                                                </button>
                                                <button className="btn-icon" title="View Logs"><History size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}
                    </>
                );

            case 'consumables':
                return (
                    <>
                        <table className="standard-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}><Square size={18} style={{ opacity: 0.3 }} /></th>
                                    <th>Item Name</th>
                                    <th>Code/ID</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Expiry</th>
                                    <th>Stock Level</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className={`table-row-anim ${selectedItems.includes(item.id) ? 'selected-row' : ''}`}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="res-checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </td>
                                        <td className="font-bold">{item.name}</td>
                                        <td>{item.id}</td>
                                        <td>{item.quantity} {item.unit}</td>
                                        <td>{item.location}</td>
                                        <td>
                                            {item.expiry && item.expiry !== 'N/A' && new Date(item.expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? (
                                                <span className="expiry-warning"><AlertCircle size={14} /> {item.expiry}</span>
                                            ) : (
                                                <span>{item.expiry}</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`stock-badge stock-${item.stockLevel}`}>
                                                {item.stockLevel === 'critical' ? <AlertCircle size={14} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> : ''}{item.stockLevel}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-edit-label" onClick={() => handleEditClick(item)}>
                                                    <Pencil size={14} /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}
                    </>
                );

            case 'requests':
                return (
                    <>
                        {/* Sub-filter tabs */}
                        <div className="res-request-sub-tabs">
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'pending', label: 'Pending' },
                                { id: 'approved', label: 'Approved' },
                                { id: 'rejected', label: 'Rejected' },
                            ].map(sub => (
                                <button
                                    key={sub.id}
                                    className={`res-sub-tab ${requestSubFilter === sub.id ? 'active' : ''}`}
                                    onClick={() => { setRequestSubFilter(sub.id); setCurrentPage(1); }}
                                >
                                    {sub.label}
                                    {sub.id !== 'all' && (
                                        <span className="res-sub-tab-count">
                                            {requests.filter(r => r.status.toLowerCase() === sub.id).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <table className="standard-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Requestor</th>
                                    <th>Department</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((req) => (
                                    <tr key={req.id} className="table-row-anim">
                                        <td>{req.id}</td>
                                        <td className="font-bold">{req.item}</td>
                                        <td>{req.quantity}</td>
                                        <td>{req.requestor}</td>
                                        <td>{req.department}</td>
                                        <td>{req.date}</td>
                                        <td>
                                            <span className={`status-badge ${req.status.toLowerCase()}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-edit-label" onClick={() => handleEditClick(req)}>
                                                    <Pencil size={14} /> Edit
                                                </button>
                                                {req.status === 'Pending' && (
                                                    <>
                                                        <button className="btn-icon" style={{ color: '#16a34a' }} title="Approve Request"><CheckCircle2 size={16} /></button>
                                                        <button className="btn-icon" style={{ color: '#dc2626' }} title="Reject Request"><Plus size={16} style={{ transform: 'rotate(45deg)' }} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination()}
                    </>
                );

            default:
                return <div className="res-empty-placeholder"><Package size={48} /><p>Section under development.</p></div>;
        }
    };

    const currentTabInfo = navTabs.find(t => t.id === activeTab);

    return (
        <div className="resources-page">
            {/* Page Title */}
            <div className="res-page-header">
                <div>
                    <h2 className="res-page-title">Resource Management</h2>
                    <p className="res-page-subtitle">Track, manage, and organize all facility resources</p>
                </div>
                <div className="notif-bell" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                    <Bell size={24} />
                    {notifications.length > 0 && <span className="notif-badge">{notifications.length}</span>}

                    {isNotifOpen && (
                        <div className="notif-popup">
                            <div className="notif-popup-header">
                                <h4>Notifications</h4>
                                <button className="btn-close-mini" onClick={() => setIsNotifOpen(false)}>×</button>
                            </div>
                            <div className="notif-list">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div key={n.id} className={`notif-item ${n.type}`}>
                                        <AlertCircle size={16} />
                                        <span>{n.text}</span>
                                    </div>
                                )) : <div className="notif-empty">No new notifications</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ Top Tab Bar ═══ */}
            <nav className="res-tab-bar">
                {navTabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`res-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabSwitch(tab.id)}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>

            {/* ═══ Tab Content ═══ */}
            <div className="res-tab-content-area">
                {activeTab === 'overview' ? (
                    renderOverview()
                ) : (
                    <>
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
                                    <h3>{currentTabInfo?.label}</h3>
                                    <span className="res-tab-count-badge">Total Items: {
                                        activeTab === 'medical' ? medicalSupplies.length :
                                            activeTab === 'office' ? officeSupplies.length :
                                                activeTab === 'facilities' ? facilitiesItems.length :
                                                    activeTab === 'equipment' ? equipmentItems.length :
                                                        activeTab === 'consumables' ? consumablesItems.length :
                                                            activeTab === 'requests' ? requests.length : 0
                                    }</span>
                                </div>
                                <p className="res-tab-description">{TAB_DESCRIPTIONS[activeTab]}</p>
                            </div>
                            <div className="tab-actions">
                                <button className="btn-action-res primary" onClick={() => (activeTab === 'requests' ? setIsRequestModalOpen(true) : setIsAddModalOpen(true))}>
                                    <Plus size={18} /> {activeTab === 'requests' ? 'Submit Request' : 'Add Item'}
                                </button>
                            </div>
                        </div>

                        {activeTab !== 'requests' && (
                            <div className="quick-filters">
                                {['All Items', 'Low Stock', 'Needs Maintenance', 'Expiring Soon'].map(filter => (
                                    <button
                                        key={filter}
                                        className={`filter-pill ${activeQuickFilter === filter ? 'active' : ''}`}
                                        onClick={() => handleQuickFilterToggle(filter)}
                                    >
                                        {filter === 'Low Stock' && <AlertCircle size={14} />}
                                        {filter === 'Needs Maintenance' && <Wrench size={14} />}
                                        {filter === 'Expiring Soon' && <Calendar size={14} />}
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Table Controls */}
                        <div className="resource-table-controls">
                            <div className="search-bar-res">
                                <Search className="search-icon-res" size={18} />
                                <input
                                    type="text"
                                    placeholder={`Search ${currentTabInfo?.label}...`}
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                                <button className="btn-export" title="Download as CSV" onClick={handleCSVExport}><FileText size={16} /> CSV</button>
                                <button className="btn-export" title="Download as PDF" onClick={handlePDFExport}><Download size={16} /> PDF</button>
                                <button className="btn-action-res secondary btn-filter-trigger" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                    <Filter size={18} /> Filter
                                </button>

                                {isFilterOpen && (
                                    <div className="filter-popup">
                                        <div className="filter-popup-header">
                                            <h4>Advanced Filters</h4>
                                        </div>
                                        <div className="filter-options">
                                            <div className="filter-group">
                                                <label>Status</label>
                                                <select
                                                    value={activeFilters.status}
                                                    onChange={(e) => setActiveFilters(prev => ({ ...prev, status: e.target.value }))}
                                                >
                                                    <option value="all">All Statuses</option>
                                                    <option value="high">High Stock</option>
                                                    <option value="low">Low Stock</option>
                                                    <option value="critical">Critical Stock</option>
                                                    <option value="operational">Operational</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="filter-popup-footer">
                                            <button className="btn-clear" onClick={() => setActiveFilters({ status: 'all', category: 'all', dateRange: 'all' })}>Clear</button>
                                            <button className="btn-apply" onClick={() => setIsFilterOpen(false)}>Apply</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Table Content */}
                        <div className="standard-table-container">
                            {renderTable()}
                        </div>
                    </>
                )}
            </div>

            {/* ═══ Modals ═══ */}
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
                                <input type="text" className="form-input" placeholder="e.g. Surgical Masks" list="item-names" />
                                <datalist id="item-names">
                                    {allItemNames.map(name => <option key={name} value={name} />)}
                                </datalist>
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Quantity</label>
                                    <div className="quantity-selector">
                                        <button className="qs-btn" onClick={(e) => { e.preventDefault(); }}>−</button>
                                        <input type="number" className="qs-input" placeholder="0" min="0" />
                                        <button className="qs-btn" onClick={(e) => { e.preventDefault(); }}>+</button>
                                    </div>
                                </div>
                                <div className="form-group half">
                                    <label>Location</label>
                                    <select className="form-input">
                                        <option value="">Select Location</option>
                                        {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Department</label>
                                    <select className="form-input">
                                        <option value="">Select Department</option>
                                        {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                </div>
                                <div className="form-group half">
                                    <label>Expiry Date</label>
                                    <input type="date" className="form-input" />
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

            {/* Edit Resource Modal */}
            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content modern-modal edit-modal-anim" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-modern edit-header">
                            <div className="modal-icon-bg edit-icon">
                                <Pencil size={24} />
                            </div>
                            <h2>Edit {activeTab === 'infrastructure' ? 'Item' : 'Resource'}</h2>
                            <p>Update information for <strong>{itemToEdit.id}</strong></p>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="form-group">
                                <label>Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editedData.name || editedData.item || ''}
                                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value, item: e.target.value })}
                                    list="item-names-edit"
                                />
                                <datalist id="item-names-edit">
                                    {allItemNames.map(name => <option key={name} value={name} />)}
                                </datalist>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Quantity</label>
                                    <div className="quantity-selector">
                                        <button
                                            className="qs-btn"
                                            onClick={() => setEditedData({ ...editedData, quantity: Math.max(0, (editedData.quantity || 0) - 1) })}
                                        >−</button>
                                        <input
                                            type="number"
                                            className="qs-input"
                                            value={editedData.quantity || 0}
                                            onChange={(e) => setEditedData({ ...editedData, quantity: Math.max(0, parseInt(e.target.value) || 0) })}
                                            min="0"
                                        />
                                        <button
                                            className="qty-btn"
                                            onClick={() => setEditedData({ ...editedData, quantity: (editedData.quantity || 0) + 1 })}
                                        >+</button>
                                    </div>
                                </div>
                                <div className="form-group half">
                                    <label>Location</label>
                                    <select
                                        className="form-input"
                                        value={editedData.location || ''}
                                        onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                                    >
                                        <option value="">Select Location</option>
                                        {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Status / Stock Level</label>
                                    <select
                                        className="form-input"
                                        value={editedData.status || editedData.stockLevel || ''}
                                        onChange={(e) => setEditedData({ ...editedData, status: e.target.value, stockLevel: e.target.value })}
                                    >
                                        <option value="high">High Stock</option>
                                        <option value="low">Low Stock</option>
                                        <option value="critical">Critical Stock</option>
                                        <option value="Operational">Operational</option>
                                        <option value="Active">Active</option>
                                        <option value="Under Repair">Under Repair</option>
                                        <option value="Damaged">Damaged</option>
                                        <option value="In Use">In Use</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                    </select>
                                </div>
                                <div className="form-group half">
                                    <label>Expiry / Condition</label>
                                    {activeTab === 'medical' || activeTab === 'consumables' ? (
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={editedData.expiry || ''}
                                            onChange={(e) => setEditedData({ ...editedData, expiry: e.target.value })}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editedData.condition || ''}
                                            onChange={(e) => setEditedData({ ...editedData, condition: e.target.value })}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Department</label>
                                    <select
                                        className="form-input"
                                        value={editedData.department || ''}
                                        onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
                                    >
                                        <option value="">Select Department</option>
                                        {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                </div>
                                <div className="form-group half">
                                    <label>Unit</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editedData.unit || ''}
                                        onChange={(e) => setEditedData({ ...editedData, unit: e.target.value })}
                                        placeholder="e.g. Box, Bottle"
                                    />
                                </div>
                            </div>

                            <div className="audit-section-modal">
                                <div className="audit-info-row">
                                    <span className="audit-label">Edited By:</span>
                                    <span className="audit-value">{editedData.editedBy || 'System Initial'}</span>
                                </div>
                                <div className="audit-info-row">
                                    <span className="audit-label">Last Modified:</span>
                                    <span className="audit-value">{editedData.lastModified || 'Initial Record'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer-modern">
                            <button className="btn-cancel-modern" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button
                                className={`btn-save-modern ${!isDataChanged ? 'disabled' : ''}`}
                                onClick={handleSaveEdit}
                                disabled={!isDataChanged}
                            >
                                <Check size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showSuccess && (
                <div className="success-toast">
                    <CheckCircle2 size={18} />
                    <span>Resource updated successfully!</span>
                </div>
            )}
        </div>
    );
};

export default Resources;
