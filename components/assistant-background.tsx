'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * AssistantBackground
 * A living 3D "AI assistant presence": a breathing particle orb with an
 * inner glowing core and an orbiting neural point-cloud. GSAP drives the
 * idle "thinking/listening" pulse; the orb subtly follows the cursor so it
 * feels aware, like a personal assistant watching over the workspace.
 */
export function AssistantBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const BLUE = new THREE.Color('#3b82f6')
    const PURPLE = new THREE.Color('#a855f7')
    const CYAN = new THREE.Color('#22d3ee')

    // --- Scene / camera / renderer ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Root group we tilt toward the cursor.
    const root = new THREE.Group()
    scene.add(root)

    // --- Orb: particles distributed on a sphere shell ---
    const ORB_COUNT = 2600
    const orbGeo = new THREE.BufferGeometry()
    const orbPos = new Float32Array(ORB_COUNT * 3)
    const orbColor = new Float32Array(ORB_COUNT * 3)
    const orbBase = new Float32Array(ORB_COUNT * 3)
    const radius = 3

    for (let i = 0; i < ORB_COUNT; i++) {
      // even distribution on a sphere via golden spiral
      const t = i / ORB_COUNT
      const phi = Math.acos(1 - 2 * t)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const jitter = 0.85 + Math.random() * 0.15
      const x = Math.sin(phi) * Math.cos(theta) * radius * jitter
      const y = Math.sin(phi) * Math.sin(theta) * radius * jitter
      const z = Math.cos(phi) * radius * jitter
      orbPos[i * 3] = orbBase[i * 3] = x
      orbPos[i * 3 + 1] = orbBase[i * 3 + 1] = y
      orbPos[i * 3 + 2] = orbBase[i * 3 + 2] = z

      const mix = Math.random()
      const c = mix < 0.5 ? BLUE.clone().lerp(PURPLE, mix * 2) : PURPLE.clone().lerp(CYAN, (mix - 0.5) * 0.6)
      orbColor[i * 3] = c.r
      orbColor[i * 3 + 1] = c.g
      orbColor[i * 3 + 2] = c.b
    }
    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3))
    orbGeo.setAttribute('color', new THREE.BufferAttribute(orbColor, 3))

    const orbMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const orb = new THREE.Points(orbGeo, orbMat)
    root.add(orb)

    // --- Outer ambient dust cloud ---
    const DUST_COUNT = 900
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 5 + Math.random() * 5
      const phi = Math.acos(1 - 2 * Math.random())
      const theta = Math.random() * Math.PI * 2
      dustPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      dustPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      dustPos[i * 3 + 2] = Math.cos(phi) * r
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color('#6d7cff'),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // --- Glowing core sprite ---
    const coreCanvas = document.createElement('canvas')
    coreCanvas.width = coreCanvas.height = 128
    const cctx = coreCanvas.getContext('2d')!
    const grad = cctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(168,133,255,0.9)')
    grad.addColorStop(0.3, 'rgba(59,130,246,0.5)')
    grad.addColorStop(1, 'rgba(59,130,246,0)')
    cctx.fillStyle = grad
    cctx.fillRect(0, 0, 128, 128)
    const coreTex = new THREE.CanvasTexture(coreCanvas)
    const coreMat = new THREE.SpriteMaterial({
      map: coreTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    })
    const core = new THREE.Sprite(coreMat)
    core.scale.set(4.5, 4.5, 1)
    root.add(core)

    // --- Pulse state driven by GSAP (the "listening" heartbeat) ---
    const pulse = { value: 1, coreOpacity: 0.85 }
    if (!prefersReduced) {
      gsap.to(pulse, {
        value: 1.12,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to(pulse, {
        coreOpacity: 0.45,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      // gentle intro
      gsap.from(root.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 1.8, ease: 'power3.out' })
      gsap.from(orbMat, { opacity: 0, duration: 2, ease: 'power2.out' })
    }

    // --- Mouse awareness ---
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove)

    // --- Animation loop ---
    const clock = new THREE.Clock()
    let raf = 0
    const render = () => {
      const t = clock.getElapsedTime()

      // ease cursor follow
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      root.rotation.y = t * 0.12 + current.x * 0.5
      root.rotation.x = current.y * 0.35
      dust.rotation.y = -t * 0.03
      dust.rotation.x = t * 0.02

      // breathing scale
      const s = prefersReduced ? 1 : pulse.value
      orb.scale.setScalar(s)
      core.scale.set(4.5 * s, 4.5 * s, 1)
      coreMat.opacity = pulse.coreOpacity

      // subtle per-particle shimmer along normals
      if (!prefersReduced) {
        const pos = orbGeo.attributes.position.array as Float32Array
        for (let i = 0; i < ORB_COUNT; i++) {
          const bx = orbBase[i * 3]
          const by = orbBase[i * 3 + 1]
          const bz = orbBase[i * 3 + 2]
          const wobble = 1 + Math.sin(t * 1.5 + i * 0.35) * 0.02
          pos[i * 3] = bx * wobble
          pos[i * 3 + 1] = by * wobble
          pos[i * 3 + 2] = bz * wobble
        }
        orbGeo.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    render()

    // --- Resize ---
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      gsap.killTweensOf(pulse)
      gsap.killTweensOf(root.scale)
      gsap.killTweensOf(orbMat)
      orbGeo.dispose()
      orbMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      coreMat.dispose()
      coreTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  )
}
