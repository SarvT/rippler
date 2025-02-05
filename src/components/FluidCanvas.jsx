import React, { useRef, useEffect, useState } from 'react';
// import { Motion, spring } from 'react-motion';

const FluidCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3498db');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Fluid motion and fade out
        const newParticles = [...particles];
        newParticles[index] = {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          radius: Math.max(0, p.radius * 0.98),
          opacity: Math.max(0, p.opacity * 0.95),
          vy: p.vy + 0.1,
          vx: p.vx * 0.99
        };

        setParticles(newParticles.filter(p => p.opacity > 0.01));
      });
      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }, [particles, color]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array(20).fill().map(() => ({
      x, 
      y, 
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      radius: Math.random() * 10 + 5,
      opacity: 1
    }));

    setParticles(prev => [...prev, ...newParticles]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array(10).fill().map(() => ({
      x, 
      y, 
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      radius: Math.random() * 8 + 3,
      opacity: 1
    }));

    setParticles(prev => [...prev, ...newParticles]);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
        className="absolute inset-0"
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        {['#3498db', '#2ecc71', '#e74c3c', '#f39c12'].map(colorOption => (
          <button 
            key={colorOption}
            onClick={() => setColor(colorOption)}
            className={`w-10 h-10 rounded-full ${color === colorOption ? 'ring-4 ring-white' : ''}`}
            style={{ backgroundColor: colorOption }}
          />
        ))}
      </div>
    </div>
  );
};

export default FluidCanvas;