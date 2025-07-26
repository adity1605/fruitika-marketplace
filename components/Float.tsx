"use client"

import type React from "react"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Euler, Vector3, Mesh } from "three"

interface FloatProps {
  children: React.ReactNode
  speed?: number
  rotationIntensity?: number
  floatIntensity?: number
  position?: [number, number, number]
}

export default function Float({
  children,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  position = [0, 0, 0],
}: FloatProps) {
  const mesh = useRef<Mesh>(null)
  const euler = useRef(new Euler()).current
  const vec = useRef(new Vector3()).current

  useFrame((state) => {
    if (!mesh.current) return

    const time = state.clock.getElapsedTime() * speed

    mesh.current.position.y = position[1] + Math.sin(time) * floatIntensity * 0.5
    mesh.current.rotation.x = euler.x + Math.cos(time) * rotationIntensity * 0.1
    mesh.current.rotation.y = euler.y + Math.sin(time) * rotationIntensity * 0.1
    mesh.current.rotation.z = euler.z + Math.sin(time) * rotationIntensity * 0.1
  })

  return (
    <group position={position} ref={mesh}>
      {children}
    </group>
  )
}
