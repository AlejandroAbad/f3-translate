import FSMTransmision from "./FSMTransmisionV2";
import parsearTrama from "./tramas/FactoriaTramas";



class TransmisionV2 {

	#version;
	#autenticacion;
	#pedidos = [];
	#errorTransmision = false;

	constructor(payload) {

		this.#version = parseInt(payload.substr(2, 2), 10)
		let tramas = payload.split("..").map(e => {
			return parsearTrama(this.#version, e)
		}).filter(e => Boolean(e));

		const automata = new FSMTransmision();
		automata.analizar(tramas);

		if (automata.error) {
			this.#errorTransmision = automata.error;
			return;
		}

		this.#autenticacion = automata.autenticacion;
		this.#pedidos = automata.pedidos;

	}

	generarSolicitudToken() {
		return this.#autenticacion.aFedicom3()
	}

	generarPedidosFedicom() {
		return this.#pedidos.map(tramaPedido => {
			let pedido = tramaPedido.cabecera.aFedicom3();
			if (tramaPedido.informacion?.crc) pedido.numeroPedidoOrigen = tramaPedido.informacion.crc;
			pedido.lineas = tramaPedido.lineas.map((tramaLinea, orden) => tramaLinea.aFedicom3(orden + 1))
			return pedido;
		})
	}



}

export default TransmisionV2;