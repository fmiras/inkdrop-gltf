import { Suspense } from 'react'
import { withResizeDetector } from 'react-resize-detector'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function GLTF({ src }) {
  const { scene } = useGLTF(src)
  return <primitive object={scene} />
}

export function GLTFBlock(props) {
  const src = props.children[0]
  return (
    <Canvas pixelRatio={[1, 1]} camera={{ position: [-100, 60, 100], fov: 60 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <GLTF src={src} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default withResizeDetector(GLTFBlock)
