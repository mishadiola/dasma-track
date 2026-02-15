import React from 'react';
import { BarChart2 } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="analytics-page v2">
            <div className="consultations-header">
                <div className="header-title">
                    <div className="icon-circle">
                        <BarChart2 size={24} />
                    </div>
                    <div>
                        <h1>Analytics</h1>
                        <p>Data visualization and health insights</p>
                    </div>
                </div>
            </div>

            <div className="analytics-content-placeholder">
                <div className="empty-state">
                    <BarChart2 className="empty-icon" size={64} color="var(--text-muted)" />
                    <h3>Analytics Content Coming Soon</h3>
                    <p>The analytics section is being prepared for new updates.</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
