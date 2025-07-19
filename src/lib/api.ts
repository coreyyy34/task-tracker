export async function apiFetch<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const res = await fetch(endpoint, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!res.ok) {
		const errorBody = await res.json().catch(() => ({}));
		throw new Error(errorBody.message || "API request failed");
	}

	return res.json();
}
