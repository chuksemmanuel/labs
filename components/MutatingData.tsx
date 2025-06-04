'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface Todo {
	id?: number;
	title: string;
	completed: boolean;
}

const MutatingData = () => {
	const [title, setTitle] = useState('');
	const queryClient = useQueryClient();

	const postTodo = async (newTodo: Todo) => {
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
		console.log(response);
		if (response.status !== 201) throw new Error('Network response was not ok');

		return response.data;
	};

	const { mutate, error, status } = useMutation<Todo, Error, Todo>({
		mutationFn: postTodo,
		onSuccess: () => {
			queryClient.invalidateQueries(['todos']);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (title.trim() === '') return;
		mutate({ title, completed: false });
		setTitle('');
	};
	return (
		<div>
			<h1>Create new todo</h1>
			<form className='flex flex-col gap-4 mt-4 w-120' onSubmit={handleSubmit}>
				<input
					className='border rounded px-4 py-2 '
					type='text'
					value={title}
					onChange={e => setTitle(e.target.value)}
					placeholder='Enter todo title'
				/>

				<button type='submit' className='bg-black px-4 py-2 text-white rounded cursor-pointer'>
					{status === 'pending' ? 'Adding...' : 'Add todo'}
				</button>
				{error && <p className='text-red-500'>An error occured :{error.message}</p>}
				{status === 'success' && <p className='text-green-700'>Todo added successfully</p>}
			</form>
		</div>
	);
};

export default MutatingData;
