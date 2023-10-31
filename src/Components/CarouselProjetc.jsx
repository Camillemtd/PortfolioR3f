import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useVideoTexture } from "@react-three/drei";

const CarouselProjetc = ({ images, currentSection }) => {
  // CONSTANTS
  const segments = 6;
  const radius = 5;
  const angleStep = (2 * Math.PI) / segments;

  // TEXTURES
  const imageUrls = images.map(imgObj => imgObj.image);
  const textures = useTexture(imageUrls); 
  const imageGeometry = new THREE.PlaneGeometry(5, 3);

  // STATES
  const [activeSegment, setActiveSegment] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  
  const groupRef = useRef();
  
  // INTERACTION
  const handlePointerDown = (event) => {
    setIsDragging(true);
    setLastX(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - lastX;
      setRotationSpeed(deltaX * 0.002);
      setLastX(event.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // ANIMATION
  useFrame(() => {
    if (groupRef.current && rotationSpeed !== 0) {
      groupRef.current.rotation.y += rotationSpeed;
      setRotationSpeed((prevSpeed) => prevSpeed * 0.95);
      if (Math.abs(rotationSpeed) < 0.001) {
        setRotationSpeed(0);
      }
    }

    const currentRotation = groupRef.current.rotation.y % (2 * Math.PI);
    const active = Math.round(currentRotation / angleStep) % segments;
    if (active !== activeSegment) {
      setActiveSegment(active);
    }

    function lerp(start, end, alpha) {
      return start * (1 - alpha) + end * alpha;
    }

    if (currentSection > 0.9) {
      const targetScale = 0.35;
      const currentScale = groupRef.current.scale.x;
      const newScale = lerp(currentScale, targetScale, 0.05);
      groupRef.current.scale.set(newScale, newScale, newScale);
    } else {
      const targetScale = 0;
      const currentScale = groupRef.current.scale.x;
      const newScale = lerp(currentScale, targetScale, 0.05);
      groupRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  // LISTENERS
  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  // PLANES
  const displayedTextures = textures.map((texture, index) => {
    return textures[(activeSegment + index) % textures.length];
  });

  const planes = Array(segments).fill().map((_, index) => {
    const theta = index * angleStep;
    const x = radius * Math.cos(theta) * 1.1;
    const z = radius * Math.sin(theta) * 1.1;
    const materialWithTexture = new THREE.MeshBasicMaterial({
      map: displayedTextures[index],
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });

    return (
      <mesh
        position={[x, 0, z]}
        rotation={[0, Math.PI / 2 - theta, 0]}
        key={index}
        geometry={imageGeometry}
        material={materialWithTexture}
      />
    );
  });

  // RENDER
  return (
    <>
      <group
        position={[-2.2, -5.6, 2]}
        rotation-y={Math.PI * 0.5}
        ref={groupRef}
        scale={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {planes}
        <mesh visible={false}>
          <cylinderGeometry args={[7, 7, 0.1, 6]} />
          <meshBasicMaterial wireframe />
        </mesh>
      </group>
    </>
  );
};

export default CarouselProjetc;