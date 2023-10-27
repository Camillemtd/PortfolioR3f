import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

import "./App.css";
import Model from "./Components/Model";
import FirstSection from "./Components/FirstSection";
import SecondSection from "./Components/SecondSection";
import ThirdSection from "./Components/ThirdSection";
import Camera from "./Components/Camera";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const modelRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 1);

    // ...
}, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflowY = "scroll";
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      
      // Calcul du ratio, limité entre 0 et 1
      let scrollRatio = Math.min(Math.max(scrollY / sectionHeight, 0), 1);
      
      setCurrentSection(scrollRatio);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 flex">
        <Canvas>
          <Camera currentSection={currentSection} target={modelRef}/>
          <ambientLight />
          <Sparkles
            size={2}
            scale={[30, 20, 4]}
            position-y={0}
            speed={0.6}
            count={500}
          />
          <Model ref={modelRef}/>
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

