import React from 'react';
import { LogOut, AlertCircle, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-v2 compact">
                <div className="modal-header-v2">
                    <div className="icon-circle shadow-sm bg-red-light" style={{ margin: '0 auto 1.25rem' }}>
                        <AlertCircle size={32} color="#dc2626" />
                    </div>
                    <h3>Logout Confirmation</h3>
                    <p className="small">Are you sure you want to exit?</p>
                </div>
                <div className="modal-body-v2 centered">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        You will need to login again to access your dashboard and patient records.
                    </p>
                </div>
                <div className="modal-footer-v2" style={{ justifyContent: 'stretch' }}>
                    <button className="btn-v2 secondary" onClick={onCancel} style={{ flex: 1 }}>
                        <X size={18} />
                        Cancel
                    </button>
                    <button className="btn-v2 bg-red" onClick={onConfirm} style={{ flex: 1 }}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
