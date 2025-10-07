import React from 'react';

// For "Purpose" section - A new, symbolic visual
export const PurposeVisual: React.FC = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full absolute">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Central Core: The entity to be protected */}
      <circle cx="100" cy="100" r="10" fill="rgba(0,0,0,1)" filter="url(#glow)" className="animate-soft-throb" />

      {/* Layer 1: Protection (Solid, shield-like barriers) */}
      <g className="animate-slow-spin" style={{ transformOrigin: '100px 100px', animationDuration: '30s' }}>
        <path 
          d="M 50 75 A 60 60 0 0 1 150 75" 
          stroke="rgba(0,0,0,0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
        />
        <path 
          d="M 150 125 A 60 60 0 0 1 50 125" 
          stroke="rgba(0,0,0,0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
        />
      </g>

      {/* Layer 2: Transparency (A crystalline, semi-transparent structure) */}
      <g className="animate-slower-spin" style={{ transformOrigin: '100px 100px', animationDirection: 'reverse', animationDuration: '90s' }}>
        <path 
          d="M 100 20 L 170 60 L 170 140 L 100 180 L 30 140 L 30 60 Z"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
          fill="rgba(0,0,0,0.02)"
        />
      </g>
      
      {/* Layer 3: Autonomy (Multiple independent entities in orbit) */}
      <g className="animate-slow-spin" style={{ transformOrigin: '100px 100px', animationDuration: '45s', animationDirection: 'reverse' }}>
        <circle cx="100" cy="40" r="2" fill="rgba(0,0,0,0.7)" />
        <circle cx="152" cy="125" r="2" fill="rgba(0,0,0,0.7)" />
        <circle cx="48" cy="125" r="2" fill="rgba(0,0,0,0.7)" />
      </g>
    </svg>
  </div>
);


const nodes = [
    { cx: 50, cy: 100, delay: '0s' },
    { cx: 150, cy: 50, delay: '0.2s' },
    { cx: 150, cy: 150, delay: '0.4s' },
    { cx: 250, cy: 50, delay: '0.6s' },
    { cx: 250, cy: 150, delay: '0.8s' },
    { cx: 350, cy: 100, delay: '1s' },
];

const paths = [
    { d: "M 50 100 L 150 50", delay: "0s" },
    { d: "M 50 100 L 150 150", delay: "0.25s" },
    { d: "M 150 50 L 150 150", delay: "0.5s", reverse: true },
    { d: "M 150 50 L 250 50", delay: "0.75s" },
    { d: "M 150 150 L 250 150", delay: "1.0s", reverse: true },
    { d: "M 250 50 L 350 100", delay: "1.25s" },
    { d: "M 250 150 L 350 100", delay: "1.5s", reverse: true },
    { d: "M 250 50 L 250 150", delay: "1.75s" },
];


// For "Structure & Tech" section - A dynamic, decentralized node network
export const TechVisual: React.FC = () => (
    <div className="w-full h-64 md:h-96 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        <defs>
          <filter id="nodeGlowFilter" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feComponentTransfer in="blur" result="softenedGlow">
              <feFuncA type="linear" slope="0.6"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="softenedGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Static Lines - remain thin for contrast */}
        <g stroke="rgba(0,0,0,0.1)" strokeWidth="0.5">
          {paths.map(p => <path key={p.d} d={p.d} />)}
        </g>
        
        {/* Animated Data Flow - more subtle effect */}
        <g 
          stroke="rgba(0,0,0,0.4)" 
          strokeWidth="1.5"
          style={{
            animation: 'data-flow 3s linear infinite',
            strokeDasharray: '10 50',
            strokeLinecap: 'round'
          }}
        >
          {paths.map(p => (
            <path key={p.d} d={p.d} style={{ animationDelay: p.delay, animationDirection: p.reverse ? 'reverse' : 'normal' }} />
          ))}
        </g>

        {/* Nodes with a true pulsing glow effect */}
        <g>
            {nodes.map(({ cx, cy, delay }) => (
                <g key={`${cx}-${cy}`}>
                    {/* The pulsing glow, animated separately */}
                    <circle 
                      cx={cx} cy={cy} r="5" // Slightly larger glow radius
                      fill="black" 
                      filter="url(#nodeGlowFilter)"
                      className="animate-subtle-node-pulse" 
                      style={{ animationDelay: delay, transformOrigin: `${cx}px ${cy}px` }}
                    />
                    {/* The solid node on top, now static */}
                    <circle cx={cx} cy={cy} r="3" fill="black" />
                </g>
            ))}
        </g>
      </svg>
    </div>
);


// For "FEELINK" section - A new visual of interlocking orbits
export const FeelinkVisual: React.FC = () => (
    <div className="relative w-48 h-48 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
                <filter id="intersectionGlow">
                    {/* Increased glow for better visibility */}
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Orbit 1 (DPA) - More stable, circular */}
            <g className="animate-slow-spin" style={{ transformOrigin: '100px 100px', animationDuration: '20s' }}>
                <circle 
                    cx="100" cy="100" r="60" 
                    stroke="rgba(0,0,0,0.4)" // Darker stroke
                    strokeWidth="1" // Thicker stroke
                    fill="none" 
                    strokeDasharray="6 3" // More solid dash pattern
                />
            </g>
            {/* Orbit 2 (FEELINK) - More dynamic, elliptical */}
            <g className="animate-slow-spin" style={{ transformOrigin: '100px 100px', animationDuration: '25s', animationDirection: 'reverse' }}>
                <ellipse 
                    cx="100" cy="100" rx="80" ry="40" 
                    stroke="rgba(0,0,0,0.4)" // Darker stroke
                    strokeWidth="1" // Thicker stroke
                    fill="none"
                    strokeDasharray="4 4" // More solid dash pattern
                    transform="rotate(45 100 100)"
                />
            </g>
            {/* Central Synergistic Core / Intersection Point */}
            <circle 
                cx="100" cy="100" r="5" 
                fill="rgba(0,0,0,0.8)" 
                className="animate-subtle-pulse"
                filter="url(#intersectionGlow)"
                style={{ animationDuration: '3s' }}
            />
        </svg>
    </div>
);

// For "Vision" section - An expanding foundational grid
export const VisionVisual: React.FC = () => (
    <div className="relative w-64 h-64 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
                <filter id="visionGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <radialGradient id="gridGradient">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
            </defs>

            {/* Expanding Grid */}
            <g>
                {[...Array(6)].map((_, i) => (
                    <circle
                        key={i}
                        cx="100"
                        cy="100"
                        r={10 + i * 18}
                        stroke="rgba(0,0,0,0.05)"
                        strokeWidth="0.25"
                        fill="none"
                        style={{
                            transformOrigin: 'center',
                            animation: `expandGrid 8s ease-out infinite`,
                            animationDelay: `${i * 1.2}s`
                        }}
                    />
                ))}
            </g>

            {/* Central Core */}
            <circle cx="100" cy="100" r="4" fill="url(#gridGradient)" className="animate-soft-throb" style={{ animationDuration: '5s' }} />
            <circle cx="100" cy="100" r="1.5" fill="black" filter="url(#visionGlow)" />
        </svg>
    </div>
);