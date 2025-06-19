// TechnologyCard.jsx
import React from 'react';
import MetricBar from './MetricBar';
import CircularProgress from './CircularProgress';

const TechnologyCard = ({ tech, index, animationTriggered }) => {
    return (
        <div className="tech-card" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="tech-header">
                <div className="tech-icon">{tech.icon}</div>
                <div className="tech-info">
                    <h3 className="tech-name">{tech.name}</h3>
                    <div className="tech-usage-text">
                        {Math.round(tech.usage)}% utilized
                    </div>
                </div>
                <div className="tech-progress">
                    <CircularProgress percentage={tech.usage} size={80} />
                </div>
            </div>

            <div className="tech-metrics">
                {tech.metric.map((metric, metricIndex) => (
                    <MetricBar
                        key={metricIndex}
                        metric={metric}
                        index={metricIndex}
                        animationTriggered={animationTriggered}
                    />
                ))}
            </div>
        </div>
    );
};

export default TechnologyCard;
