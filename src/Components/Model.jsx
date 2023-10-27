import { useMatcapTexture, useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

const Model = forwardRef((props, ref) => {
  const { nodes } = useGLTF("./model/cyborg2.glb");

  {
    /* Texture*/
  }
  const [matcapTexture] = useMatcapTexture("C7C7D7_4C4E5A_818393_6C6C74", 256);

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
          map={nodes.men.material.map}
          matcap={matcapTexture}
          color={"#f9f7f3"}
        />
      </mesh>
    </>
  );
});

export default Model;
