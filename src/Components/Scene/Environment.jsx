import {
  Box,
  Cone,
  Cylinder,
  Dodecahedron,
  Octahedron,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Environment = () => {

  const [matcapTexture] = useMatcapTexture("4F439F_A28BE5_8570D6_7765C9", 256);
  const [octahedronMatcap] = useMatcapTexture(
    "910E5A_E127C3_CF1CA3_C1158F",
    256
  );
  const [matcapObject] = useMatcapTexture('CAE24E_6C9A23_A3C737_B3D43C', 256)

  const octahedron = useRef();
  const object = useRef()
  useFrame((state, delta) => {
    // Assurez-vous que la référence est définie avant d'essayer de modifier le maillage
    if (octahedron.current) {
      // Modifiez ces valeurs pour changer la vitesse et l'axe de rotation
      octahedron.current.rotation.x += delta * 0.5;
      octahedron.current.rotation.y += delta * 0.5;
    }
    if (object.current) {
      // Modifiez ces valeurs pour changer la vitesse et l'axe de rotation
      object.current.rotation.x += delta * 0.8;
      object.current.rotation.y += delta * 0.8;
    }
  });
  return (
    <>
      <group scale={5} position-y={94}>
        <mesh position-y={-48.5}>
          <Box args={[50, 50, 50]}>
            <meshMatcapMaterial matcap={matcapTexture} color={"purple"} />
          </Box>
        </mesh>
        <mesh position={[6.4, -10, -15]} rotation-z={0.5}>
          <Cylinder args={[5, 5, 40]}>
            <meshMatcapMaterial matcap={matcapTexture} color={"#cdb4db"} />
          </Cylinder>
        </mesh>
        <mesh position={[-10, -5, -15]}>
          <Cone args={[10, 40, 32]}>
            <meshMatcapMaterial
              matcap={matcapTexture}
              color={"#e7c6ff"}
              transparent={true}
              opacity={0.9}
            />
          </Cone>
        </mesh>
      </group>
      <mesh position={[1.5, 1, 0]} ref={octahedron}>
        <Octahedron args={[0.2]}>
          <meshMatcapMaterial
            matcap={octahedronMatcap}
            color={"#e27396"}
          />
        </Octahedron>
      </mesh>
      <mesh position={[2, 2.6, -1]} material-color={"#e27396"} ref={object}>
        <Dodecahedron args={[0.2]}>
          <meshMatcapMaterial
            matcap={matcapObject}
          />
        </Dodecahedron>
      </mesh>
    </>
  );
};

export default Environment;
