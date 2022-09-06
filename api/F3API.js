import axios from "axios";

async function llamadaFedicom(token, metodo, url, body, cabeceras) {

	let urlFedicom = 'https://fedicom3-dev.hefame.es'
	if (!cabeceras) cabeceras = {}
	let opciones = {
		responseType: 'json',
		url: urlFedicom + url,
		method: metodo,
		headers: {
			...cabeceras,
			'content-type': 'application/json',
			'software-id': '6969'
		},
		//timeout: 30000,
		data: undefined,
		validateStatus: (status) => true
	}

	if (body) opciones.data = JSON.stringify(body);
	if (token) opciones.headers['authorization'] = 'Bearer ' + token;

	try {
		console.log(opciones);
		return await axios(opciones);
	} catch (error) {
		if (Array.isArray(error)) throw error;
		else if (error.message) throw [{ codigo: 'NET-001', descripcion: `No se pudo alcanzar el servidor: ${error.message}` }]
		else throw [{ codigo: 'NET-002', descripcion: `No se pudo alcanzar el servidor: ${error}` }]
	}
}

const F3API = {
	autenticar: async (solicitudAutenticacion) => {
		let respuesta = await llamadaFedicom(null, 'post', '/authenticate', solicitudAutenticacion);
		let json = respuesta.data;
		if (json?.auth_token) return json.auth_token;
		throw json;
	},
	crearPedido: async (token, pedido) => {
		let respuesta = await llamadaFedicom(token, 'post', '/pedidos', pedido);
		let json = respuesta.data;
		if (json?.numeroPedido) return json;
		throw json;
	}
}
export default F3API;
