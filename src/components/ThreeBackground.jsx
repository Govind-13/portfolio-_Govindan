import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050505, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 30;

    // Create floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00f2ff,
      wireframe: false,
      emissive: 0x004d66,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Create secondary floating shape
    const geometry2 = new THREE.TetrahedronGeometry(3, 3);
    const material2 = new THREE.MeshPhongMaterial({
      color: 0x4facfe,
      wireframe: true,
      emissive: 0x001a66,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(8, -5, -10);
    scene.add(mesh2);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positionArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 100;
      positionArray[i + 1] = (Math.random() - 0.5) * 100;
      positionArray[i + 2] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x00f2ff,
      sizeAttenuation: true,
      transparent: true,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lights
    const light1 = new THREE.PointLight(0x00f2ff, 1, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x4facfe, 0.8, 100);
    light2.position.set(-10, -10, 10);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Mouse tracking for interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate main mesh
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      // Rotate secondary mesh
      mesh2.rotation.x -= 0.002;
      mesh2.rotation.y -= 0.003;

      // Particles rotation
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;

      // Mouse-based camera movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-background" />;
};

export default ThreeBackground;
