'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group, Box3, Vector3, Object3D } from 'three'
import { Html, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import styles from './home.module.css'

function Model() {
    const gltf = useGLTF('/VS3DLOGO2.gltf', true)
    const group = useRef<Group>(null)
    const pivot = useRef<Object3D>(null)

    useEffect(() => {
        if (group.current && pivot.current) {
            const box = new Box3().setFromObject(group.current)
            const center = new Vector3()
            box.getCenter(center)
            group.current.position.sub(center)
            pivot.current.add(group.current)
        }
    }, [])

    useFrame(({ clock }) => {
        if (pivot.current) {
            pivot.current.rotation.x = Math.PI / 2
            pivot.current.rotation.z = clock.getElapsedTime()
        }
    })

    return (
        <object3D ref={pivot}>
            <group ref={group} dispose={null} rotation-z={Math.PI} scale={3}>
                <primitive object={gltf.scene} />
            </group>
        </object3D>
    )
}


function SpinningLogo() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                if (canvasRef.current) {
                    canvasRef.current.style.width = `${window.innerWidth}px`
                    canvasRef.current.style.height = `${window.innerHeight}px`
                }
            })

            resizeObserver.observe(document.body)

            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [])

    return (
        <Canvas className={styles.fullscreen} ref={canvasRef}>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            <PerspectiveCamera makeDefault position={[0, 0, 2]} fov={50} />
            <ambientLight intensity={1} />
            <directionalLight position={[0, 10, 5]} intensity={4} />
    </Canvas>
    )
}

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(() => savedCallback.current(), delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
// function CountdownTimer() {
//     const endDate = new Date('2023-06-03T00:00:00'); // Set a fixed end date
//     const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
//     useEffect(() => {
//       setTimeLeft(Math.floor((endDate.getTime() - new Date().getTime()) / 1000));
//     }, []);
  
    // useInterval(() => {
    //   if (timeLeft !== null && timeLeft > 0) {
    //     setTimeLeft(timeLeft - 1);
    //   }
    // }, 1000);
  
    // if (timeLeft === null) {
    //   return <div className={styles.countdown}>Loading...</div>; // Render a placeholder while waiting for client-side hydration
    // }
    // const days = Math.floor(timeLeft / (24 * 60 * 60))
    // const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))
    // const minutes = Math.floor((timeLeft % (60 * 60)) / 60)
    // const seconds = timeLeft % 60

    // return (
    //     <div className={styles.countdown}>
    //       <div className={styles.timeUnit}>
    //         <span>{String(days).padStart(2, '0')}</span>
    //         <span>Days</span>
    //       </div>
    //       <div className={styles.timeUnit}>
    //         <span>{String(hours).padStart(2, '0')}</span>
    //         <span>Hours</span>
    //       </div>
    //       <div className={styles.timeUnit}>
    //         <span>{String(minutes).padStart(2, '0')}</span>
    //         <span>Minutes</span>
    //       </div>
    //       <div className={styles.timeUnit}>
    //         <span>{String(seconds).padStart(2, '0')}</span>
    //         <span>Seconds</span>
    //       </div>
    //     </div>
    //   );
    // }
export default function Home() {
    return (
      <>
        {/* ... Head component ... */}
        <main className={styles.main}>.
        <div className={styles.container}>
          <div className={styles.spinningLogo}><SpinningLogo  /></div>
          <h1 className={styles.comingSoon}>Coming Soon!</h1>
          {/* <CountdownTimer /> */}
        </div>
      </main>
    </>
  )
}
