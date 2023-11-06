import { useMatcapTexture, useGLTF, Box } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from 'three'

const Model = forwardRef((props, ref) => {
  const { nodes } = useGLTF("./model/cyborg2.glb");

  const x = 0,
    y = 0;

  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
  const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 'orange' } );

  {
    /* Texture*/
  }
  const [matcapTexture] = useMatcapTexture("0A0A0A_A9A9A9_525252_747474", 256);

  return (
    <>
      <mesh
        ref={ref}
        geometry={nodes.men.geometry}
        position={[0, -6, -2]}
        rotation-x={Math.PI * -0.4}
        rotation-z={-0.2}
        scale={15}
        material={nodes.men.material}
      >
        <meshMatcapMaterial
          // map={nodes.men.material.map}
          matcap={matcapTexture}
          color={"#f9f7f3"}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      <mesh material={material} geometry={geometry} scale={0.08} rotation-z={Math.PI} rotation-y={-0.3} position={[4.5, -1.5, 1]}>
      </mesh>
    </>
  );
});

export default Model;


