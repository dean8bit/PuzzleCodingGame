import * as BABYLON from "babylonjs";
import { IPrefab } from "../engine/Prefab";
import { Guy } from "./components/Guy";
import { TilemapEntity } from "./components/Tilemap";
import { models } from "./Models";

export const tileEmpty: IPrefab = {
  name: "empty",
  position: new BABYLON.Vector3(0, 0, 0),
};

export const tileFloor: IPrefab = {
  name: "floor",
  position: new BABYLON.Vector3(0, 0, 0),
  children: [
    {
      name: "floor",
      model: models.block,
      position: new BABYLON.Vector3(0, -1, 0),
    },
  ],
};

export const guy: IPrefab = {
  name: "guy",
  model: models.guy,
  postBuild: (n) => new Guy(n) && new TilemapEntity(n),
};

export const prefabs = {
  tileEmpty,
  tileFloor,
  guy,
};
