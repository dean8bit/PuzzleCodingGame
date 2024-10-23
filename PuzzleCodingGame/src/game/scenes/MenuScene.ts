/* eslint-disable @typescript-eslint/no-empty-function */
import "phaser";
export class MenuScene extends Phaser.Scene {
	constructor() {
		super("MenuScene");
	}

	public init(): void {}
	public preload(): void {}
	public create(): void {
		this.scene.start("GameScene");
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(time: number, delta: number): void {}
}
