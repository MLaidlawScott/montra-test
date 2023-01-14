import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Plane, Text } from "@react-three/drei";

type Props = {
  thumbnailUri: string;
  description: string;
};

export const AuthorCanvas = ({ description, thumbnailUri }: Props) => {
  const texture = useLoader(THREE.TextureLoader, thumbnailUri);
  const [clicked, setClicked] = useState(false);
  const textRef = useRef<THREE.Mesh>();
  const imageRef = useRef<THREE.Mesh>();

  useFrame(({ mouse }) => {
    const { y } = mouse;

    const imageY = imageRef.current?.position.y;
    const textY = textRef.current?.position.y;

    if (imageY === undefined || textY === undefined) {
      return;
    }

    if (y <= 0.9 && y > 0 && imageY >= 0) {
      imageRef.current?.translateY(-0.1);
      textRef.current?.translateY(-0.1);
    }

    if (y <= 0 && y > -0.9 && textY <= 26) {
      imageRef.current?.translateY(0.1);
      textRef.current?.translateY(0.1);
    }
  });

  return (
    <>
      <Plane ref={imageRef} args={[5, 5]} onClick={() => setClicked(!clicked)}>
        <meshBasicMaterial attach="material" map={texture} />
      </Plane>
      <Text
        maxWidth={10}
        fontSize={0.5}
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
