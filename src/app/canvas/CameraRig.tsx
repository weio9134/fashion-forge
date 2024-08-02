"use client"
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import * as THREE from 'three'
import state from '@/store'

type Props = {
  children: JSX.Element[]
}

const CameraRig = ({ children }: Props) => {
  const snap = useSnapshot(state)
  const group = useRef<THREE.Group>(null!)

  useFrame((frameState, delta) => {
    const isBreakpoint = window.innerWidth <= 1280
    const isMobile = window.innerWidth <= 640

    let targetPosition = new THREE.Vector3(-0.4, 0, 2)
    if (snap.intro) {
      if (isBreakpoint) targetPosition.set(0, 0, 2)
      if (isMobile) targetPosition.set(0, 0.2, 2.5)
    } else {
      if (isMobile) targetPosition.set(0, 0, 2.5)
      else targetPosition.set(0, 0, 2)
    }

    easing.damp3(frameState.camera.position, targetPosition.toArray(), 0.25, delta)

    easing.dampE(
      group.current.rotation,
      [frameState.pointer.y / 10, -frameState.pointer.x / 5, 0],
      0.25,
      delta
    )
  })

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig
