import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

import "./App.scss";
import { MeshWobbleMaterial } from "@react-three/drei";

const Shape = ({ position, color }) => {
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });
  const shapeRef = useRef(null);

  useFrame(({ clock }) => {
    shapeRef.current.rotation.x = Math.sin(clock.getElapsedTime());
  });

  return (
    <>
      <animated.mesh
        position={position}
        scale={scale}
        castShadow
        onClick={() => setActive(!active)}
        ref={shapeRef}
      >
        <boxGeometry />
        <MeshWobbleMaterial color={color} />
      </animated.mesh>
    </>
  );
};

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas shadows>
          <ambientLight intensity={0.3} />
          <directionalLight
            color="white"
            position={[0, 10, 0]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <group>
            <mesh
              rotation={[-0.5 * Math.PI, 0, 0]}
              position={[0, -1, 0]}
              receiveShadow
            >
              <planeBufferGeometry args={[10, 10, 1, 1]} />
              <shadowMaterial transparent opacity={0.2} />
            </mesh>
            <Shape color="pink" position={[-2, 0, 0]} />
            <Shape color="lightblue" position={[2, 0, 0]} />
          </group>
        </Canvas>
      </div>
      <h4 className="title">&quot;Experimental&quot;</h4>
    </>
  );
}

export default App;
