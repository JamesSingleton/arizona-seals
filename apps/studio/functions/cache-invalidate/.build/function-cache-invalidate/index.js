//#region ../../node_modules/.pnpm/@sanity+functions@1.4.0_@aws-lite+client@0.23.7_@aws-lite+dynamodb@0.3.9_@aws-lite+lamb_7510397bbcd438f438e3fa6c16e3aa35/node_modules/@sanity/functions/dist/definers.js
/**
* Defines a "sync tag invalidate event" function handler.
* Returns the handler function as-is, only providing the types and doing basic validation.
*
* @param handler - The event handler function to use.
* @returns The handler function, unmodified.
*/
function syncTagInvalidateEventHandler(handler) {
	if (typeof handler !== "function") throw new TypeError("`handler` must be a function");
	return handler;
}
//#endregion
//#region functions/cache-invalidate/index.ts
async function ack(done, tags) {
	const start = performance.now();
	try {
		const response = await done(tags);
		const ms = Math.round(performance.now() - start);
		console.info(`done() responded with HTTP ${response.status} (${ms}ms)`);
	} catch (error) {
		const ms = Math.round(performance.now() - start);
		console.error(`Error invoking done callback (${ms}ms)`, error);
	}
}
async function expireTags(target, tags, secret) {
	const start = performance.now();
	const res = await fetch(target, {
		body: JSON.stringify({
			secret,
			tags
		}),
		headers: { "Content-Type": "application/json" },
		method: "POST"
	});
	const ms = Math.round(performance.now() - start);
	if (res.ok) console.info(`Revalidated ${tags.length} tags via ${target} (${ms}ms)`, res.status);
	else {
		const body = await res.text();
		console.error(`Non-OK response from ${target} (${ms}ms)`, res.status, body);
	}
}
var handler = syncTagInvalidateEventHandler(async ({ event, done }) => {
	const start = performance.now();
	const { syncTags } = event.data;
	const target = new URL("https://www.arizonaseals.com/api/revalidate-tags");
	console.info(`Forwarding ${syncTags.length} tags to api`);
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	await expireTags(target, syncTags, secret);
	await ack(done, syncTags);
	console.info(`Total handler time: ${Math.round(performance.now() - start)}ms`);
});
//#endregion
export { handler };

//# sourceMappingURL=index.js.map