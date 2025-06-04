'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const Pagination = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 2;

	const fetchTodos = async (page = 1, limit = 10) => {
		const response = await axios(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
		if (!response.data) {
			throw new Error('Network response was not ok');
		}

		return response.data;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ['todo', currentPage],
		queryFn: () => fetchTodos(currentPage, pageSize),
	});

	return (
		<div>
			<h1>Pagination</h1>
			<div className='space-x-4 mb-2'>
				<button
					onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
					className='px-4 py-1 bg-gray-700 rounded text-white disabled:opacity-50'
					disabled={currentPage === 1}>
					Prev
				</button>
				<button onClick={() => setCurrentPage(prev => prev + 1)} className='px-4 py-1 bg-gray-700 rounded text-white'>
					Next
				</button>
			</div>

			{error && <p>Error: {error.message}</p>}
			{isLoading && <p>Loading...</p>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	);
};

export default Pagination;
