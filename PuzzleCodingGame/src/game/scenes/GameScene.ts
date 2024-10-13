/* eslint-disable @typescript-eslint/no-empty-function */
import "phaser";
import Test from "../components/Test";

export class GameScene extends Phaser.Scene {
	public test?: Test;
	constructor() {
		super("GameScene");
	}

	public init(): void {}
	public preload(): void {}
	public create(): void {
		const testSprite = new Phaser.GameObjects.Sprite(
			this,
			this.renderer.width / 2,
			this.renderer.height / 2,
			"logo"
		);
		this.add.existing(testSprite);
		new Test(testSprite, "TestSprite");
		this.test = new Test(testSprite, "Test");
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(time: number, delta: number): void {}
}
