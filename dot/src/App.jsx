import { useState } from "react";
import "./App.css";

function App() {
  const [dot, setDot] = useState([]);
  const [redo, setRedo] = useState([]);

  const handleDot = (event) => {
    const dot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setDot((list) => [...list, dot]);
  };

  const handleUndo = (event) => {
    event.stopPropagation();

    const recoveryDot = dot[dot.length - 1];

    setRedo((list) => [...list, recoveryDot]);

    setDot((list) => {
      const newArray = [...list].slice(0, -1);
      return newArray;
    });
  };

  const handleRedo = (event) => {
    event.stopPropagation();

    if (redo.length === 0) {
      return;
    }

    const recoveredDot = redo[redo.length - 1];

    setRedo((list) => {
      const newArray = [...list].slice(0, -1);
      return newArray;
    });
    setDot((list) => [...list, recoveredDot]);
  };

  return (
    <div className="page" onClick={handleDot}>
      <button className="undo" onClick={handleUndo}>
        Undo
      </button>
      <button className="redo" onClick={handleRedo}>
        Redo
      </button>
      {dot.map((item, index) => (
        <span
          key={index}
          className="dot"
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}
    </div>
  );
}

export default App;
