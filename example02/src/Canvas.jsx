import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Canvas = () => {
  const [count, setCount] = useState(0)
  const mountRef = useRef(null)

  useEffect(() => {
    const w = 960
    const h = 540

    const renderer = new THREE.WebGLRenderer()

    const elm = mountRef.current

    elm?.appendChild(renderer.domElement)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000)
    camera.position.set(0, 0, +1000)

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      box.rotation.y += 0.01;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }

    return () => {
      elm?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef}></div>
  )
}

export default Canvas
