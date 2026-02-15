import React from 'react';
import { Users, Package, AlertTriangle, Clock, Activity, FileText, Syringe, Settings } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Welcome back, Admin</p>
            </header>

            {/* Stats Section */}
            <section className="dashboard-stats">
                <div className="stat-card green-card">
                    <div className="stat-icon">
                        <Users size={32} />
                    </div>
                    <div className="stat-info">
                        <h3>Total Patients</h3>
                        <p className="stat-value">1,247</p>
                        <span className="stat-trend">+12 this week</span>
                    </div>
                </div>

                <div className="stat-card green-card">
                    <div className="stat-icon">
                        <Package size={32} />
                    </div>
                    <div className="stat-info">
                        <h3>Available Resources</h3>
                        <p className="stat-value">156</p>
                        <span className="stat-alert">8 items low stock</span>
                    </div>
                </div>
            </section>

            {/* Alerts Section */}
            <section className="dashboard-section">
                <h2 className="section-title">Important Alerts</h2>
                <div className="alerts-list">
                    <div className="alert-card red-alert">
                        <div className="alert-icon-wrapper">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="alert-content">
                            <h4>Expiring Vaccines</h4>
                            <p>12 vaccine doses expiring in 7 days</p>
                        </div>
                        <button className="btn-view">View</button>
                    </div>

                    <div className="alert-card orange-alert">
                        <div className="alert-icon-wrapper">
                            <Activity size={24} />
                        </div>
                        <div className="alert-content">
                            <h4>Low Stock Alert</h4>
                            <p>Medical supplies running low: Bandages, Antiseptic</p>
                        </div>
                        <button className="btn-view">View</button>
                    </div>

                    <div className="alert-card yellow-alert">
                        <div className="alert-icon-wrapper">
                            <Clock size={24} />
                        </div>
                        <div className="alert-content">
                            <h4>Pending Reports</h4>
                            <p>5 consultation reports awaiting review</p>
                        </div>
                        <button className="btn-view">View</button>
                    </div>
                </div>
            </section>

            {/* Quick Access Section */}
            <section className="dashboard-section">
                <h2 className="section-title">Quick Access</h2>
                <div className="quick-access-grid">
                    <button className="quick-btn">
                        <div className="quick-icon">
                            <FileText size={32} />
                        </div>
                        <div className="quick-info">
                            <h3>Patient Records</h3>
                            <p>View and manage patient information</p>
                        </div>
                    </button>

                    <button className="quick-btn">
                        <div className="quick-icon">
                            <Syringe size={32} />
                        </div>
                        <div className="quick-info">
                            <h3>Resource Management</h3>
                            <p>Manage medical supplies and equipment</p>
                        </div>
                    </button>

                    <button className="quick-btn">
                        <div className="quick-icon">
                            <Activity size={32} />
                        </div>
                        <div className="quick-info">
                            <h3>Reports</h3>
                            <p>Generate and view system reports</p>
                        </div>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
