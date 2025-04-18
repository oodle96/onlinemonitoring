import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Machine3DProps {
  machineId?: number;
}

export default function Machine3D({ machineId = 1 }: Machine3DProps) {
  const machineRef = useRef<THREE.Group>(null);
  
  // Rotate the machine slightly for animation
  useFrame((state, delta) => {
    if (machineRef.current) {
      machineRef.current.rotation.y += delta * 0.2;
    }
  });

  // Different colors based on machine ID
  const getMachineColor = () => {
    switch (machineId) {
      case 1:
        return "#3b82f6"; // Blue
      case 2:
        return "#10b981"; // Green
      case 3:
        return "#f59e0b"; // Amber
      default:
        return "#3b82f6"; // Default blue
    }
  };

  return (
    <group ref={machineRef}>
      {/* Base of the machine */}
      <Box args={[2, 0.5, 2]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Main body */}
      <Box args={[1.5, 1.5, 1.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={getMachineColor()} metalness={0.7} roughness={0.3} />
      </Box>
      
      {/* Top part */}
      <Cylinder args={[0.5, 0.5, 0.5, 16]} position={[0, 1.75, 0]}>
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </Cylinder>
      
      {/* Control panel */}
      <Box args={[0.8, 0.1, 0.8]} position={[0, 0.5, 0.8]}>
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
      </Box>
      
      {/* Buttons */}
      <Sphere args={[0.1, 16, 16]} position={[0.2, 0.5, 0.8]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[-0.2, 0.5, 0.8]}>
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Pipes */}
      <Cylinder args={[0.1, 0.1, 1, 8]} position={[0.8, 0.5, 0]}>
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1, 8]} position={[-0.8, 0.5, 0]}>
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      {/* Floor */}
      <Box args={[10, 0.1, 10]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.7} />
      </Box>
    </group>
  );
} 