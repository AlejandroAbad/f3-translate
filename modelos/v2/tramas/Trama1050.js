import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama1050 extends Trama {

	sumaLineas;
	sumaCantidades;
	sumaBonificaciones;

	constructor(version, payload) {
		super(version, TipoTrama.PEDIDO_TOTALES);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		this.sumaLineas = troceador.trozo(4);
		this.sumaCantidades = troceador.trozo(6);
		this.sumaBonificaciones = troceador.trozo(6);
	}
}



export default Trama1050;