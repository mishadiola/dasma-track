import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Package,
    AlertTriangle,
    Clock,
    Activity,
    FileText,
    Syringe,
    Plus,
    Stethoscope,
    ClipboardList,
    BarChart3,
    Download,
    History,
    ChevronRight,
    User,
    Filter,
    CheckCircle2,
    Calendar
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [filter, setFilter] = useState('all');

    // Mock data for recent activity
    const activityFeed = [
        {
            id: 1,
            user: "Dr. Reyes",
            action: "added Paracetamol stock",
            time: "2 hours ago",
            icon: <Package size={16} />,
            route: "/resources"
        },
        {
            id: 2,
            user: "Nurse Ana",
            action: "logged Consultation #123",
            time: "3 hours ago",
            icon: <Stethoscope size={16} />,
            route: "/consultations"
        },
        {
            id: 3,
            user: "Admin",
            action: "archived expired vaccines",
            time: "5 hours ago",
            icon: <Activity size={16} />,
            route: "/resources"
        }
    ];

    // Mock data for alerts
    const alertsData = {
        active: [
            { id: 1, severity: 'critical', title: 'Expiring Vaccines', desc: '12 vaccine doses expiring in 7 days', time: '2 hrs ago', icon: <AlertTriangle size={16} />, route: "/resources?filter=expiring" },
            { id: 2, severity: 'warning', title: 'Low Stock Alert', desc: 'Medical supplies running low: Bandages, Antiseptic', time: '4 hrs ago', icon: <Activity size={16} />, route: "/resources?filter=low-stock" },
            { id: 3, severity: 'notice', title: 'Pending Reports', desc: '5 consultation reports awaiting review', time: '6 hrs ago', icon: <Clock size={16} />, route: "/consultations?tab=pending" }
        ],
        resolved: [
            { id: 4, severity: 'notice', title: 'Stock Updated', desc: 'Paracetamol stock replenished successfully', time: '1 day ago', icon: <CheckCircle2 size={16} />, route: "/resources" }
        ],
        history: [
            { id: 5, severity: 'warning', title: 'System Maintenance', desc: 'Database optimization completed', time: '2 days ago', icon: <Calendar size={16} />, route: "/dashboard" }
        ]
    };

    const filteredAlerts = alertsData[activeTab].filter(alert =>
        filter === 'all' || alert.severity === filter
    );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Welcome back, Admin</p>
            </header>

            {/* Stats Section */}
            <section className="dashboard-stats">
                <div
                    className="stat-card clickable-card"
                    onClick={() => navigate('/patients')}
                    role="button"
                    tabIndex={0}
                >
                    <div className="stat-icon-container">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Patients</span>
                        <h3 className="stat-value">1,247</h3>
                        <span className="stat-trend">+12 this week</span>
                    </div>
                </div>

                <div
                    className="stat-card clickable-card"
                    onClick={() => navigate('/resources')}
                    role="button"
                    tabIndex={0}
                >
                    <div className="stat-icon-container">
                        <Package size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Available Resources</span>
                        <h3 className="stat-value">156</h3>
                        <span className="stat-alert">8 items low stock</span>
                    </div>
                </div>
            </section>

            <div className="dashboard-grid-main">
                <div className="dashboard-left-col">
                    {/* Priority Alerts Panel */}
                    <section className="dashboard-section alerts-panel">
                        <div className="section-header-controls">
                            <div className="header-title-group">
                                <h2 className="section-title">Important Alerts</h2>
                                <span className="alert-count-badge">{filteredAlerts.length}</span>
                            </div>
                            <div className="filter-dropdown-wrapper">
                                <Filter size={14} />
                                <select
                                    className="filter-select"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="critical">Critical</option>
                                    <option value="warning">Warning</option>
                                    <option value="notice">Notice</option>
                                </select>
                            </div>
                        </div>

                        <div className="panel-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                                onClick={() => setActiveTab('active')}
                            >
                                Active Alerts
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'resolved' ? 'active' : ''}`}
                                onClick={() => setActiveTab('resolved')}
                            >
                                Resolved
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                                onClick={() => setActiveTab('history')}
                            >
                                History
                            </button>
                        </div>

                        <div className="alerts-list-panel">
                            {filteredAlerts.length > 0 ? (
                                filteredAlerts.map(alert => (
                                    <div
                                        key={alert.id}
                                        className="alert-row-item interactive-row"
                                        onClick={() => navigate(alert.route)}
                                    >
                                        <div className="alert-row-left">
                                            <span className={`priority-dot ${alert.severity}`}></span>
                                            <div className="alert-row-icon">{alert.icon}</div>
                                        </div>
                                        <div className="alert-row-center">
                                            <div className="alert-row-title">{alert.title}</div>
                                            <div className="alert-row-desc">{alert.desc}</div>
                                        </div>
                                        <div className="alert-row-right">
                                            <span className="alert-row-time">({alert.time})</span>
                                            <button
                                                className="btn-text-view"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(alert.route);
                                                }}
                                            >
                                                View <span>→</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-alerts-state">
                                    <CheckCircle2 size={32} className="no-alerts-icon" />
                                    <p>No alerts in this category.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <div className="dashboard-right-col">
                    {/* Quick Actions Section */}
                    <section className="dashboard-section">
                        <h2 className="section-title">🚀 Quick Actions</h2>
                        <div className="quick-actions-grid">
                            <button className="action-pill-btn tint-green" onClick={() => navigate('/patients/new')}>
                                <Plus size={18} />
                                <span>Add Patient</span>
                            </button>
                            <button className="action-pill-btn tint-blue" onClick={() => navigate('/consultations', { state: { openModal: true } })}>
                                <Stethoscope size={18} />
                                <span>New Consultation</span>
                            </button>
                            <button className="action-pill-btn tint-emerald" onClick={() => navigate('/resources')}>
                                <Package size={18} />
                                <span>Add Resource</span>
                            </button>
                            <button className="action-pill-btn tint-orange" onClick={() => navigate('/resources')}>
                                <ClipboardList size={18} />
                                <span>Adjust Stock</span>
                            </button>
                            <button className="action-pill-btn tint-purple" onClick={() => navigate('/consultations')}>
                                <BarChart3 size={18} />
                                <span>Reports</span>
                            </button>
                            <button className="action-pill-btn tint-gray" onClick={() => navigate('/resources')}>
                                <Download size={18} />
                                <span>Export Data</span>
                            </button>
                        </div>
                    </section>

                    {/* Recent Activity Section */}
                    <section className="dashboard-section recent-activity-section">
                        <h2 className="section-title">📌 Recent Activity</h2>
                        <div className="activity-feed">
                            {activityFeed.map(item => (
                                <div
                                    key={item.id}
                                    className="activity-item interactive-activity"
                                    onClick={() => navigate(item.route)}
                                >
                                    <div className="activity-user-icon">
                                        <User size={14} />
                                    </div>
                                    <div className="activity-content">
                                        <p>
                                            <span className="activity-user-name">{item.user}</span> {item.action}
                                        </p>
                                        <span className="activity-time">{item.time}</span>
                                    </div>
                                    <div className="activity-type-icon">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
