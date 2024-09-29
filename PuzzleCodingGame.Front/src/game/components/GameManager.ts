/* eslint-disable @typescript-eslint/no-empty-function */
import * as BABYLON from "babylonjs";
import { GameManager as BaseGameManager } from "../../engine/GameManager";
import { createPrefabAsync } from "../../engine/Prefab";
import { tilemapDev } from "../Tilemaps";
import { CameraWobble } from "./CameraWobble";
import { GameTilemap, GameTilemapEntity, IGameTilemap } from "./GameTilemap";
import { Guy } from "./Guy";
import { Component } from "../../engine/Component";
import { prefabs } from "../Prefabs";
import bootsharp, {
  PuzzleCodingGame,
} from "../../../../PuzzleCodingGame.Wasm/bin/bootsharp";

export class GameManager extends BaseGameManager {
  public guy?: Guy;
  public tilemap?: GameTilemap;

  public onStart(): void {
    PuzzleCodingGame.Wasm.Program.getFrontendName = () => "Browser";
    bootsharp.boot().then(() => {
      console.log(`Hello ${PuzzleCodingGame.Wasm.Program.getBackendName()}!`);
    });
    this.createCamera();
    this.loadMap(tilemapDev);
  }

  private createCamera() {
    this.game.activeScene.clearColor = BABYLON.Color4.FromHexString("#403353");
    const cam = this.game.activeScene.getCameraByName("default_camera");
    if (cam && cam instanceof BABYLON.FreeCamera) {
      new CameraWobble(cam);
      cam.position = new BABYLON.Vector3(2, 15, -10);
      cam.rotation.x = 0.75;
    }
  }

  public async loadMap(tilemap: IGameTilemap) {
    this.unloadMap();
    await this.createTileMap(tilemap);
    await this.createGuy(tilemap.startXY);
  }

  private async createTileMap(tilemap: IGameTilemap) {
    const tilemapNode = new BABYLON.TransformNode("tilemap");
    this.tilemap = new GameTilemap(tilemapNode, true);
    if (!this.tilemap) return;
    await this.tilemap
      .create(tilemap.data, tilemap.tileset)
      .then((t) => (this.tilemap = t));
  }

  private async createGuy(startXY: [number, number]) {
    if (!this.tilemap) return;
    await createPrefabAsync(this.tilemap.node, prefabs.guy).then((g) => {
      if (g) {
        this.guy = Component.getComponents(g, Guy).pop();
        if (this.guy) {
          const tilemapEntity = Component.getComponents(
            this.guy.node,
            GameTilemapEntity
          ).pop();
          if (tilemapEntity) {
            tilemapEntity.tilemap = this.tilemap;
            tilemapEntity.moveTowards(startXY[0], startXY[1]);
          }
        }
      }
    });
  }

  public unloadMap() {
    this.tilemap?.node.dispose();
  }

  public onUpdate(): void {}
  public onDestroy(): void {}
}
