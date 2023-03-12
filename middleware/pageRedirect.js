export default function ({ route, redirect }) {
	if (!route.path.endsWith('/') && !Object.keys(route.query).length && route.name !== 'hotels') {
		redirect(301, route.path + '/');
	}
}
