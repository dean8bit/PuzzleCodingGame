import { IGameTilemap } from "./components/GameTilemap";
import { tileSet } from "./Tilesets";

export const tilemapDev: IGameTilemap = {
  data: [
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", " ", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", " ", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", " ", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", " ", "x", "x", "x", "x", "x", "x", " ", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", " ", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", " ", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", " ", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
    ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
  ],
  tileset: tileSet,
  startXY: [0, 0],
};
