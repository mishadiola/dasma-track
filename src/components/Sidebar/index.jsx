import React, { useState } from 'react';
import { LayoutDashboard, Users, Stethoscope, Package, FileText, Settings, LogOut, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import Logo from '../Logo';
import LogoutModal from './LogoutModal';

const Sidebar = ({ isCollapsed, onToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogoutConfirm = () => {
        setIsLogoutModalOpen(false);
        navigate('/');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/patients', label: 'Patients', icon: Users },
        { path: '/consultations', label: 'Consultations', icon: Stethoscope },
        { path: '/resources', label: 'Resources', icon: Package },
        { path: '/reports', label: 'Reports', icon: FileText },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar__toggle" onClick={onToggle} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <div className="sidebar__header">
                <Logo variant="sidebar" />
                {!isCollapsed && (
                    <div className="sidebar__title">
                        <h2>CHO 3</h2>
                        <p>Health System</p>
                    </div>
                )}
            </div>

            <nav className="sidebar__nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar__link ${isActive(item.path) ? 'active' : ''}`}
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon size={20} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="sidebar__footer">
                <ThemeToggle isCollapsed={isCollapsed} />
                <div
                    className="sidebar__link logout"
                    onClick={() => setIsLogoutModalOpen(true)}
                    style={{ cursor: 'pointer' }}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onConfirm={handleLogoutConfirm}
                onCancel={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
};

export default Sidebar;
