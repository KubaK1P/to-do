import { useState } from "react";

export default function AddNewToDoButton({ children, handleClick }) {
  const [mask, setMask] = useState("");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // radial gradient mask centered on mouse
    setMask(
      `radial-gradient(circle 700px at ${x}px ${y}px, rgba(0,0,0,1), rgba(0,0,0,0))`
    );
  };

  return (
    <button
      className="addNewToDo"
      onMouseMove={handleMouseMove}
          style={{ "--mask": mask }}
          onClick={handleClick}
    >
      {children}
    </button>
  );
}
