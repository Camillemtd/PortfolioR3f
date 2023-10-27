// AnimatedCamera.js

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Camera = ({ currentSection, target }) => {
  const cameraRef = useRef(null);
  const lerpFactor = 0.03
  const [currentLookAt, setCurrentLookAt] = useState(new THREE.Vector3(0, 6, 0));


  useFrame(() => {
    if (cameraRef.current && target.current) {
      const startPos = new THREE.Vector3(0, 0, 9);
      const endPos = new THREE.Vector3(-4, -5, 7);
      
      const currentPos = startPos.clone().lerp(endPos, currentSection);

      const startLook = new THREE.Vector3(0, 6, 0);
      const endLook = new THREE.Vector3(0, 1, 0);
      
      const currentLook = startLook.clone().lerp(endLook, currentSection);

      cameraRef.current.position.lerp(currentPos, lerpFactor);
      cameraRef.current.lookAt(target.current.position.clone().add(currentLook));
    }
});


  return <PerspectiveCamera ref={cameraRef} position={[0, 10, 9]} makeDefault />;
};

export default Camera;