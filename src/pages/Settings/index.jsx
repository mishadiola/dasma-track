import React, { useState } from 'react';
import {
    Settings as SettingsIcon,
    Users,
    Database,
    History,
    UserPlus,
    ShieldCheck,
    MapPin,
    Layers,
    Plus,
    Edit2,
    Trash2,
    Lock,
    Key,
    Activity,
    Search,
    ChevronRight,
    Circle,
    UserCircle,
    Building2,
    ClipboardList
} from 'lucide-react';
import '../../styles/pages/_settings.css';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [role, setRole] = useState('Admin'); // Mock role for testing

    // Mock Data
    const users = [
        { id: 1, name: 'Dr. Maria Clara', role: 'Admin', dept: 'Medical', status: 'Active' },
        { id: 2, name: 'Nurse Joy', role: 'Staff', dept: 'Medical', status: 'Active' },
        { id: 3, name: 'Jose Rizal', role: 'Staff', dept: 'Office', status: 'Inactive' },
        { id: 4, name: 'Andres Bonifacio', role: 'Admin', dept: 'Facility', status: 'Active' },
    ];

    const auditLogs = [
        { id: 101, user: 'Admin (DCHO3)', action: 'Updated Stock: Surgical Masks', time: 'Feb 19, 2026 – 10:45 AM' },
        { id: 102, user: 'Nurse Joy', action: 'Added Patient: Juan Dela Cruz', time: 'Feb 19, 2026 – 09:12 AM' },
        { id: 103, user: 'Admin (DCHO3)', action: 'Changed User Role: Jose Rizal', time: 'Feb 18, 2026 – 04:20 PM' },
        { id: 104, user: 'System', action: 'Backup Completed', time: 'Feb 18, 2026 – 12:00 AM' },
    ];

    const departments = ['Medical', 'Office', 'Equipment', 'Facility', 'Consumables'];
    const storageLocations = ['Central Warehouse', 'ER Cabinet', 'Pharmacy Shelf A', 'Unit 301'];
    const diseases = ['Flu', 'Hypertension', 'Diabetes', 'Dengue', 'Fever', 'Covid-19'];

    const renderProfileSettings = () => (
        <div className="settings-section-card">
            <div className="settings-section-header">
                <div className="settings-section-title">
                    <h2>Profile Settings</h2>
                    <p>Manage your personal information and credentials</p>
                </div>
            </div>

            <div className="settings-form-content">
                <div className="user-profile-preview" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem', background: 'var(--bg-color)', borderRadius: '1rem' }}>
                    <div className="profile-avatar" style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--active-sort)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <UserCircle size={48} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Admin Account</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>City Health Office III - Dasmariñas</p>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--active-sort)', borderRadius: '2rem', marginTop: '0.5rem', display: 'inline-block' }}>{role.toUpperCase()}</span>
                    </div>
                </div>

                <div className="settings-form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-input" defaultValue="Admin User" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-input" defaultValue="admin@dcho3.gov.ph" />
                    </div>
                </div>

                <div className="settings-form-row" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                    <div className="form-group">
                        <label><Key size={14} /> Current Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label><Lock size={14} /> New Password</label>
                        <input type="password" className="form-input" placeholder="Enter new password" />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button className="btn-action-res primary">Save Changes</button>
                </div>
            </div>
        </div>
    );

    const renderUserManagement = () => (
        <div className="settings-section-card">
            <div className="settings-section-header">
                <div className="settings-section-title">
                    <h2>User Management</h2>
                    <p>Review and manage all system users and their permissions</p>
                </div>
                <button className="btn-action-res primary">
                    <UserPlus size={18} /> Add New User
                </button>
            </div>

            <div className="search-bar" style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="form-input" placeholder="Search users by name or department..." style={{ paddingLeft: '3rem' }} />
            </div>

            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td style={{ fontWeight: 700 }}>{u.name}</td>
                            <td>
                                <span style={{
                                    padding: '0.2rem 0.5rem',
                                    background: u.role === 'Admin' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                                    color: u.role === 'Admin' ? '#3b82f6' : '#6b7280',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {u.role}
                                </span>
                            </td>
                            <td>{u.dept}</td>
                            <td>
                                <span className={u.status === 'Active' ? 'user-status-active' : 'user-status-inactive'}>
                                    {u.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-report-action"><Edit2 size={14} /></button>
                                    <button className="btn-report-action" style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderSystemConfig = () => (
        <div className="settings-section-card">
            <div className="settings-section-header">
                <div className="settings-section-title">
                    <h2>System Configuration</h2>
                    <p>Global lists and infrastructure settings</p>
                </div>
            </div>

            <div className="config-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="config-block">
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                        <Building2 size={16} color="var(--active-sort)" /> Department Management
                    </h4>
                    <div className="config-items" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {departments.map(d => (
                            <span key={d} className="summary-pill" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' }}>{d} <Circle size={8} fill="currentColor" /></span>
                        ))}
                        <button className="btn-report-action" style={{ padding: '0.2rem 0.5rem' }}><Plus size={14} /></button>
                    </div>
                </div>

                <div className="config-block">
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                        <MapPin size={16} color="var(--active-sort)" /> Storage Locations
                    </h4>
                    <div className="config-items" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {storageLocations.map(l => (
                            <span key={l} className="summary-pill" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>{l}</span>
                        ))}
                        <button className="btn-report-action" style={{ padding: '0.2rem 0.5rem' }}><Plus size={14} /></button>
                    </div>
                </div>

                <div className="config-block" style={{ gridColumn: '1 / -1', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                        <Activity size={16} color="#ef4444" /> Disease List Management
                    </h4>
                    <div className="config-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
                        {diseases.map(d => (
                            <div key={d} style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {d}
                                <Trash2 size={12} color="#94a3b8" cursor="pointer" />
                            </div>
                        ))}
                        <div style={{ padding: '0.75rem', border: '1px dashed var(--active-sort)', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--active-sort)', cursor: 'pointer' }}>
                            <Plus size={16} /> Add New
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAuditLogs = () => (
        <div className="settings-section-card">
            <div className="settings-section-header">
                <div className="settings-section-title">
                    <h2>Audit & Activity Logs</h2>
                    <p>Traceability and history of all major system modifications</p>
                </div>
                <button className="btn-action-res secondary">
                    <Download size={14} /> Export Logs
                </button>
            </div>

            <div className="audit-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                {auditLogs.map((log, i) => (
                    <div key={log.id} style={{
                        padding: '1.25rem',
                        borderLeft: '3px solid ' + (i === 0 ? 'var(--active-sort)' : 'var(--border-color)'),
                        background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? 'var(--active-sort)' : '#cbd5e1' }} />
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{log.action}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged by <strong>{log.user}</strong></p>
                            </div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{log.time}</span>
                    </div>
                ))}
                <button style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--active-sort)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'center' }}>
                    Load Older Activity <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="settings-page">
            <div className="settings-header">
                <div className="header-title">
                    <div className="icon-circle" style={{ background: 'var(--active-sort)', color: 'white' }}>
                        <SettingsIcon size={24} />
                    </div>
                    <div>
                        <h1>System Settings</h1>
                        <p>Configure CHO system infrastructure and user permissions</p>
                    </div>
                </div>
            </div>

            <div className="settings-grid">
                <div className="settings-nav">
                    <button
                        className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        <UserCircle size={18} /> Profile Settings
                    </button>

                    {role === 'Admin' && (
                        <>
                            <button
                                className={`settings-nav-item ${activeSection === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveSection('users')}
                            >
                                <Users size={18} /> User Management
                            </button>
                            <button
                                className={`settings-nav-item ${activeSection === 'config' ? 'active' : ''}`}
                                onClick={() => setActiveSection('config')}
                            >
                                <Database size={18} /> System Config
                            </button>
                            <button
                                className={`settings-nav-item ${activeSection === 'audit' ? 'active' : ''}`}
                                onClick={() => setActiveSection('audit')}
                            >
                                <History size={18} /> Audit & Logs
                            </button>
                        </>
                    )}
                </div>

                <div className="settings-content">
                    {activeSection === 'profile' && renderProfileSettings()}
                    {activeSection === 'users' && role === 'Admin' && renderUserManagement()}
                    {activeSection === 'config' && role === 'Admin' && renderSystemConfig()}
                    {activeSection === 'audit' && role === 'Admin' && renderAuditLogs()}
                </div>
            </div>

            {/* Role Modifier for Demo */}
            <div className="role-badge" onClick={() => setRole(role === 'Admin' ? 'Staff' : 'Admin')}>
                <ShieldCheck size={16} />
                <span>Manage as: {role}</span>
            </div>
        </div>
    );
};

export default Settings;
