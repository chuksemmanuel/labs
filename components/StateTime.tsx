'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const StateTime = () => {
	const fetchData = async () => {
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
			if (response.status !== 200) {
				throw new Error('Network response was not ok');
			}
			return response.data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(`Unexpected error : ${JSON.stringify(error)}`);
		}
	};
	const { data, error, isLoading } = useQuery({ queryKey: ['todo'], queryFn: fetchData, staleTime: 5000 });

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className='text-red'>Error: {error.message}</p>;
	return (
		<div>
			<h1>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</h1>
		</div>
	);
};

export default StateTime;
