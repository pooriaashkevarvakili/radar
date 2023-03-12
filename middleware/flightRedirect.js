export default function ({ route, redirect }) {
	if (route.path?.includes('Flights')) {
		redirect(301, route.path?.replace('Flights', 'flights'));
	}
}
