


class Troceador {

	#payload;
	#puntero;

	constructor(payload) {
		this.#payload = payload;
		this.#puntero = 0;
	}

	trozo(cantidad) {
		let resultado = this.#payload.substr(this.#puntero, cantidad)
		this.#puntero += cantidad;
		return resultado;
	}

	avanza(cantidad) {
		this.#puntero += cantidad;
	}


}

export default Troceador;