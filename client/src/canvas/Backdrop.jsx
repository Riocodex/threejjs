import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]} // Keep rotation to ensure shadows are cast downward
      position={[0, 0, -0.14]}
    >
      {/* Light positioned on the left */}
      <RandomizedLight 
        amount={4}
        radius={9}
        intensity={0.7} // Stronger light for more pronounced shadows
        ambient={0.3} // Lower ambient light for sharper contrast
        position={[-5, 5, -5]} // Left-side light
      />
      {/* Additional light for fill, slightly to the front */}
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={2} // Softer light
        ambient={0.5} // Balanced ambient to avoid overexposure
        position={[0, 5, -10]} // Front-left position
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
