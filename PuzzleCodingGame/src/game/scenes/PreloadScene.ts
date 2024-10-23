/* eslint-disable @typescript-eslint/no-empty-function */
import "phaser";

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super("PreloadScene");
	}
	public init(): void {}
	public preload(): void {
		this.load.image("logo", "assets/test.png");
		this.load.on(Phaser.Loader.Events.COMPLETE, () =>
			this.scene.start("MenuScene")
		);
	}
	public create(): void {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public update(time: number, delta: number): void {}
}
