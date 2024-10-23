import "./menu.css";

import React, { useState } from "react";
import { useGameContext } from "../app";

const Menu: React.FC = () => {
	const { game } = useGameContext();
	const [ready, setReady] = useState(false);

	game?.events.on("ready", () => setReady(true));

	return (
		<div className="bit-container menu">
			<div>Menu {game?.scene.getScene("GameScene")?.scene.key}</div>
		</div>
	);
};

export default Menu;
