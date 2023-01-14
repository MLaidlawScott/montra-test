import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Plane, Text } from "@react-three/drei";

type Props = {
  thumbnailUri: string;
  description: string;
};

export const AuthorCanvas = ({ description, thumbnailUri }: Props) => {
  const texture = useLoader(THREE.TextureLoader, thumbnailUri);
  const [clicked, setClicked] = useState(false);
  const textRef = useRef<THREE.Mesh>();
  const imageRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (!textRef.current || !imageRef.current) {
      return null;
    }

    if (clicked) {
      console.log("textref", textRef.current.position);
      console.log("imageRef", imageRef.current.position);
      setClicked(false);
    }
    return null;
  });

  return (
    <>
      <OrbitControls />
      <Plane ref={imageRef} args={[5, 5]} onClick={() => setClicked(!clicked)}>
        <meshBasicMaterial attach="material" map={texture} />
      </Plane>
      <Text
        maxWidth={20}
        fontSize={0.9}
        anchorY="top"
        position={[0, -5, 0]}
        ref={textRef}
        color={"black"}
      >
        {description}
      </Text>
    </>
  );
};
