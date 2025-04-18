import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Machine3D from './Machine3D';

interface Scene3DProps {
  machineId?: number;
}

export default function Scene3D({ machineId = 1 }: Scene3DProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden backdrop-blur-md bg-gray-900/30 border border-gray-700/50 shadow-lg">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls 
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Machine Model */}
        <Machine3D machineId={machineId} />
        
        {/* Floor */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1, 0]} 
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333333" opacity={0.7} transparent />
        </mesh>
      </Canvas>
    </div>
  );
} 