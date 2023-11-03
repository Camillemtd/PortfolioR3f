import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, OrbitControls, SpotLight } from "@react-three/drei";

import Model from "./Components/Scene/Model";
import FirstSection from "./Components/About/FirstSection";
import SecondSection from "./Components/Projects/SecondSection";
import ThirdSection from "./Components/ThirdSection/ThirdSection";
import Camera from "./Components/Scene/Camera";
import CarouselProjetc from "./Components/Projects/CarouselProjetc";
import threejsProject from "./data/Projects";
import image from "./data/image";
import Header from "./Components/Header";
import Environment from "./Components/Scene/Environment";
import Intro from "./Components/About/Intro";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cameraPositions = [
    [0, 10, 9],
    [0, 0, 9],
    [-4, -3, 9],
    [-10, -30, 40],
  ];

  const modelRef = useRef(null);

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Gérer le défilement
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        if (currentSection < cameraPositions.length - 1) {
          let nextSection = currentSection + 1;
          setCurrentSection(nextSection);
        }
      } else if (e.deltaY < 0) {
        let prevSection = currentSection - 1;
        if (prevSection >= 0) {
          setCurrentSection(prevSection);
        }
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection]);
  const parallaxIntensity = 0.8; 


  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 flex">
        <Canvas>
          <Camera
            target={modelRef}
            position={[
              cameraPositions[currentSection][0] +
                mousePosition.x * parallaxIntensity,
              cameraPositions[currentSection][1] +
                mousePosition.y * parallaxIntensity,
              cameraPositions[currentSection][2],
            ]}
            currentSection={currentSection}
          />
          <ambientLight />
          <Environment />
          <Model ref={modelRef} />
          <CarouselProjetc
            data={threejsProject}
            images={image}
            currentSection={currentSection}
          />
          <directionalLight intensity={10} color={"white"} scale={10} />
        </Canvas>
      </div>

      <Header setCurrentSection={setCurrentSection} />

      <div className="flex flex-col w-full relative z-40">
        {currentSection === 0 && <Intro />}
        {currentSection === 1 && <FirstSection />}
        {currentSection === 2 && <SecondSection />}
        {currentSection === 3 && <ThirdSection />}
      </div>
    </>
  );
}

export default App;
