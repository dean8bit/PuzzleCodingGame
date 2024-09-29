/* eslint-disable @typescript-eslint/no-empty-function */
import * as BABYLON from "babylonjs";
import { Component } from "../../engine/Component";
import { Game } from "../../engine/Game";
import { Rotate } from "./Rotate";
import { createPrefabAsync } from "../../engine/Prefab";
import { GameManager } from "../../engine/GameManager";
import { prefabs } from "../Prefabs";
import bootsharp, {
  PuzzleCodingGame,
} from "../../../../PuzzleCodingGame.Wasm/bin/bootsharp";

export class MyGameManager extends GameManager {
  public game: Game;
  public cube?: BABYLON.TransformNode;

  constructor(game: Game, node: BABYLON.TransformNode) {
    super(game, node);
    this.game = game;
    PuzzleCodingGame.Wasm.Program.getFrontendName = () => "Browser";
    bootsharp.boot().then(() => {
      console.log(`Hello ${PuzzleCodingGame.Wasm.Program.getBackendName()}!`);
    });
  }

  public toggleRotation(): void {
    if (this.cube) {
      Component.getComponentsInChildren(this.cube, Rotate).forEach((r) =>
        r.toggle()
      );
    }
  }

  public onStart(): void {
    createPrefabAsync(this.node, prefabs.cube).then((n) => (this.cube = n));
  }
  public onUpdate(): void {}
  public onDestroy(): void {}
}
