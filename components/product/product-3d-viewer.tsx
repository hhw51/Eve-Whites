"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

function ProductModel() {
  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <boxGeometry args={[2, 3, 0.2]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  )
}

export default function Product3DViewer() {
  return (
    <div className="w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={null}>
          <ProductModel />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
