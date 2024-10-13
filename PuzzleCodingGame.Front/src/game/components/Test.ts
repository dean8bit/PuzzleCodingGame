import Component from "../Component";

export default class Test extends Component {
	public onStart(): void {}

	public onUpdate(): void {
		console.log("update");
	}
}
