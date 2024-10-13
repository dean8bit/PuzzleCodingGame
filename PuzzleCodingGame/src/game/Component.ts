export default class Component {
	public readonly gameObject: Phaser.GameObjects.GameObject;
	private readonly componentReference: string;
	constructor(
		gameobject: Phaser.GameObjects.GameObject,
		componentReference: string
	) {
		this.gameObject = gameobject;
		this.componentReference = componentReference;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.gameObject as any)[this.componentReference] = this;
		this.gameObject.scene.events.once(
			Phaser.Scenes.Events.UPDATE,
			this.tryOnStart,
			this
		);
		this.gameObject.scene.events.on(
			Phaser.Scenes.Events.UPDATE,
			this.tryOnUpdate,
			this
		);
		this.gameObject.on(
			Phaser.GameObjects.Events.DESTROY,
			this.tryOnDestroy,
			this
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public onStart(): void {}

	private tryOnStart(): void {
		this.tryCall(this.onStart);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public onUpdate(): void {}

	private tryOnUpdate(): void {
		this.tryCall(this.onUpdate);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public onDestroy(): void {}

	private tryOnDestroy(): void {
		this.gameObject.scene.events.off(
			Phaser.Scenes.Events.UPDATE,
			this.tryOnStart,
			this
		);
		this.gameObject.scene.events.off(
			Phaser.Scenes.Events.UPDATE,
			this.tryOnUpdate,
			this
		);
		this.gameObject.off(
			Phaser.GameObjects.Events.DESTROY,
			this.tryOnDestroy,
			this
		);
		this.tryCall(this.onDestroy);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (this.gameObject as any)[this.componentReference];
	}

	public destroy(): void {
		this.tryOnDestroy();
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private tryCall(f: () => void) {
		try {
			f.bind(this)();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.log(
				"(" +
					this.gameObject.name +
					":" +
					this.componentReference +
					") Error: " +
					e.stack
			);
		}
	}
}
