import { useState } from "react"; // put your CSS here

export default function AddNewToDoButton({ children, handleClick }) {
  const [mask, setMask] = useState("");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  


    setMask(`radial-gradient(circle 600px at ${x}px ${y}px, rgba(0,0,0,1), rgba(0,0,0,0))`);
  };

  return (
    <button
      className="addNewToDo"
      onMouseMove={handleMouseMove}
      style={{
        WebkitMaskImage: mask,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskImage: mask, 
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
          }}
        onClick={handleClick}  
    >
      {children}
    </button>
  );
}
