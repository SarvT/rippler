import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MagneticLines = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const numLines = 10; // Number of vertical lines
  const spacing = 40; // Spacing between lines
  const magnetRadius = 100; // Magnetic effect range

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden">
        {Array.from({ length: numLines }).map((_, index) => {
          const xPos = index * spacing + window.innerWidth / 4;
          const distance = Math.abs(mousePos.x - xPos);
          const offset = Math.max(0, magnetRadius - distance) / 3; // Magnetic effect

          return (
            <motion.div
              key={index}
              className="absolute w-[2px] h-20 bg-white"
              animate={{ x: mousePos.x > xPos ? offset : -offset }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ left: `${xPos}px` }}
            ></motion.div>
          );
        })}
      </div>
    </>
  );
};

export default MagneticLines;
