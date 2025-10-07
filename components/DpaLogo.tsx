import React from 'react';

export const DpaLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="DPA Logo"
  >
    <title>DPA Logo</title>
    {/* Hexagon Outline */}
    <path
      d="M17 3 L7 3 L2 12 L7 21 L17 21 L22 12 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Decentralized Network Triangle */}
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Connecting lines */}
      <path d="M12 6 L6.8 15" strokeWidth="1" />
      <path d="M6.8 15 L17.2 15" strokeWidth="1" />
      <path d="M17.2 15 L12 6" strokeWidth="1" />
      {/* Nodes */}
      <g fill="currentColor">
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="6.8" cy="15" r="1.5" />
          <circle cx="17.2" cy="15" r="1.5" />
      </g>
    </g>
  </svg>
);
