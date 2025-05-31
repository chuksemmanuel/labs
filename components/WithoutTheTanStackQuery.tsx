'use client';
import { useEffect, useState } from 'react';

const WithoutTheTanStackQuery = () => {
	const [id, setId] = useState(1);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let rc = false;

		const handleFetch = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
				if (rc) return;

				if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);

				const result = await res.json();
				setData(result);

				//eslint-disable-next-line
			} catch (error: any) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		handleFetch();

		return () => {
			rc = true;
		};
	}, [id]);

	console.log(id, data, isLoading, error, setId);
	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{data && <h1>{JSON.stringify(data)}</h1>}

			<div className='space-x-4'>
				<button className='px-4 py-2 bg-blue-500 text-white rounded mt-4 cursor-pointer' onClick={() => setId(Math.max(id - 1, 1))}>
					Prev
				</button>
				<button className='px-4 py-2 bg-blue-500 text-white rounded mt-4 cursor-pointer' onClick={() => setId(id + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default WithoutTheTanStackQuery;
