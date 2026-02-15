import React from 'react';
import { LogOut, Clock, ShieldAlert } from 'lucide-react';

const SessionTimeoutModal = ({ isOpen, timeLeft, onStayLoggedIn, onLogout }) => {
    if (!isOpen) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 3000 }}>
            <div className="modal-v2 compact">
                <div className="modal-header-v2" style={{ backgroundColor: '#fff7ed' }}>
                    <div className="icon-circle shadow-sm" style={{ backgroundColor: '#ffedd5', margin: '0 auto 1rem' }}>
                        <ShieldAlert size={32} color="#ea580c" />
                    </div>
                    <h3 style={{ color: '#9a3412' }}>Session Security Warning</h3>
                    <p className="small">Your session is about to expire due to inactivity.</p>
                </div>
                <div className="modal-body-v2 centered">
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: timeLeft < 10 ? '#dc2626' : '#ea580c',
                        margin: '1rem 0',
                        fontVariantNumeric: 'tabular-nums'
                    }}>
                        {formatTime(timeLeft)}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        For your security, you will be automatically logged out if there is no response.
                    </p>
                </div>
                <div className="modal-footer-v2" style={{ padding: '1.5rem', justifyContent: 'center', gap: '1rem', flexDirection: 'column' }}>
                    <button className="btn-v2 primary bg-green" onClick={onStayLoggedIn} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Clock size={18} />
                        Stay Logged In
                    </button>
                    <button className="btn-v2 secondary" onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <LogOut size={18} />
                        Logout Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeoutModal;
