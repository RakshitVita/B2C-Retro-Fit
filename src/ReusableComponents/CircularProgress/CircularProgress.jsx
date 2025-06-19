import React, { useEffect, useState } from "react";
import "./CircularProgress.css";

const CircularProgress = ({ percent }) => {
  const radius = 80;
  const stroke = 11;
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  // State to animate strokeDashoffset
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Animate offset when percent changes
    const progressOffset = circumference - (percent / 100) * circumference;
    // Use requestAnimationFrame for smoothness
    requestAnimationFrame(() => {
      setOffset(progressOffset);
    });
  }, [percent, circumference]);

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="circular-progress"
    >
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#322951"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="progress-ring"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="12"
        fill="#333"
      >
        {percent}%
      </text>
    </svg>
  );
};

export default CircularProgress;
