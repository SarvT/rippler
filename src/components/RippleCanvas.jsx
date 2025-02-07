import React, { useRef, useEffect, useState } from 'react';

const RippleCanvas = () => {
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const updatedRipples = ripples.map(ripple => ({
        ...ripple,
        radius: ripple.radius + 3,
        opacity: Math.max(0, ripple.opacity - 0.02)
      })).filter(ripple => ripple.opacity > 0);

      updatedRipples.forEach(ripple => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52, 152, 219, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      setRipples(updatedRipples);
      requestAnimationFrame(drawRipples);
    };

    drawRipples();
  }, [ripples]);

  const createRipple = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples(prev => [...prev, {
      x, 
      y, 
      radius: 10,
      opacity: 1
    }]);
  };

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      <canvas 
        ref={canvasRef}
        onClick={createRipple}
        onMouseMove={createRipple}
        className="absolute inset-0"
      />
    </div>
  );
};

export default RippleCanvas;