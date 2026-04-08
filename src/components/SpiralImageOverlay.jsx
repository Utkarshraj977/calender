import React from 'react';

const SpiralImageOverlay = ({ imageSrc, spiralColor = 'white', spiralThickness = 2 }) => {
  // A simple example of an Archimedean spiral SVG path
  const spiralPath = 'M 100 100 Q 110 90, 120 100 Q 130 110, 140 100 Q 150 90, 160 100 Q 170 110, 180 100 Q 190 90, 200 100';

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={imageSrc} alt="Base" style={{ maxWidth: '100%', height: 'auto' }} />
      {/* Position the SVG absolutely over the image */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '10%', // Adjust positioning
          left: '10%',
          width: '30%', // Adjust size relative to image
          height: '30%',
          pointerEvents: 'none' // Let user interact with the image below
        }}
      >
        <path
          d={spiralPath}
          fill="none"
          stroke={spiralColor}
          strokeWidth={spiralThickness}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Usage
// <SpiralImageOverlay imageSrc="your-image-url.jpg" spiralColor="blue" spiralThickness={3} />