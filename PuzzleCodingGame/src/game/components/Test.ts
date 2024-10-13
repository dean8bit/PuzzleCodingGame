import Component from "../Component";
import bootsharp, { EsoCPU } from "../../../../EsoCPU.Wasm/bin/bootsharp";

export default class Test extends Component {
  public onStart(): void {
    EsoCPU.Wasm.Program.getFrontendName = () => "Browser";
    bootsharp.boot().then(() => {
      console.log(`Hello ${EsoCPU.Wasm.Program.getBackendName()}!`);
    });
  }

  public onUpdate(): void {
    console.log("update");
  }
}
