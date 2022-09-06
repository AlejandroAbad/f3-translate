import Trama0199 from "./Trama0199";
import Trama0101 from "./Trama0101";
import Trama0000 from "./Trama0000";
import Trama1010 from "./Trama1010";
import Trama1020 from "./Trama1020";
import Trama1030 from "./Trama1030";
import Trama1040 from "./Trama1040";
import Trama1050 from "./Trama1050";

export const TipoTrama = {

	SESION_INICIO_V1: "0101",
	SESION_INICIO: "0102",
	SESION_FIN: "0199",

	CABECERA_INFORMACION: "0000",

	PEDIDO_CABECERA: "1010",
	PEDIDO_LINEA: "1020",
	PEDIDO_LINEA_BONIFICACION: "1030",
	PEDIDO_LINEA_ESTUPEFACIENTE: "1040",
	PEDIDO_TOTALES: "1050",

	PEDIDO_INCIDENCIAS_CABECERA: "2010",
	PEDIDO_INCIDENCIAS_LINEA: "2015",
	PEDIDO_TEXTO_LIBRE: "2011",
	PEDIDO_NO_FALTAS: "2030",
	RECHAZO: "9999"
}

export default function parsearTrama(version, payload) {

	let tipoTrama = payload.substr(0, 4);

	switch (tipoTrama) {
		case TipoTrama.SESION_INICIO_V1:
		case TipoTrama.SESION_INICIO:
			return new Trama0101(version, payload);
		case TipoTrama.SESION_FIN:
			return new Trama0199(version, payload);
		case TipoTrama.CABECERA_INFORMACION:
			return new Trama0000(version, payload);
		case TipoTrama.PEDIDO_CABECERA:
			return new Trama1010(version, payload);
		case TipoTrama.PEDIDO_LINEA:
			return new Trama1020(version, payload);
		case TipoTrama.PEDIDO_LINEA_BONIFICACION:
			return new Trama1030(version, payload);
		case TipoTrama.PEDIDO_LINEA_ESTUPEFACIENTE:
			return new Trama1040(version, payload);
		case TipoTrama.PEDIDO_TOTALES:
			return new Trama1050(version, payload);


		default:
			return payload;

	}


}