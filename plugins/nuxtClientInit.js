export default async (context) => {
	await context.store.dispatch('User/nuxtClientInit', context);
};
