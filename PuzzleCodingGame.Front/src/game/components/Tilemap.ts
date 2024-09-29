import * as BABYLON from "babylonjs";

import { IPrefab, createPrefabAsync } from "../../engine/Prefab";
import { Component } from "../../engine/Component";

export interface ITileSet {
  [key: string]: ITileDefinition;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface ITileDefinition {
  prefab: IPrefab;
  walkable: boolean;
}

export class Tile extends Component<BABYLON.TransformNode> {
  public x = 0;
  public y = 0;

  constructor(node: BABYLON.TransformNode) {
    super(node, true);
  }
}

export type ITileMapData = string[][];
export interface ITilemap {
  data: ITileMapData;
  tileset: ITileSet;
}

export class Tilemap extends Component<BABYLON.TransformNode> {
  private tileData: ITileMapData | undefined;
  private tileSet: ITileSet | undefined;
  public size = 1;
  public gap = -0.01;
  public async create(
    tileData: string[][],
    tileSet: ITileSet
  ): Promise<Tilemap> {
    this.tileData = tileData;
    this.tileSet = tileSet;
    const promises: Promise<void>[] = [];

    for (let y = 0; y < tileData.length; y++) {
      for (let x = 0; x < tileData[y].length; x++) {
        const tileKey = tileData[y][x] ?? "x";
        const tileDef = tileSet[tileKey];
        if (tileDef) {
          promises.push(
            createPrefabAsync(this.node, tileDef.prefab).then((node) => {
              if (node) {
                node.position.x = x * (this.size + this.gap);
                node.position.z =
                  (tileData.length - 1 - y) * (this.size + this.gap);
                const tile = new Tile(node);
                if (tile) {
                  tile.x = x;
                  tile.y = y;
                }
              }
            })
          );
        }
      }
    }

    await Promise.all(promises);

    return this;
  }

  public findPath(start: IPosition, end: IPosition): IPosition[] | null {
    if (!this.tileData || !this.tileSet) return null;
    const directions: IPosition[] = [
      { x: -1, y: 0 }, // Left
      { x: 0, y: -1 }, // Down
      { x: 1, y: 0 }, // Right
      { x: 0, y: 1 }, // Up
    ];

    const queue: IPosition[] = [start];
    const visited: boolean[][] = new Array(this.tileData.length)
      .fill(false)
      .map(() =>
        new Array(this.tileData ? this.tileData[0].length : 0).fill(false)
      );

    const getParent: { [key: string]: IPosition } = {};

    while (queue.length > 0) {
      const current = queue.shift() as IPosition;

      if (current.x === end.x && current.y === end.y) {
        const path: IPosition[] = [];
        let currentPos = end;
        while (!(currentPos.x === start.x && currentPos.y === start.y)) {
          path.unshift({
            x: currentPos.x,
            y: currentPos.y,
          });
          currentPos = getParent[currentPos.x + "," + currentPos.y];
        }
        path.unshift({ x: start.x, y: start.y });
        return path;
      }

      for (const direction of directions) {
        const nextX = current.x + direction.x;
        const nextY = current.y + direction.y;

        if (
          nextX >= 0 &&
          nextX < this.tileData.length &&
          nextY >= 0 &&
          nextY < this.tileData[0].length
        ) {
          const tileKey = this.tileData[nextY][nextX];
          const tileDef = this.tileSet[tileKey];

          if (tileDef && tileDef.walkable && !visited[nextX][nextY]) {
            visited[nextX][nextY] = true;
            getParent[nextX + "," + nextY] = current;
            queue.push({ x: nextX, y: nextY });
          }
        }
      }
    }

    return null;
  }
}

export class TilemapEntity extends Component<BABYLON.TransformNode> {
  public tilemap?: Tilemap;
  public tilemapPosition?: { x: number; y: number };

  constructor(node: BABYLON.TransformNode) {
    super(node, true);
  }
}
