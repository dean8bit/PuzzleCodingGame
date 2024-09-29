/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from "../../engine/Component";
import * as BABYLON from "babylonjs";

export class CameraWobble extends Component<BABYLON.FreeCamera> {
  public amplitudeX = 0.02;
  public frequencyX = 0.0021;
  public amplitudeY = 0.05;
  public frequencyY = 0.001;
  private initialX = 0;
  private initialY = 0;
  private time = 0;

  constructor(node: BABYLON.FreeCamera) {
    super(node, true);
  }

  public onStart(): void {
    this.initialX = this.node.position.x;
    this.initialY = this.node.position.y;
  }
  public onUpdate(): void {
    this.time += this.node.getScene().getEngine().getDeltaTime();
    const deltaX = this.amplitudeX * Math.sin(this.frequencyX * this.time);
    const deltaY = this.amplitudeY * Math.sin(this.frequencyY * this.time);

    this.node.position.x = this.initialX + deltaX;
    this.node.position.y = this.initialY + deltaY;
  }
  public onDestroy(): void {}
}
