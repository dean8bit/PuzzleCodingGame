import { Guy } from "../../../game/components/Guy";
import "./coder.css";

import { useState } from "react";
import { Controls } from "./controls/Controls";
import { Instructions } from "./instructions/Instructions";
import { Memory } from "./memory/Memory";
import { Status } from "./status/Status";

export const Coder = () => {
  const [guy, setGuy] = useState<Guy>();
  Guy.setGuy = setGuy;
  const [status, setStatus] = useState("OK");

  return guy ? (
    <div className="coder">
      <Memory guy={guy} />
      <Instructions guy={guy} />
      <Status status={status} />
      <Controls guy={guy} setStatus={setStatus} />
    </div>
  ) : (
    <div>No Interpeter</div>
  );
};
