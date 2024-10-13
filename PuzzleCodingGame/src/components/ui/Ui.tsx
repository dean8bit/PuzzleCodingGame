import { Coder } from "./coder/Coder";
import { Debug } from "./debug/Debug";
import "./ui.css";

import React from "react";

export const Ui: React.FC = () => {
  return (
    <div className="ui">
      <Debug />
      <Coder />
    </div>
  );
};
