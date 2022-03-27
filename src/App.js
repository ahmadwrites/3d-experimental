import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { MeshWobbleMaterial, OrbitControls, Text } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import "./App.scss";

const textureDark =
  "https://images.unsplash.com/photo-1630182048152-ed2ea240b6cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
const textureLight =
  "https://images.unsplash.com/photo-1648318579308-d5ddaa38c4da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const Shape = ({ position, texture }) => {
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });
  const shapeRef = useRef(null);
  const colorMap = useLoader(TextureLoader, texture);

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
        <MeshWobbleMaterial map={colorMap} />
      </animated.mesh>
    </>
  );
};

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas shadows>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
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
              <Shape texture={textureLight} position={[-1.5, 0, 0]} />
              <Shape texture={textureDark} position={[1.5, 0, 0]} />
              <Text
                font="https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff"
                fontSize={0.2}
                color="#111"
                z={99}
                position={[0, 0, 0]}
              >
                &quot;Experimental&quot;
              </Text>
            </group>
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;
