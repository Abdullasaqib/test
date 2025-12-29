import { useEffect, useRef } from "react";

interface NeuralBackgroundProps {
  nodeCount?: number;
  className?: string;
}

export const NeuralBackground = ({ nodeCount = 50, className = "" }: NeuralBackgroundProps) => {
  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const svg = canvasRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Generate random nodes
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 2,
      color: ["hsl(220, 80%, 50%)", "hsl(262, 83%, 58%)", "hsl(189, 94%, 50%)"][Math.floor(Math.random() * 3)],
    }));

    let animationId: number;

    const animate = () => {
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Clear and redraw
      while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
      }

      // Draw connections
      const connectionThreshold = 150;
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionThreshold) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", node.x.toString());
            line.setAttribute("y1", node.y.toString());
            line.setAttribute("x2", otherNode.x.toString());
            line.setAttribute("y2", otherNode.y.toString());
            line.setAttribute("stroke", "hsl(220, 80%, 50%)");
            line.setAttribute("stroke-width", "1");
            line.setAttribute("opacity", (1 - distance / connectionThreshold).toString());
            svg.appendChild(line);
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", node.x.toString());
        circle.setAttribute("cy", node.y.toString());
        circle.setAttribute("r", node.radius.toString());
        circle.setAttribute("fill", node.color);
        circle.setAttribute("opacity", "0.6");
        svg.appendChild(circle);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [nodeCount]);

  return (
    <svg
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.08 }}
    />
  );
};
