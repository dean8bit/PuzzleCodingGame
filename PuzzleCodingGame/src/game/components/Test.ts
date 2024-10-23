import Component from "../Component";
import bootsharp, { EsoCPU } from "../../../../EsoCPU.Wasm/bin/bootsharp";

export default class Test extends Component {
  public onStart(): void {
    EsoCPU.Wasm.Program.getFrontendName = () => "Browser";
    bootsharp.boot().then(() => {
      console.log(`Hello ${EsoCPU.Wasm.Program.getBackendName()}!`);
      EsoCPU.Wasm.Program.createCPU();
      EsoCPU.Wasm.Program.setMemory(16, 1234);
      const val = EsoCPU.Wasm.Program.getMemory(16);
      console.log(val);
    });
  }

  public onUpdate(): void {
    console.log("update");
  }
}
