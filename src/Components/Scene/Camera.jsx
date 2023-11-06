import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Camera = ({ position, currentSection, isAnimating, setIsAnimating  }) => {
  const cameraRef = useRef(null);
  const targetPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const lerpSpeed = 0.025;

  const lookAtPoints = [
      new THREE.Vector3(0, 9, 0),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(-2.3, -4, 2.8),
      new THREE.Vector3(-1, -5, 0),
      // ... ajoutez d'autres points "look at" si nécessaire
  ];
  
  const currentLookAt = useRef(lookAtPoints[0]);

  useFrame(() => {
      if (cameraRef.current) {
        const distance = cameraRef.current.position.distanceTo(targetPosition);

        // Commencez l'animation et désactivez le scroll
        if (distance > 0.1 && !isAnimating) {
          setIsAnimating(true);
        }
          cameraRef.current.position.lerp(targetPosition, lerpSpeed);
          
          // Lerp le lookAt
          currentLookAt.current.lerp(lookAtPoints[currentSection], lerpSpeed);
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
