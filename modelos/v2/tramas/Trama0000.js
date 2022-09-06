import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama0000 extends Trama {

	ordinalPedido;
	crc;
	//unCeroHardCore;

	constructor(version, payload) {
		super(version, TipoTrama.CABECERA_INFORMACION);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		
		this.ordinalPedido = troceador.trozo(4);
		this.crc = troceador.trozo(8);
		//this.unCeroHardCore = troceador.trozo(1);
	}
}


export default Trama0000;