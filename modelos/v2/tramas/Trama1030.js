import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama1030 extends Trama {

	codArti;
	cantidad;
	bonificacion;
	descuentoLinea;
	texto;

	constructor(version, payload) {
		super(version, TipoTrama.PEDIDO_LINEA_BONIFICACION);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		this.codArti = troceador.trozo(13);
		this.cantidad = troceador.trozo(4);
		this.bonificacion = troceador.trozo(4);
		this.descuentoLinea = troceador.trozo(4);

		if (version == 2)
			this.texto = troceador.trozo(50);
	}

	aFedicom3(orden = undefined) {
		return {
			orden,
			codigoArticulo: String(parseInt(this.codArti, 10)),
			cantidad: parseInt(this.cantidad, 10) || 1,
			cantidadBonificacion: parseInt(this.bonificacion, 10) || undefined,
			descuentoPorcentaje: parseInt(this.descuentoLinea, 10) / 100 || undefined
		}
	}
}



export default Trama1030;