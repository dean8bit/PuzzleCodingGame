import "./controls.css";

import React from "react";

import { Guy } from "../../../../game/components/Guy";

interface ControlsProps {
  guy: Guy;
  setStatus: (status: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({ guy, setStatus }) => {
  return (
    <div className="container controls">
      <div
        className="button"
        onClick={() => {
          const r = guy.step();
          setStatus(r.toString() + " - " + guy.cpu.pointer);
        }}
      >
        Step
      </div>
      <div className="button">Pause</div>
      <div className="button">Reset</div>
    </div>
  );
};
