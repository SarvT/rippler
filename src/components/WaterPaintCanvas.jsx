import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function WaterPaintCanvas() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const waterEffect = useRef([]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: "#e3f2fd",
    });

    canvas.freeDrawingBrush.color = "rgba(30,144,255,0.5)";
    canvas.freeDrawingBrush.width = 20;

    canvas.on("mouse:down", () => {
      isDrawing.current = true;
    });
    
    canvas.on("mouse:up", () => {
      isDrawing.current = false;
      applyWaterEffect(canvas);
    });

    return () => canvas.dispose();
  }, []);

  const applyWaterEffect = (canvas) => {
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      fabric.util.animate({
        startValue: 1,
        endValue: 0.7,
        duration: 800,
        onChange: (value) => {
          obj.set({ opacity: value });
          canvas.renderAll();
        },
        onComplete: () => {
          fabric.util.animate({
            startValue: 0.7,
            endValue: 1,
            duration: 800,
            onChange: (value) => {
              obj.set({ opacity: value });
              canvas.renderAll();
            },
          });
        },
      });
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <Card className="w-full max-w-3xl mx-auto p-4 shadow-lg rounded-2xl">
        <CardContent>
          <canvas ref={canvasRef} width={800} height={500} className="border rounded-xl shadow-md" />
          <div className="flex justify-between mt-4">
            <Button onClick={() => (canvasRef.current.fabric.clear())}>Clear</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
