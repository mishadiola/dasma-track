import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SessionTimeoutModal from '../../components/Dashboard/SessionTimeoutModal';
import useSessionTimeout from '../../hooks/useSessionTimeout';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const handleLogout = () => {
        navigate('/');
    };

    const { isWarningOpen, timeLeft, stayLoggedIn } = useSessionTimeout({
        timeoutInMinutes: 15,
        warningThresholdInMinutes: 1,
        onLogout: handleLogout
    });

    return (
        <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
            <main className="dashboard-content">
                {children}
            </main>

            <SessionTimeoutModal
                isOpen={isWarningOpen}
                timeLeft={timeLeft}
                onStayLoggedIn={stayLoggedIn}
                onLogout={handleLogout}
            />
        </div>
    );
};

export default DashboardLayout;
