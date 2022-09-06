import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama0199 extends Trama {

	constructor(version, _) {
		super(version, TipoTrama.SESION_FIN);
	}
}


export default Trama0199;