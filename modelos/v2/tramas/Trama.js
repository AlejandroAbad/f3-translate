

class Trama {

	#version;
	#tipo;

	constructor(version, tipo) {
		this.#version = version;
		this.#tipo = tipo;
	}

	get tipo() {
		return this.#tipo;
	}

	get version() {
		return this.#version;
	}

}

export default Trama;