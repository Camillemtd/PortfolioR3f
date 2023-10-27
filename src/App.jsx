import { Canvas, useFrame, useThree, } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import "./App.css";

import Model from "./Model";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";


function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 flex">
        <Canvas
          // camera={{
          //   fov: 45,
          //   near: 0.1,
          //   far: 200,
          //   position: [0,0,9],
          // }}
        >
          <PerspectiveCamera position={[0, 0, 9]} makeDefault/>
          <ambientLight />
          <Sparkles
            size={2}
            scale={[30, 20, 4]}
            position-y={0}
            speed={0.6}
            count={500}
          />
          <Model />
        </Canvas>
      </div>
      <div className="flex flex-col h-full w-full">
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </div>
    </>
  );
}

export default App;
