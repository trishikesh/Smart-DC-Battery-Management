import React from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const CylinderModel = () => (
  <mesh>
    <cylinderGeometry args={[1, 1, 3, 32]} />
    <meshStandardMaterial color="lightblue" />
  </mesh>
);

const PublicPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-100 flex flex-col">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Smart Battery Management System</h1>
          <p className="text-lg text-gray-600">
            Manage your battery efficiently with our advanced system. Monitor performance, ensure security, and optimize usage.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Get Started</button>
        </div>
        <div className="flex-1">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CylinderModel />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;