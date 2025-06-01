'use client';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

const FetchFromMultipleEndpoints = () => {
	const fetchTodos = async () => {
		const response = await axios.get('http://jsonplaceholder.typicode.com/todos');
		if (response.status !== 200) {
			throw new Error('Network response was not ok');
		}
		return response.data;
	};
	const fetchPosts = async () => {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
		if (response.status !== 200) {
			throw new Error('Network response was not ok');
		}
		return response.data;
	};

	const [todoQuery, postQuery] = useQueries({
		queries: [
			{
				queryKey: ['todos'],
				queryFn: fetchTodos,
			},
			{
				queryKey: ['posts'],
				queryFn: fetchPosts,
			},
		],
	});

	return (
		<div className='space-y-12'>
			{todoQuery.isLoading && <p>Loading todos...</p>}
			{todoQuery.error && <p>Error Loading todos {todoQuery.error.message}</p>}

			{todoQuery.data && (
				<div>
					<h1 className='text-2xl font-semibold'>Todos</h1>
					<pre>{JSON.stringify(todoQuery.data.slice(0, 2), null, 2)}</pre>
				</div>
			)}

			<hr />

			{postQuery.isLoading && <p>Loading posts...</p>}
			{postQuery.error && <p>Error Loading posts {postQuery.error.message}</p>}
			{postQuery.data && (
				<div>
					<h1 className='text-2xl font-semibold'>POSTS</h1>
					<pre>{JSON.stringify(postQuery.data.slice(0, 2), null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default FetchFromMultipleEndpoints;
