import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama0101 extends Trama {

	//fecha;
	//hora;
	usuario;
	clave;

	constructor(version, payload) {
		super(version, TipoTrama.SESION_INICIO);

		let troceador = new Troceador(payload);

		troceador.avanza(4 + 8 + 6);
		//this.fecha = troceador.trozo(8);
		//this.hora = troceador.trozo(6);
		this.usuario = troceador.trozo(16);
		this.clave = troceador.trozo(8);
	}

	aFedicom3() {
		return {
			user: this.usuario.trim(),
			//password: this.clave
			password: '11111111'
		}
	}
}


export default Trama0101;