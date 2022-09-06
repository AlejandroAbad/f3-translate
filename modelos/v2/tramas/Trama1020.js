import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama1020 extends Trama {

	codArti;
	cantidad;
	texto;

	constructor(version, payload) {
		super(version, TipoTrama.PEDIDO_LINEA);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		this.codArti = troceador.trozo(13);
		this.cantidad = troceador.trozo(4);

		if (version == 2)
			this.texto = troceador.trozo(50);
	}

	aFedicom3(orden = undefined) {
		return {
			orden,
			codigoArticulo: String(parseInt(this.codArti, 10)),
			cantidad: parseInt(this.cantidad, 10),
		}
	}
}



export default Trama1020;