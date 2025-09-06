import { useState, useEffect } from "react";


export default function AddNewToDoButton({ children, handleClick }) {
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });
  const [radius, setRadius] = useState(400);
    const [hovered, setHovered] = useState(false);
    const [spinning, setSpinning] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    };
    
    const handleHover = () => {
        if (!spinning) {
            setSpinning(true);
            setTimeout(() => {
                setSpinning(false);
            }, 700)
        }
    }

  useEffect(() => {
    let animation;
    if (hovered) {
      animation = setInterval(() => {
        setRadius((r) => Math.min(r + 10, 1400)); // cap size
      }, 30);
    } else {

      animation = setInterval(() => {
        setRadius((r) => Math.max(r - 30, 200)); // reset size
      }, 30);
    }
    return () => clearInterval(animation);
  }, [hovered]);

  const mask = `radial-gradient(circle ${radius}px at ${coords.x}px ${coords.y}px, rgba(0,0,0,1), rgba(0,0,0,0))`;

  return (
    <button
      className="addNewToDo"
      onMouseMove={handleMouseMove}
          onMouseEnter={() => {
              setHovered(true); 
              handleHover()
          }}
      onMouseLeave={() => setHovered(false)}
          style={{ "--mask": mask }}
          onClick={handleClick}
    >
      <span className={spinning ? "spin-once" : ""}>{children}</span>
    </button>
  );
}
