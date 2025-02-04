import React, { useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Line, LineBasicMaterial, BufferGeometry, Vector3 } from "three";

// Extend Three.js with Line
extend({ Line, LineBasicMaterial, BufferGeometry, Vector3 });

const DrawingLine = ({ points }) => {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="white" linewidth={2} />
    </line>
  );
};

const ThreeDCanvas = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    setCurrentLine([new Vector3(event.point.x, event.point.y, event.point.z)]);
  };

  const handleMouseMove = (event) => {
    if (isDrawing.current) {
      setCurrentLine((prev) => [
        ...prev,
        new Vector3(event.point.x, event.point.y, event.point.z),
      ]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current) {
      setLines((prev) => [...prev, currentLine]);
      setCurrentLine([]);
      isDrawing.current = false;
    }
  };

  const handleClearCanvas = () => {
    setLines([]);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {lines.map((line, index) => (
          <DrawingLine key={index} points={line} />
        ))}
        {currentLine.length > 0 && <DrawingLine points={currentLine} />}
      </Canvas>
      <button
        onClick={handleClearCanvas}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#fff",
          border: "1px solid #000",
          cursor: "pointer",
        }}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default ThreeDCanvas;