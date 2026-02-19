import React, { useState } from 'react';
import {
    Users,
    Activity,
    AlertCircle,
    Calendar,
    Download,
    Printer,
    TrendingUp,
    BarChart3,
    ShieldCheck,
    ArrowUpRight,
    MapPin,
    Package,
    Stethoscope,
    ChevronRight,
    Search
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import '../../styles/pages/_reports.css';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('patient');
    const [dateRange, setDateRange] = useState('This Month');
    const [role, setRole] = useState('Admin');
    const [openDownloadId, setOpenDownloadId] = useState(null);
    const [selectedBarangay, setSelectedBarangay] = useState(null);

    // Color Palettes
    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    // Heat Map / Red Gradient
    const getIntensityColor = (cases, maxCases) => {
        const ratio = cases / maxCases;
        if (ratio > 0.8) return '#ef4444'; // Dark Red
        if (ratio > 0.6) return '#f87171'; // Red-Orange
        if (ratio > 0.4) return '#fb923c'; // Orange
        if (ratio > 0.2) return '#fbbf24'; // Yellow-Orange
        return '#fde047'; // Light Yellow
    };

    // Mock Data
    const patientTrendData = [
        { name: 'Mon', count: 42 }, { name: 'Tue', count: 58 }, { name: 'Wed', count: 45 },
        { name: 'Thu', count: 82 }, { name: 'Fri', count: 65 }, { name: 'Sat', count: 35 }, { name: 'Sun', count: 28 }
    ];

    const diseaseDistData = [
        { name: 'Flu', value: 350 }, { name: 'Hypertens.', value: 280 },
        { name: 'Diabetes', value: 180 }, { name: 'Dengue', value: 120 }, { name: 'Others', value: 154 }
    ];

    const demographicsData = [
        { name: '0-12', value: 25 }, { name: '13-19', value: 15 },
        { name: '20-45', value: 35 }, { name: '46-60', value: 15 }, { name: '60+', value: 10 }
    ];

    const stockDistData = [
        { dept: 'Medical', stocks: 450 }, { dept: 'Office', stocks: 120 },
        { dept: 'Equipment', stocks: 85 }, { dept: 'Facility', stocks: 60 }, { dept: 'Consum.', stocks: 210 }
    ];

    const monthlyConsumptionData = [
        { month: 'Jan', value: 1200 }, { month: 'Feb', value: 1450 }, { month: 'Mar', value: 1100 },
        { month: 'Apr', value: 1600 }, { month: 'May', value: 1550 }, { month: 'Jun', value: 1800 }
    ];

    const communityDiseaseData = [
        { barangay: 'Sampaloc', cases: 120, mainDisease: 'Flu', trend: 'increasing' },
        { barangay: 'Dasmariñas II', cases: 110, mainDisease: 'Hypertension', trend: 'stable' },
        { barangay: 'Sta. Lucia', cases: 95, mainDisease: 'Fever', trend: 'decreasing' },
        { barangay: 'San Jose', cases: 82, mainDisease: 'Hypertension', trend: 'increasing' },
        { barangay: 'San Simon', cases: 65, mainDisease: 'Diabetes', trend: 'stable' },
        { barangay: 'Poblacion', cases: 45, mainDisease: 'Flu', trend: 'decreasing' },
        { barangay: 'Sta. Maria', cases: 35, mainDisease: 'Dengue', trend: 'stable' }
    ].sort((a, b) => b.cases - a.cases);

    const kpis = [
        { label: 'Patients This Month', value: '1,284', trend: '+12%', type: 'patient' },
        { label: 'Total Consultations', value: '4,520', trend: '+8%', type: 'consult' },
        { label: 'Low Stock Items', value: '12', trend: '-2', type: 'low' },
        { label: 'Critical Alert', value: '3', trend: 'Severe', type: 'expiry' },
    ];

    const renderChartCard = (id, title, subtitle, chart) => (
        <div className="res-chart-card">
            <div className="chart-card-header">
                <div className="chart-title-area">
                    <h3 className="res-section-title">{title}</h3>
                    <p className="res-section-subtitle">{subtitle}</p>
                </div>
                <div className="chart-export-btn">
                    <button className="btn-chart-download" onClick={() => setOpenDownloadId(openDownloadId === id ? null : id)}>
                        <Download size={14} /> Download
                    </button>
                    {openDownloadId === id && (
                        <div className="download-menu" style={{ animation: 'slideDownFade 0.2s ease-out' }}>
                            <button className="download-option" onClick={() => setOpenDownloadId(null)}>
                                <ShieldCheck size={14} /> Download PDF
                            </button>
                            <button className="download-option" onClick={() => setOpenDownloadId(null)}>
                                <BarChart3 size={14} /> Download PNG
                            </button>
                            <button className="download-option" onClick={() => setOpenDownloadId(null)}>
                                <Calendar size={14} /> Download CSV
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    {chart}
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div className="reports-page">
            {/* Header Section */}
            <div className="reports-header-section">
                <div className="header-title">
                    <div className="icon-circle" style={{ background: 'var(--active-sort)', color: 'white' }}>
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h1>System Reports & Analytics</h1>
                        <p>Executive insights across health and resource infrastructure</p>
                    </div>
                </div>

                <div className="reports-filters-bar">
                    <div className="report-filter-item">
                        <label><Calendar size={12} /> Date Range</label>
                        <select className="report-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div className="tab-actions" style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn-action-res secondary"><Download size={18} /> Global Export</button>
                        <button className="btn-action-res primary"><Printer size={18} /> Print Report</button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="reports-kpi-grid">
                {kpis.map((kpi, i) => (
                    <div key={i} className="kpi-report-card">
                        <div className={`kpi-icon-box ${kpi.type}`}>
                            {kpi.type === 'patient' ? <Users size={24} /> : kpi.type === 'consult' ? <Stethoscope size={24} /> : <Activity size={24} />}
                        </div>
                        <div className="kpi-info">
                            <h4>{kpi.value}</h4>
                            <p className="font-bold" style={{ color: 'var(--text-muted)' }}>{kpi.label}</p>
                            <div style={{ color: kpi.trend.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.2rem' }}>
                                {kpi.trend} vs last month
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="res-tab-bar" style={{ marginBottom: '2.5rem' }}>
                <button className={`res-tab-item ${activeTab === 'patient' ? 'active' : ''}`} onClick={() => setActiveTab('patient')}>
                    <Users size={16} /> Patient Reports
                </button>
                <button className={`res-tab-item ${activeTab === 'resource' ? 'active' : ''}`} onClick={() => setActiveTab('resource')}>
                    <Package size={16} /> Resource Reports
                </button>
                <button className={`res-tab-item ${activeTab === 'overall' ? 'active' : ''}`} onClick={() => setActiveTab('overall')}>
                    <TrendingUp size={16} /> Overall Reports
                </button>
            </div>

            {/* Content Area */}
            <div className="reports-content-area">
                {activeTab === 'patient' && (
                    <div className="reports-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
                        {renderChartCard('p1', 'Consultation Trends', 'Volume of patients per week',
                            <AreaChart data={patientTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Area animationDuration={1500} type="monotone" dataKey="count" stroke="#10b981" fill="rgba(16, 185, 129, 0.1)" strokeWidth={3} />
                            </AreaChart>
                        )}
                        {renderChartCard('p2', 'Disease Distribution', 'Frequency of common reported diseases',
                            <BarChart data={diseaseDistData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                <Bar animationDuration={1500} dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24} />
                            </BarChart>
                        )}
                        {renderChartCard('p3', 'Demographics', 'Patient age distribution mapping',
                            <PieChart>
                                <Pie animationDuration={1500} data={demographicsData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {demographicsData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        )}
                    </div>
                )}

                {activeTab === 'resource' && (
                    <div className="reports-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
                        {renderChartCard('r1', 'Stock Distribution', 'Current stock units per department',
                            <BarChart data={stockDistData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="dept" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar animationDuration={1500} dataKey="stocks" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        )}
                        {renderChartCard('r2', 'Monthly Consumption', 'Total supply utilization over 6 months',
                            <LineChart data={monthlyConsumptionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line animationDuration={1500} type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        )}
                        {renderChartCard('r3', 'Critical Stock Overview', 'Items requiring immediate attention',
                            <PieChart>
                                <Pie animationDuration={1500} data={[{ name: 'Critical', value: 12 }, { name: 'Warning', value: 25 }, { name: 'Stable', value: 63 }]} outerRadius={90} paddingAngle={2} dataKey="value">
                                    <Cell fill="#ef4444" />
                                    <Cell fill="#f59e0b" />
                                    <Cell fill="#10b981" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        )}
                    </div>
                )}

                {activeTab === 'overall' && (
                    <div className="reports-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
                        <div className="res-chart-card" style={{ background: 'var(--bg-color)', border: '2px solid var(--border-color)' }}>
                            <div className="chart-card-header" style={{ marginBottom: '2.5rem' }}>
                                <div className="chart-title-area">
                                    <h2 className="res-section-title" style={{ fontSize: '1.4rem', color: 'var(--active-sort)' }}>Disease Distribution Heat Map – Dasmariñas</h2>
                                    <p className="res-section-subtitle" style={{ fontSize: '0.95rem' }}>Visual health surveillance ranking by barangay case volume</p>
                                </div>
                                <div className="heat-legend" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LOW</span>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {['#fde047', '#fbbf24', '#fb923c', '#f87171', '#ef4444'].map(c => (
                                            <div key={c} style={{ width: 16, height: 16, background: c, borderRadius: '2px' }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>HIGH</span>
                                </div>
                            </div>

                            <div style={{ height: '480px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={communityDiseaseData}
                                        layout="vertical"
                                        margin={{ left: 40, right: 40 }}
                                        onClick={(state) => state && state.activePayload && setSelectedBarangay(state.activePayload[0].payload)}
                                    >
                                        <XAxis type="number" hide />
                                        <YAxis
                                            dataKey="barangay"
                                            type="category"
                                            width={140}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 13, fontWeight: 700, fill: 'var(--text-color)' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'var(--subcard-bg)', opacity: 0.5 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="recharts-default-tooltip" style={{ padding: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                                            <p style={{ fontWeight: 800, color: 'var(--active-sort)', marginBottom: '0.5rem' }}>{data.barangay}</p>
                                                            <p style={{ fontSize: '0.85rem' }}>Total Cases: <strong>{data.cases}</strong></p>
                                                            <p style={{ fontSize: '0.85rem' }}>Most Common: <strong>{data.mainDisease}</strong></p>
                                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Click for detailed breakdown panel</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="cases" radius={[0, 8, 8, 0]} barSize={32} animationDuration={2000} cursor="pointer">
                                            {communityDiseaseData.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={getIntensityColor(entry.cases, 120)}
                                                    stroke={selectedBarangay?.barangay === entry.barangay ? 'var(--active-sort)' : 'none'}
                                                    strokeWidth={2}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="heat-details-panel" style={{ background: 'var(--card-bg)', borderRadius: '1.25rem', border: '1px solid var(--border-color)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="panel-header">
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Barangay Detail</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedBarangay ? 'Selected: ' + selectedBarangay.barangay : 'Click a barangay on the map'}</p>
                            </div>

                            {!selectedBarangay ? (
                                <div className="empty-selection" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <MapPin size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                    <p style={{ fontSize: '0.85rem' }}>Select a barangay from the heat map to view detailed analytics</p>
                                </div>
                            ) : (
                                <div className="selection-stats" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Cases</span>
                                        <strong style={{ color: 'var(--active-sort)' }}>{selectedBarangay.cases}</strong>
                                    </div>
                                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Primary Disease</span>
                                        <strong>{selectedBarangay.mainDisease}</strong>
                                    </div>
                                    <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-color)', borderRadius: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Trend Status</span>
                                        <span style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '2rem',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            background: selectedBarangay.trend === 'increasing' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: selectedBarangay.trend === 'increasing' ? '#ef4444' : '#10b981'
                                        }}>
                                            {selectedBarangay.trend.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="mini-chart" style={{ marginTop: '1rem' }}>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Recent Activity</p>
                                        <div style={{ height: '100px' }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={patientTrendData.slice(0, 5)}>
                                                    <Area type="monotone" dataKey="count" stroke="var(--active-sort)" fill="rgba(16, 185, 129, 0.1)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <button className="btn-action-res primary" style={{ width: '100%', marginTop: '1rem' }}>
                                        View Full History <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem' }}>
                            {renderChartCard('o1', 'Monthly Disease Trend', 'Combined health frequency monitoring',
                                <AreaChart data={monthlyConsumptionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Area animationDuration={1500} type="step" dataKey="value" stroke="#ef4444" fill="rgba(239, 68, 68, 0.05)" strokeWidth={3} />
                                </AreaChart>
                            )}

                            {renderChartCard('o2', 'Disease Frequency', 'Total cases per disease category',
                                <BarChart data={diseaseDistData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar animationDuration={1500} dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Role Modifier Footer */}
            <div className="role-badge" onClick={() => setRole(role === 'Admin' ? 'Staff' : 'Admin')}>
                <ShieldCheck size={16} />
                <span>Viewing as: {role}</span>
            </div>
        </div>
    );
};

export default Reports;
