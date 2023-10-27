import {
  useFBX,
  useTexture,
  useMatcapTexture,
  useGLTF,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const Model = () => {
  const { nodes } = useGLTF("./model/cyborg2.glb");
  console.log(nodes);

  {
    /* Texture*/
  }
  const [matcapTexture] = useMatcapTexture("C7C7D7_4C4E5A_818393_6C6C74", 256);
  const normalTexture = useTexture("./model/cyborgbody_n.png");
  const defaultTexture = useTexture("./model/cyborgbody_D.png");
  // defaultTexture.flipY = true;
  const roughnessTexture = useTexture("./model/cyborgbody_s.png");
  const metalnessTexture = useTexture("./model/cyborgbody_e.png");

  const [positionModel, setPositionModel] = useState(
    new THREE.Vector3(0, -6.5, -3)
  );
  const modelRef = useRef();
  console.log(modelRef);
  const prevScrollY = useRef(0);

  let scrollY = window.scrollY;
  let currentSection = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const newSection = Math.round(currentScrollY / window.innerHeight);

      // if (newSection === 1) {
      //   modelRef.current.position.y += 0.4;
      // }
      // console.log(currentSection);

      console.log(newSection);

      //   if (currentScrollY > prevScrollY.current) {
      //     // Défilement vers le bas : déplacez le modèle vers le haut
      //     modelRef.current.position.y += 0.5;
      //   } else if (currentScrollY < prevScrollY.current) {
      //     // Défilement vers le haut : déplacez le modèle vers le bas
      //     modelRef.current.position.y -= 0.5;
      //   }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <mesh
        ref={modelRef}
        geometry={nodes.men.geometry}
        position={positionModel}
        rotation-x={Math.PI * -0.4}
        rotation-z={-0.2}
        scale={15}
        material={nodes.men.material}
        
      >
        <meshMatcapMaterial map={nodes.men.material.map} matcap={matcapTexture} color={'#f9f7f3'}/>
      </mesh>

      {/* <mesh
        geometry={nodes.armMen.geometry}
        position={[0.1, -6, -3.6]}
        scale={15}
        rotation={nodes.armMen.rotation}
      >
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>

      <mesh
        geometry={nodes.handMen.geometry}
        position={[-0.2, -6, -3.7]}
        scale={15}
        rotation={nodes.handMen.rotation}
      >
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh> */}
    </>
  );
};

export default Model;
