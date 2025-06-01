'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const RefreshInterval = () => {
	const [currentId, setCurrentId] = useState(1);

	const fetchData = async (id: number) => {
		const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
		return response.data;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ['todo', currentId],
		queryFn: () => fetchData(currentId),
		refetchInterval: 5000,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentId(prevId => (prevId < 200 ? prevId + 1 : 1));
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{error && <p className='text-red'>Error: {error.message}</p>}
			<h1>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</h1>
			<div className='space-x-4'>
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
					onClick={() => setCurrentId(Math.max(currentId - 1, 1))}
					disabled={currentId <= 1}>
					Prev
				</button>
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded mt-4 cursor-pointer'
					onClick={() => setCurrentId(currentId < 200 ? currentId + 1 : currentId)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default RefreshInterval;
