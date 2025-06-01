'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const WithTheTanStackQuery = () => {
	const fetchData = async () => {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
		return response.data;
	};
	const { data, error, isLoading } = useQuery({ queryKey: ['todo'], queryFn: fetchData });

	console.log({ ...data });
	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{data && (
				<h1>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</h1>
			)}

			<div className='space-x-4'></div>
		</div>
	);
};

export default WithTheTanStackQuery;
