import { prefabs } from "./Prefabs";
import { ITileSet } from "./components/Tilemap";

export const tileSet: ITileSet = {
  x: { prefab: prefabs.tileFloor, walkable: true },
  " ": { prefab: prefabs.tileEmpty, walkable: false },
};
