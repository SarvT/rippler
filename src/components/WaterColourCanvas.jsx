import React, { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import fabric from "fabric";
    
const WaterColorCanvas = () => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
    });

    // Configure brush for watercolor effect
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushSize;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: 10,
      offsetX: 0,
      offsetY: 0,
      color: brushColor,
    });

    // Update brush settings when color or size changes
    const updateBrush = () => {
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushSize;
    };

    updateBrush();

    return () => {
      canvas.dispose();
    };
  }, [brushColor, brushSize]);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Watercolor Painting App</h1>
      <div style={{ marginBottom: "20px" }}>
        <SketchPicker
          color={brushColor}
          onChangeComplete={(color) => setBrushColor(color.hex)}
        />
        <div style={{ marginTop: "10px" }}>
          <label>Brush Size: </label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
        </div>
      </div>
      <canvas ref={canvasRef} style={{ border: "1px solid #000" }} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
      </div>
    </div>
  );
};

export default WaterColorCanvas;
