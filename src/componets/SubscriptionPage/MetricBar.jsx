// MetricBar.jsx
import React from 'react';

const MetricBar = ({ metric, index, animationTriggered }) => {
    const usagePercentage = (metric.used / metric.purchased) * 100;

    return (
        <div className="metric-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="metric-header">
                <span className="metric-title">{metric.title}</span>
                <span className="metric-values">
                    {metric.used} / {metric.purchased}
                </span>
            </div>
            <div className="metric-bar">
                <div
                    className="metric-progress"
                    style={{
                        width: animationTriggered ? `${usagePercentage}%` : '0%'
                    }}
                />
            </div>
            <div className="metric-stats">
                <div className="stat">
                    <span className="stat-label">Used</span>
                    <span className="stat-value used">{metric.used}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Remaining</span>
                    <span className="stat-value remaining">{metric.remaining}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Purchased</span>
                    <span className="stat-value purchased">{metric.purchased}</span>
                </div>
            </div>
        </div>
    );
};

export default MetricBar;
