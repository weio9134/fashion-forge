import React, { useRef } from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
  const shadows = useRef(null)

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={1}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.05]}
    >
      <RandomizedLight 
        amount={5}
        radius={10}
        intensity={1.5}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={5}
        radius={10}
        intensity={1.5}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
