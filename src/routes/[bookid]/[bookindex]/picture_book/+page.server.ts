export async function load({ params }) {
	const bookid = params.bookid;
	const bookindex = params.bookindex;

	return {
		bookid,
		bookindex
	};
}
