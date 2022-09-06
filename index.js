import F3API from "./api/F3API";
import TransmisionV2 from "./modelos/v2/TransmisionV2";


//const payload = "01012022090614590820816326@hefame 3BE1169A..101016326           78079                 00000000000                 ..102000000015836730001..10500001000001000000..0199..";
const payload = "01012022090614590820816326@hefame 3BE1169A..00000001DB2E0D920..101000000000000163260000078079            00000000000                 ..102000000001583670001..10500001000001000000..0199..";



const transmision = new TransmisionV2(payload)
let solicitudToken = transmision.generarSolicitudToken();

try {
	let token = await F3API.autenticar(solicitudToken);
	let pedidos = transmision.generarPedidosFedicom();
	let promesas = pedidos.map(pedido => {
		return F3API.crearPedido(token, pedido);
	})
	let resultados = await Promise.allSettled(promesas);

	
	console.log(resultado);

} catch (error) {
	console.log('ERROR AL OBTENER TOKEN', error)
}
