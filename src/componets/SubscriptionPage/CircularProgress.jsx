
import React from 'react';

const CircularProgress = ({ percentage, size }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} className="circular-progress">
            <circle
                stroke="#e6e6e6"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke="#007bff"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                className="circular-progress-bar"
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="14"
                fill="#333"
            >
                {Math.round(percentage)}%
            </text>
        </svg>
    );
};

export default CircularProgress;
