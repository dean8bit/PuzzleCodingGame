/* eslint-disable @typescript-eslint/no-empty-function */
import * as BABYLON from "babylonjs";
import { Component } from "../../engine/Component";
import { GameTilemapEntity } from "./GameTilemap";
import { TilemapEntity } from "./Tilemap";

export interface IGuyPlugin {
  run(guy: Guy): void;
}

export class Guy extends GameTilemapEntity {
  public plugins: IGuyPlugin[] = [];

  public rotation = 0;

  public static setGuy?: (guy: Guy) => void;

  public onStart(): void {
    if (Guy.setGuy) Guy.setGuy(this);
    this.plugins.push(new MoveFowardPlugin(0));
    this.plugins.push(new PositionPlugin(1, 2));
    this.plugins.push(new RotatePlugin(3));
  }
  public step(): boolean {
    const r = this.cpu.step();
    this.plugins.forEach((p) => p.run(this));
    this.updateRotation();
    return r.success;
  }
  public onUpdate(): void {}
  public onDestroy(): void {}

  public updateRotation() {
    const rotations = [0, 90, 180, 270];
    if (rotations[this.rotation])
      this.node.rotation.y = BABYLON.Tools.ToRadians(rotations[this.rotation]);
  }
}

export class MoveFowardPlugin implements IGuyPlugin {
  public inputLocation: number;

  constructor(inputLocation: number) {
    this.inputLocation = inputLocation;
  }
  public run(guy: Guy): void {
    //const move = guy.cpu.memory.getAt(this.inputLocation);
    const move = false;
    if (!move) return;

    const tilemapEntity = Component.getComponents(
      guy.node,
      GameTilemapEntity
    ).pop();
    if (tilemapEntity) {
      tilemapEntity.moveTowards(
        Math.round(tilemapEntity.node.forward.x),
        Math.round(tilemapEntity.node.forward.z)
      );
    }
  }
}

export class RotatePlugin implements IGuyPlugin {
  public inputLocation: number;
  constructor(inputLocation: number) {
    this.inputLocation = inputLocation;
  }
  public run(guy: Guy): void {
    const rotation = guy.cpu.memory.getAt(this.inputLocation);
    if (!rotation) return;
    guy.rotation = rotation;
  }
}

export class PositionPlugin implements IGuyPlugin {
  public outputXLocation: number;
  public outputYLocation: number;
  constructor(outputXLocation: number, outputYLocation: number) {
    this.outputXLocation = outputXLocation;
    this.outputYLocation = outputYLocation;
  }
  public run(guy: Guy): void {
    const tilemapEntity = Component.getComponents(
      guy.node,
      TilemapEntity
    ).pop();
    if (tilemapEntity && tilemapEntity.tilemapPosition) {
      guy.cpu.memory.setAt(
        this.outputXLocation,
        tilemapEntity.tilemapPosition.x
      );
      guy.cpu.memory.setAt(
        this.outputYLocation,
        tilemapEntity.tilemapPosition.y
      );
    }
  }
}

export class DectectorPlugin implements IGuyPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_guy: Guy): void {
    throw new Error("Method not implemented.");
  }
}
