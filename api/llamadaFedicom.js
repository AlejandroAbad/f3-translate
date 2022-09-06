
export default async function llamadaFedicom(token, metodo, url, body, cabeceras) {

	let urlFedicom = 'https://fedicom3-dev.hefame.es'
	if (!cabeceras) cabeceras = {}
	let opciones = {
		method: metodo,
		headers: {
			...cabeceras,
			'content-type': 'application/json',
			'software-id': '6969'
		}
	}

	if (body) opciones.body = JSON.stringify(body);
	if (token) opciones.headers['authorization'] = 'Bearer ' + token;

	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlFedicom + url);
	if (body) console.log(body)
	console.groupEnd()

	try {
		return await fetch(urlFedicom + url, opciones);
	} catch (error) {
		throw error;
	}
}
