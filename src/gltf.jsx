import * as THREE from 'three'
import { useEffect } from 'react'
import { withResizeDetector } from 'react-resize-detector'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function GLTF({ src }) {
  const { scene } = useGLTF(src)
  const { camera } = useThree()

  const box = new THREE.Box3().setFromObject(scene)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  useEffect(() => {
    camera.position.set(size.x, size.y, size.z)
    camera.lookAt(center)
  }, [camera, scene.position])

  return (
    <mesh>
      <primitive object={scene} />
      <OrbitControls target={center} />
    </mesh>
  )
}

export function GLTFBlock(props) {
  const src = props.children[0]
  return (
    <div className="inkdrop-gltf-canvas" style={{ height: '20vh', width: '100%' }}>
      <Canvas flat linear>
        <ambientLight intensity={0.5} />
        <GLTF src={src} />
      </Canvas>
    </div>
  )
}

export default withResizeDetector(GLTFBlock)
