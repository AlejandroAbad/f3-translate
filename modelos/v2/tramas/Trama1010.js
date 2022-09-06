import Troceador from "../../../comun/Troceador";
import { TipoTrama } from "./FactoriaTramas";
import Trama from "./Trama";


class Trama1010 extends Trama {

	codCli;
	numPedCli;
	tipoPed;
	//condi;
	//cargoCoop;
	//aplazaCargo;
	aplazaPago;
	//descuentoAdicional;
	empresaFactura;
	almacen;
	fechaEnvio;
	//diaEnvio;

	constructor(version, payload) {
		super(version, TipoTrama.PEDIDO_CABECERA);

		let troceador = new Troceador(payload);

		troceador.avanza(4);
		this.codCli = troceador.trozo(16);
		this.numPedCli = troceador.trozo(10);
		this.tipoPed = troceador.trozo(6);
		troceador.avanza(6 + 1 + 3); //this.condi = troceador.trozo(6);
		// this.cargoCoop = troceador.trozo(1);
		// this.aplazaCargo = troceador.trozo(3);
		this.aplazaPago = troceador.trozo(3);
		troceador.avanza(4); //this.descuentoAdicional = troceador.trozo(4);
		this.empresaFactura = troceador.trozo(3);
		this.almacen = troceador.trozo(4);
		this.fechaEnvio = troceador.trozo(8);
		//this.diaEnvio = troceador.trozo(2);

	}

	aFedicom3() {
		return {
			codigoCliente: String(parseInt(this.codCli, 10)),
			numeroPedidoOrigen: this.numPedCli.trim() ?? (Math.random() + 1).toString(36).substring(10),
			tipoPedido: this.tipoPed.trim() || undefined,
			aplazamiento: parseInt(this.aplazaPago, 10) || undefined,
			empresaFacturadora: this.empresaFactura.trim() || undefined,
			codigoAlmacenServicio: this.almacen.trim() || undefined,
			fechaServicio: this.fechaEnvio.trim() ? this.fechaEnvio.substring(6, 8) + '/' + this.fechaEnvio.substring(4, 6) + '/' + this.fechaEnvio.substring(0, 4) : undefined
		}
	}
}


export default Trama1010;