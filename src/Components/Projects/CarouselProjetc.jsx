import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import React from "react";

function lerpVector(v1, v2, alpha) {
  const result = v1.clone();
  return result.lerp(v2, alpha);
}

const CarouselProjetc = ({ currentSection, data }) => {
  // CONSTANTS
  const segments = 6;
  const radius = 5;
  const angleStep = (2 * Math.PI) / segments;

  // TEXTURES
  const imageUrls = data.map((imgObj) => imgObj.image);
  const textures = useTexture(imageUrls);
  const imageGeometry = new THREE.PlaneGeometry(5, 3);

  // STATES
  const [activeSegment, setActiveSegment] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedPlane, setSelectedPlane] = useState(null);

  const groupRef = useRef();

  // INTERACTION
  const handlePointerDown = (event, planeIndex) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastX(event.clientX);
    if (selectedPlane === planeIndex) {
      setSelectedPlane(null);
    } else {
      setSelectedPlane(planeIndex);
    }
    event.stopPropagation();
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - lastX;
      setRotationSpeed(deltaX * 0.002);
      setLastX(event.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // ANIMATION
  useFrame(() => {
    if (groupRef.current) {
      // Adjust the scale of the entire carousel based on the currentSection
      const targetForEntireCarousel =
        currentSection === 2
          ? new THREE.Vector3(0.35, 0.35, 0.35)
          : new THREE.Vector3(0, 0, 0);
      groupRef.current.scale.copy(
        lerpVector(groupRef.current.scale, targetForEntireCarousel, 0.04)
      );

      // Rotation logic for the carousel
      if (rotationSpeed !== 0) {
        groupRef.current.rotation.y += rotationSpeed;
        setRotationSpeed((prevSpeed) => prevSpeed * 0.95);
        if (Math.abs(rotationSpeed) < 0.001) {
          setRotationSpeed(0);
        }
      }

      // Determine the active segment based on rotation
      const currentRotation = groupRef.current.rotation.y % (2 * Math.PI);
      const active = Math.round(currentRotation / angleStep) % segments;
      if (active !== activeSegment) {
        setActiveSegment(active);
      }

      // Auto-rotation
      if (autoRotate && !isDragging) {
        groupRef.current.rotation.y += 0.002;
      }

      // Scale planes progressively using lerpVector
      const planes = groupRef.current.children;
      const targetForSelected = new THREE.Vector3(1.5, 1.5, 1.5);
      const normalScale = new THREE.Vector3(1, 1, 1);
      for (let i = 0; i < planes.length; i++) {
        if (i === selectedPlane) {
          planes[i].scale.copy(
            lerpVector(planes[i].scale, targetForSelected, 0.1)
          );
        } else {
          planes[i].scale.copy(lerpVector(planes[i].scale, normalScale, 0.1));
        }
      }
    }
  });

  // LISTENERS
  useEffect(() => {
    setSelectedPlane(null);
  }, [activeSegment]);

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    setSelectedPlane(null)
  }, [currentSection])

  // PLANES
  const planes = Array(segments)
    .fill()
    .map((_, index) => {
      const theta = index * angleStep;
      const x = radius * Math.cos(theta) * 1.1;
      const z = radius * Math.sin(theta) * 1.1;
      const computedOpacity = selectedPlane === index ? 1 : 0.9;
      const materialWithTexture = new THREE.MeshBasicMaterial({
        map: textures[index % textures.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: computedOpacity,
        depthWrite: false,
      });
      return (
        <React.Fragment key={index}>
          <mesh
            position={[x, 0, z]}
            rotation={[0, Math.PI / 2 - theta, 0]}
            geometry={imageGeometry}
            material={materialWithTexture}
            scale={[1, 1, 1]}
            onPointerDown={(event) => handlePointerDown(event, index)}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'auto';
            }}
          ></mesh>
          {selectedPlane === index && (
            <Html fullscreen>
              <div className="flex w-1/2  text-white w-100 justify-between pt-32 pl-2 slide-in-right ">
                <div className="w-1/2 flex flex-col">
                  <h1 className="text-3xl font-bold text-lime-300">
                    {data[index % data.length].title}
                  </h1>
                  <br />
                  <p>{data[index % data.length].date}</p>
                  <p>{data[index % data.length].techno}</p> <br />
                  <p>{data[index % data.length].description}</p>
                  <div className="w-100 flex justify-center mb-2 p-10 gap-10">
                    <a href={data[index % data.length].lienGit}>
                      <svg
                        className="w-10 fill-white cursor-pointer"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                    <a href={data[index % data.length].link}>
                      <svg
                        className="w-10 fill-white cursor-pointer"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Google Chrome</title>
                        <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </Html>
          )}
        </React.Fragment>
      );
    });

  // RENDER
  return (
    <group
      position={[-2.3, -5, 2.8]}
      rotation-y={Math.PI * 0.5}
      ref={groupRef}
      onPointerMove={handlePointerMove}
    >
      {planes}
      <mesh visible={false}>
        <cylinderGeometry args={[7, 7, 0.1, 6]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </group>
  );
};

export default CarouselProjetc;
