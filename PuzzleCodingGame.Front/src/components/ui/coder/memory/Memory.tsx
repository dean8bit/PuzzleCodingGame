import "./memory.css";

import React from "react";

import { Guy } from "../../../../game/components/Guy";

interface MemoryProps {
  guy: Guy;
}

export const Memory: React.FC<MemoryProps> = ({ guy }) => {
  return (
    <div className="container memory">
      <div className="goolayer" />
      <div className="memory-inner">
        {guy.cpu.memory.getAllMemory().map((v, i) => (
          <div key={i} className="textbox memory-value">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
};
