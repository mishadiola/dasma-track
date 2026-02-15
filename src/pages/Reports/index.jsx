import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
    return (
        <div className="reports-page v2">
            <div className="consultations-header">
                <div className="header-title">
                    <div className="icon-circle">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1>Reports</h1>
                        <p>Generate and view health system reports</p>
                    </div>
                </div>
            </div>

            <div className="reports-content-placeholder">
                <div className="empty-state">
                    <FileText className="empty-icon" size={64} color="var(--text-muted)" />
                    <h3>Reports Content Coming Soon</h3>
                    <p>The reports section is being prepared for new updates.</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
