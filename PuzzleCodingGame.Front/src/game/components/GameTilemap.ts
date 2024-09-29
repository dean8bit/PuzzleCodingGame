import { Component } from "../../engine/Component";
import { ITilemap, Tile, Tilemap, TilemapEntity } from "./Tilemap";

export interface IGameTilemap extends ITilemap {
  startXY: [number, number];
}

export class GameTilemap extends Tilemap {}

export class GameTilemapEntity extends TilemapEntity {
  public moveTowards(x: number, y: number) {
    let tile: Tile | undefined;
    console.log("movetowards ", x, y);
    if (!this.tilemapPosition) {
      this.tilemapPosition = { x, y };
    }

    if (this.tilemap)
      tile = Component.getComponentsInChildren(this.tilemap?.node, Tile)
        .filter(
          (t) =>
            this.tilemapPosition &&
            t.x === this.tilemapPosition.x + x &&
            t.y === this.tilemapPosition.y + y
        )
        .pop();

    if (tile) {
      this.node.position.x = tile.x;
      this.node.position.z = tile.y;
      this.tilemapPosition = { x: tile.x, y: tile.y };
    }
  }
}
