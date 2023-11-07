import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Camera = ({ position, currentSection, isAnimating, setIsAnimating  }) => {
  const cameraRef = useRef(null);
  const targetPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const lerpSpeed = 0.03;

  const lookAtPoints = [
      new THREE.Vector3(0, 9, 0),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(-2.3, -4, 2.8),
      new THREE.Vector3(-1, -2, 0),
  ];
  const lookAtPointsMobile = [
    new THREE.Vector3(0, 9, 0),
    new THREE.Vector3(1, 2, 0),
    new THREE.Vector3(-2.3, -4, 2.8),
    new THREE.Vector3(-1, -2, 0),
];

  const [lookAtCamera, setLookAtCamera] = useState(lookAtPoints); 
console.log(lookAtCamera);
  const gererRedimensionnement = () => {
    if (window.innerWidth < 1280) {
      setLookAtCamera(lookAtPointsMobile);
    } else {
      setLookAtCamera(lookAtPoints);
    }
  };

  useEffect(() => {
    gererRedimensionnement();

    window.addEventListener('resize', gererRedimensionnement);

    return () => window.removeEventListener('resize', gererRedimensionnement);
  }, []);
  
  const currentLookAt = useRef(new THREE.Vector3(0, 9, 0));

  useFrame(() => {
      if (cameraRef.current) {
        const distance = cameraRef.current.position.distanceTo(targetPosition);

        if (distance > 0.1 && !isAnimating) {
          setIsAnimating(true);
        }
          cameraRef.current.position.lerp(targetPosition, lerpSpeed);
          
          // Lerp le lookAt
          currentLookAt.current.lerp(lookAtCamera[currentSection], lerpSpeed);
          cameraRef.current.lookAt(currentLookAt.current);

          if (distance <= 0.1 && isAnimating) {
            setIsAnimating(false);
          }
      }
  });

  return (
      <PerspectiveCamera
          ref={cameraRef}
          position={cameraRef.current ? cameraRef.current.position : targetPosition}
          makeDefault
      />
  );
};

export default Camera;
