export class Registro {
	public format: string;
	public text: string;
	public type: string;
	public icom: string;
	public created: Date;

	constructor(format: string, text: string) {
		this.format = format;
		this.text = text;
		this.created = new Date();
		this.determinarTipo();
	}

	private determinarTipo() {
		const inicoTexto = this.text.substring(0, 4);
		console.log(inicoTexto);

		switch (inicoTexto) {
			case 'http':
				this.type = 'http';
				this.icom = 'globe';
				break;

			case 'geo:':
				this.type = 'geo';
				this.icom = 'map-outline';
				break;
			default:
				this.type = 'undefined';
				this.icom = 'create';
		}
	}
}
