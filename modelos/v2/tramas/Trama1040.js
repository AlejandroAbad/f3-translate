import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama1040 extends Trama {

	codArti;
	cantidad;
	descuento;
	numeroVale;
	texto;

	constructor(version, payload) {
		super(version, TipoTrama.PEDIDO_LINEA_ESTUPEFACIENTE);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		this.codArti = troceador.trozo(13);
		this.cantidad = troceador.trozo(4);
		this.descuento = troceador.trozo(4);
		this.numeroVale = troceador.trozo(25);

		if (version == 2)
			this.texto = troceador.trozo(50);
	}

	aFedicom3(orden = undefined) {
		return {
			orden,
			codigoArticulo: String(parseInt(this.codArti, 10)),
			cantidad: parseInt(this.cantidad, 10) || 1,
			descuentoPorcentaje: parseInt(this.descuentoLinea, 10) / 100 || undefined,
			valeEstupefaciente: this.numeroVale || undefined
		}
	}
}



export default Trama1040;