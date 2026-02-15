import React from 'react';
import { LayoutDashboard, Users, Stethoscope, Package, FileText, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <img src="/src/assets/images/logo-placeholder.png" alt="CHO 3 Logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                    <div style={{ display: 'none', width: '40px', height: '40px', background: 'white', borderRadius: '50%', margin: '0 auto' }}></div>
                </div>
                <div className="sidebar__title">
                    <h2>CHO 3</h2>
                    <p>Health System</p>
                </div>
            </div>

            <nav className="sidebar__nav">
                <Link to="/dashboard" className={`sidebar__link ${isActive('/dashboard') ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/patients" className={`sidebar__link ${isActive('/patients') ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Patients</span>
                </Link>
                <Link to="/consultations" className={`sidebar__link ${isActive('/consultations') ? 'active' : ''}`}>
                    <Stethoscope size={20} />
                    <span>Consultations</span>
                </Link>
                <Link to="/resources" className={`sidebar__link ${isActive('/resources') ? 'active' : ''}`}>
                    <Package size={20} />
                    <span>Resources</span>
                </Link>
                <Link to="/reports" className={`sidebar__link ${isActive('/reports') ? 'active' : ''}`}>
                    <FileText size={20} />
                    <span>Reports</span>
                </Link>
                <Link to="/settings" className={`sidebar__link ${isActive('/settings') ? 'active' : ''}`}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className="sidebar__footer">
                <ThemeToggle />
                <Link to="/" className="sidebar__link logout">
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
