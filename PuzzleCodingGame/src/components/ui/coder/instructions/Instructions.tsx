import "./instructions.css";

import React, { useEffect, useState } from "react";

import { Guy } from "../../../../game/components/Guy";

interface InstructionsProps {
  guy: Guy;
}

export const Instructions: React.FC<InstructionsProps> = ({ guy }) => {
  const [hasError, setHasError] = useState(false);

  const initCode = "-- Code here";

  useEffect(() => {
    guy.cpu.parse(initCode.split("\n"));
  }, [guy.cpu]);

  return (
    <div className="container instructions">
      <textarea
        spellCheck="false"
        className={`textbox textarea ${hasError ? "error" : ""}`}
        defaultValue={initCode}
        onChange={(e) => {
          console.log(e.target.value.split("\n"));
          const r = guy.cpu.parse(e.target.value.split("\n"));
          console.log(r.comment);
          setHasError(!r.success);
        }}
      ></textarea>
    </div>
  );
};
