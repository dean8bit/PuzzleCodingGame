import { Component } from "../../engine/Component";
import { MyGameManager } from "../../game/components/GameManager";
import { useGameContext } from "../app/App";
import "./ui.css";

import React from "react";

export const Ui: React.FC = () => {
  const { game } = useGameContext();
  return (
    <div className="ui">
      {game ? (
        <div className="bit-container menu">
          <div
            className="bit-button"
            onClick={() => {
              if (game) {
                const node = game.activeScene.getNodeByName(
                  "default_gamemanager"
                );
                if (node)
                  Component.getComponents(node, MyGameManager)
                    .pop()
                    ?.toggleRotation();
              }
            }}
          >
            Click To Toggle Rotation
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
