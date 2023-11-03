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


  const cameraPositions = [
    [0, 10, 9],
    [0, 0, 9],
    [-4, -5, 8],
    [-10, -30, 40 ]
    // Vous pouvez ajouter d'autres positions si nécessaire
  ];

  const modelRef = useRef(null);

  // Initialisation: Scroller tout en haut
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1);
  }, []);

  // Gérer le défilement
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        // Scroll vers le bas
        if (currentSection < cameraPositions.length - 1) {
          let nextSection = currentSection + 1;
          setCurrentSection(nextSection);
        }
      } else if (e.deltaY < 0) {
        // Scroll vers le haut
        let prevSection = currentSection - 1;
        if (prevSection >= 0) {
          setCurrentSection(prevSection);
        }
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection]);

  return (
    <>
     <div className="fixed top-0 left-0 w-full h-full z-0 flex">
        <Canvas>
          <Camera
            target={modelRef}
            position={cameraPositions[currentSection]}
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

      <Header setCurrentSection={setCurrentSection}/>
      
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
