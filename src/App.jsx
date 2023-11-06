import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useWindowSize,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, useProgress } from "@react-three/drei";
import useSound from "use-sound";
import soundSection1 from "/sounds/section1.mp3"; // Chemin vers vos fichiers audio
import soundSection2 from "/sounds/section2.mp3";
import soundSection3 from "/sounds/section3.mp3";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [lockScroll, setLockScroll] = useState(false);
  const [sound, setSound] = useState(true);
  const [showCarousel, setShowCarousel] = useState(window.innerWidth >= 1280); // State to determine whether to show the carousel

  const [playSoundSection1] = useSound(soundSection1, { loop: false });
  const [playSoundSection2] = useSound(soundSection2, { loop: false });
  const [playSoundSection3] = useSound(soundSection3);

  const parallaxIntensity = 0.8;
  console.log(sound);
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
      if (isAnimating || lockScroll) {
        e.preventDefault();
        return;
      }
      if (currentSection === 3) {
        if (window.scrollY > 0) {
          return;
        }
      }
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
      setLockScroll(true);
      setTimeout(() => setLockScroll(false), 1000);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection, isAnimating, lockScroll]);

  useEffect(() => {
    if (sound) {
      // Cette useEffect se déclenche chaque fois que `currentSection` change.
      switch (currentSection) {
        case 1:
          playSoundSection1();
          break;
        case 2:
          playSoundSection2();
          break;
        case 3:
          playSoundSection3();
          break;
        // Ajoutez plus de cases si vous avez plus de sections.
        default:
          // Un cas par défaut si nécessaire
          break;
      }
    }
  }, [currentSection, playSoundSection1, playSoundSection2, playSoundSection3]);

  useEffect(() => {
    function handleResize() {
      setShowCarousel(window.innerWidth >= 1280);
    }

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-0 flex">
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
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <ambientLight />
          <Environment />
          <Model ref={modelRef} />
          {showCarousel && (
            <CarouselProjetc
              data={threejsProject}
              images={image}
              currentSection={currentSection}
            />
          )}
          <directionalLight intensity={10} color={"white"} scale={10} />
        </Canvas>
      </div>

      <Header setCurrentSection={setCurrentSection} setSound={setSound} sound />

      <div className="flex flex-col w-screen relative z-40 ">
        {currentSection === 0 && <Intro />}
        {currentSection === 1 && <FirstSection />}
        {currentSection === 2 && <SecondSection />}
        {currentSection === 3 && <ThirdSection />}
      </div>
    </>
  );
}

export default App;
