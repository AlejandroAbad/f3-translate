import { TipoTrama } from "./tramas/FactoriaTramas";


const ESTADOS = {
	INICIAL: 'INICIAL',
	ESPERA_INFORMACION: 'ESPERA_INFORMACION',
	ESPERA_CABECERA: 'ESPERA_CABECERA',
	LEYENDO_PEDIDO: 'LEYENDO_PEDIDO'
}

/**
 * Máquina de estados finita determinista para interpretar transmisiones.
 */
class FSMTransmisionV2 {

	#estado = ESTADOS.INICIAL;
	#transiciones = [
		{ de: ESTADOS.INICIAL, a: ESTADOS.ESPERA_INFORMACION, evento: TipoTrama.SESION_INICIO, accion: 'autenticacion' },
		{ de: ESTADOS.INICIAL, a: ESTADOS.ESPERA_INFORMACION, evento: TipoTrama.SESION_INICIO_V1, accion: 'autenticacion' },
		{ de: ESTADOS.ESPERA_INFORMACION, a: ESTADOS.ESPERA_CABECERA, evento: TipoTrama.CABECERA_INFORMACION, accion: 'informacion' },
		{ de: ESTADOS.ESPERA_INFORMACION, a: ESTADOS.LEYENDO_PEDIDO, evento: TipoTrama.PEDIDO_CABECERA, accion: 'cabecera' }, // Esta transicion hace que la trama de informacion sea opcional
		{ de: ESTADOS.ESPERA_CABECERA, a: ESTADOS.LEYENDO_PEDIDO, evento: TipoTrama.PEDIDO_CABECERA, accion: 'cabecera' },
		{ de: ESTADOS.LEYENDO_PEDIDO, a: ESTADOS.LEYENDO_PEDIDO, evento: TipoTrama.PEDIDO_LINEA, accion: 'linea' },
		{ de: ESTADOS.LEYENDO_PEDIDO, a: ESTADOS.LEYENDO_PEDIDO, evento: TipoTrama.PEDIDO_LINEA_BONIFICACION, accion: 'linea' },
		{ de: ESTADOS.LEYENDO_PEDIDO, a: ESTADOS.LEYENDO_PEDIDO, evento: TipoTrama.PEDIDO_LINEA_ESTUPEFACIENTE, accion: 'linea' },
		{ de: ESTADOS.LEYENDO_PEDIDO, a: ESTADOS.ESPERA_CABECERA, evento: TipoTrama.PEDIDO_TOTALES, accion: 'cierraPedido' },
		{ de: ESTADOS.ESPERA_CABECERA, a: ESTADOS.FINAL, evento: TipoTrama.SESION_FIN, accion: 'finTransmision' },
	]

	#pedidoActual = null;
	autenticacion = null;
	pedidos = [];
	error = false;



	#tramaAutenticacion(trama) {
		this.autenticacion = trama;
	}
	#tramaInformacion(trama) {
		this.#pedidoActual = {
			informacion: trama,
			cabecera: null,
			lineas: []
		}
	}
	#tramaCabecera(trama) {
		if (!this.#pedidoActual) {
			this.#pedidoActual = { informacion: null, cabecera: null, lineas: [] }
		}
		this.#pedidoActual.cabecera = trama
	}
	#tramaLinea(trama) {
		this.#pedidoActual.lineas.push(trama)
	}
	#cierraPedido(trama) {
		this.pedidos.push(this.#pedidoActual);
		this.#pedidoActual = null;
	}
	#ejecutarAccion(accion, trama) {
		switch (accion) {
			case 'autenticacion':
				return this.#tramaAutenticacion(trama);
			case 'informacion':
				return this.#tramaInformacion(trama);
			case 'cabecera':
				return this.#tramaCabecera(trama);
			case 'linea':
				return this.#tramaLinea(trama);
			case 'cierraPedido':
				return this.#cierraPedido(trama);
			case 'finTransmision':
			default:
			//'noop';
		}
	}
	#dispatch(trama) {
		let transicion = this.#transiciones.find(t => {
			return t.de === this.#estado && t.evento === trama.tipo
		})

		if (transicion) {
			this.#ejecutarAccion(transicion.accion, trama);
			this.#estado = transicion.a;
			return true;
		} else {
			console.log(`TRANSICION NO DEFINIDA: [${this.#estado}, ${trama.tipo}]`,)
			this.error = true;
			return false;
		}

	}
	analizar(tramas) {
		let i = 0;
		let trama;
		while (trama = tramas[i++]) {
			if (!this.#dispatch(trama)) return;
		}
	}

}


export default FSMTransmisionV2;