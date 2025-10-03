import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import './App.css';

// A single cube component
function Cube({ position, color, ...props }) {
  const meshRef = useRef();
  
  return (
    <mesh {...props} position={position} ref={meshRef}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// The main Rubik's Cube component
function RubiksCube() {
  const colors = ['red', 'orange', 'white', 'yellow', 'green', 'blue'];
  const cubes = [];

  // Create the 27 small cubelets
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip the center cube
        if (x === 0 && y === 0 && z === 0) continue;

        let cubeColors = {};
        // Assign colors to the cube faces based on position
        // This logic is a simple illustration and would need
        // to be more robust for an actual puzzle
        if (x === 1) cubeColors.right = 'orange';
        if (x === -1) cubeColors.left = 'red';
        if (y === 1) cubeColors.top = 'white';
        if (y === -1) cubeColors.bottom = 'yellow';
        if (z === 1) cubeColors.front = 'blue';
        if (z === -1) cubeColors.back = 'green';
        
        cubes.push(
          <Cube
            key={`${x}${y}${z}`}
            position={[x, y, z]}
            // For a basic visual, just use a placeholder color
            // A full implementation requires more advanced state management
            color={colors[Math.floor(Math.random() * colors.length)]} 
          />
        );
      }
    }
  }

  return <group>{cubes}</group>;
}

export default function App() {
  return (
    <div className="fullscreen">
      <Canvas shadows camera={{ position: [10, 10, 15], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RubiksCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
