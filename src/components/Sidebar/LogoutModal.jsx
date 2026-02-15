import React from 'react';
import { LogOut, AlertCircle, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-v2 compact">
                <div className="modal-header-v2 bg-red-light">
                    <div className="icon-circle shadow-sm" style={{ backgroundColor: '#fee2e2', margin: '0 auto 1rem' }}>
                        <AlertCircle size={32} color="#dc2626" />
                    </div>
                    <h3>Logout Confirmation</h3>
                    <p className="small">Are you sure you want to exit?</p>
                </div>
                <div className="modal-body-v2 centered">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        You will need to login again to access your dashboard and patient records.
                    </p>
                </div>
                <div className="modal-footer-v2" style={{ padding: '1.5rem', justifyContent: 'center', gap: '1.25rem' }}>
                    <button className="btn-v2 secondary" onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px', justifyContent: 'center' }}>
                        <X size={18} />
                        Cancel
                    </button>
                    <button className="btn-v2 primary bg-red" onClick={onConfirm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '120px', justifyContent: 'center', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)' }}>
                        <LogOut size={18} />
                        Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
