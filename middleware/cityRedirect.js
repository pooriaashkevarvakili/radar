
export default function ({ route, redirect }) {
	if (route.path.toLowerCase() !== route.path) {
		redirect(301, route.path.toLowerCase());
	}
	if (route.name === 'hotels' && route.path.endsWith('/')) {
		redirect(301, route.path.slice(0, -1));
	}
}
