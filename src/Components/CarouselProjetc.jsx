import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function lerpVector(v1, v2, alpha) {
  const result = v1.clone();
  return result.lerp(v2, alpha);
}

const CarouselProjetc = ({ images, currentSection, data }) => {
  // CONSTANTS
  const segments = 6;
  const radius = 5;
  const angleStep = (2 * Math.PI) / segments;

  // TEXTURES
  const imageUrls = data.map((imgObj) => imgObj.image);
  const textures = useTexture(imageUrls);
  const imageGeometry = new THREE.PlaneGeometry(5, 3);

  // STATES
  const [activeSegment, setActiveSegment] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedPlane, setSelectedPlane] = useState(null);

  const groupRef = useRef();

  // INTERACTION
  const handlePointerDown = (event, planeIndex) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastX(event.clientX);
    if (selectedPlane === planeIndex) {
      setSelectedPlane(null);
    } else {
      setSelectedPlane(planeIndex);
    }
    event.stopPropagation();
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
    if (groupRef.current) {
      // Adjust the scale of the entire carousel based on the currentSection
      const targetForEntireCarousel =
        currentSection > 0.9
          ? new THREE.Vector3(0.35, 0.35, 0.35)
          : new THREE.Vector3(0, 0, 0);
      groupRef.current.scale.copy(
        lerpVector(groupRef.current.scale, targetForEntireCarousel, 0.1)
      );

      // Rotation logic for the carousel
      if (rotationSpeed !== 0) {
        groupRef.current.rotation.y += rotationSpeed;
        setRotationSpeed((prevSpeed) => prevSpeed * 0.95);
        if (Math.abs(rotationSpeed) < 0.001) {
          setRotationSpeed(0);
        }
      }

      // Determine the active segment based on rotation
      const currentRotation = groupRef.current.rotation.y % (2 * Math.PI);
      const active = Math.round(currentRotation / angleStep) % segments;
      if (active !== activeSegment) {
        setActiveSegment(active);
      }

      // Auto-rotation
      if (autoRotate && !isDragging) {
        groupRef.current.rotation.y += 0.002;
      }

      // Scale planes progressively using lerpVector
      const planes = groupRef.current.children;
      const targetForSelected = new THREE.Vector3(1.5, 1.5, 1.5);
      const normalScale = new THREE.Vector3(1, 1, 1);
      for (let i = 0; i < planes.length; i++) {
        if (i === selectedPlane) {
          planes[i].scale.copy(
            lerpVector(planes[i].scale, targetForSelected, 0.1)
          );
        } else {
          planes[i].scale.copy(lerpVector(planes[i].scale, normalScale, 0.1));
        }
      }
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
  const planes = Array(segments)
    .fill()
    .map((_, index) => {
      const theta = index * angleStep;
      const x = radius * Math.cos(theta) * 1.1;
      const z = radius * Math.sin(theta) * 1.1;
      const materialWithTexture = new THREE.MeshBasicMaterial({
        map: textures[index % textures.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });

      return (
        <mesh
          position={[x, 0, z]}
          rotation={[0, Math.PI / 2 - theta, 0]}
          key={index}
          geometry={imageGeometry}
          material={materialWithTexture}
          scale={[1, 1, 1]}
          onPointerDown={(event) => handlePointerDown(event, index)}
        />
      );
    });

  // RENDER
  return (
    <group
      position={[-2.2, -5.6, 2]}
      rotation-y={Math.PI * 0.5}
      ref={groupRef}
      onPointerMove={handlePointerMove}
    >
      {planes}
      <mesh visible={false}>
        <cylinderGeometry args={[7, 7, 0.1, 6]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </group>
  );
};

export default CarouselProjetc;
