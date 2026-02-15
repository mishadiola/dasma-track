import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
    return (
        <div className="settings-page v2">
            <div className="consultations-header">
                <div className="header-title">
                    <div className="icon-circle">
                        <SettingsIcon size={24} />
                    </div>
                    <div>
                        <h1>Settings</h1>
                        <p>Configure and manage health system preferences</p>
                    </div>
                </div>
            </div>

            <div className="settings-content-placeholder">
                <div className="empty-state">
                    <SettingsIcon className="empty-icon" size={64} color="var(--text-muted)" />
                    <h3>Settings Content Coming Soon</h3>
                    <p>The settings section is being prepared for new updates.</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
