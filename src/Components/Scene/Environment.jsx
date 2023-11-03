import { Box, Cone, Cylinder, useMatcapTexture } from "@react-three/drei";
import * as THREE from "three";

const Environment = () => {
  const [matcapTexture] = useMatcapTexture("4F439F_A28BE5_8570D6_7765C9", 256);
	const material = new THREE.MeshMatcapMaterial({
		color: 'red'
})
  return (
    <group scale={5} position-y={94}>
      <mesh position-y={-48.5} material={material} >
        <Box args={[50, 50, 50]}>
			<meshMatcapMaterial matcap={matcapTexture} color={'purple'}/>
		</Box>

      </mesh>
      <mesh position={[6.4, -10, -15]} rotation-z={0.5}>
        <Cylinder args={[5, 5, 40]}>
			<meshMatcapMaterial matcap={matcapTexture} color={'#7209b7'}/>
		</Cylinder>
      </mesh>
      <mesh position={[-10, -5, -15]}>
        <Cone args={[10, 40, 32]}>
		<meshMatcapMaterial matcap={matcapTexture} color={'#cdb4db'} transparent={true} opacity={0.9}/>
		</Cone>
      </mesh>
    </group>
  );
};

export default Environment;
