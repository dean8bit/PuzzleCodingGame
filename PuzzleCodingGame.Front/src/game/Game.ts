import { Game } from "../engine/Game";
import { MyGameManager } from "./components/GameManager";

export const createGame = (canvas: HTMLCanvasElement): Game => {
  return new Game(canvas, MyGameManager);
};