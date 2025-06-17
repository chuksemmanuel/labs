'use client';
import { useEffect, useState } from 'react';
import './home.css';
import { supabase } from '@/supabase-client';
import type { Session } from '@supabase/supabase-js';
import Image from 'next/image';

interface Task {
	id: number;
	title: string;
	description: string;
	image_url: string;
	created_at: string;
}

const TaskManager = ({ session }: { session: Session }) => {
	const [newTask, setNewTask] = useState({ title: '', description: '' });
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newDescription, setNewDescription] = useState('');
	const [taskImage, setTaskImage] = useState<File | null>(null);

	// File upload

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setTaskImage(e.target.files[0]);
		}
		console.log(taskImage);
	};

	const uploadImage = async (file: File): Promise<string | null> => {
		const filePath = `${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}-${Date.now()}`;
		const { error } = await supabase.storage.from('task-images').upload(filePath, file);

		if (error) {
			console.log('Error uploading image:', error);
			return null;
		}

		const { data } = await supabase.storage.from('task-images').getPublicUrl(filePath);
		return data.publicUrl;
	};

	// Create
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		let image_url: string | null = null;

		if (taskImage) {
			image_url = await uploadImage(taskImage);
		}
		if (!image_url) {
			console.log('File upload most have failed');
			return;
		}
		console.log(image_url);

		const { error } = await supabase
			.from('tasks')
			.insert({ ...newTask, email: session.user.email, image_url: image_url })
			.select()
			.single();

		if (error) {
			console.error('Error adding task: ', error.message);
			return;
		}
		// setTasks(prev => [...prev, data]);
		setNewTask({ title: '', description: '' });
	};
	// Read
	const fetchTask = async () => {
		const { error, data } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
		if (error) {
			console.error('Error fetching tasks: ', error.message);
			return;
		}

		setTasks(data);
	};

	// Update
	const updateTask = async (id: number) => {
		const { error } = await supabase.from('tasks').update({ description: newDescription }).eq('id', id);

		if (error) {
			console.log('Problem updating task: ', error);
			return;
		}
	};

	// Delete
	const deleteTask = async (id: number) => {
		const { error } = await supabase.from('tasks').delete().eq('id', id);

		if (error) {
			console.error('Error delete task: ', error.message);
			return;
		}
	};

	useEffect(() => {
		fetchTask();
	}, []);

	// useEffect(() => {
	// 	const channel = supabase.channel('tasks-channel');
	// 	channel
	// 		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, payload => {
	// 			const newTask = payload.new as Task;
	// 			setTasks(prev => [...prev, newTask]);
	// 		})
	// 		.subscribe(status => {
	// 			console.log('Subscription ', status);
	// 		});
	// }, []);

	return (
		<div>
			<div className='page-width'>
				<div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
					<h2 className='my-4'>Task Manager CRUD</h2>
					{/* Form to add a new task */}
					<form style={{ marginBottom: '1rem' }} className='space-y-4 flex flex-col gap-4' onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Task Title'
							style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
							onChange={e => setNewTask({ ...newTask, title: e.target.value })}
							className='border border-gray-500 rounded-md m-2'
						/>
						<textarea
							placeholder='Task Description'
							style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
							className='border border-gray-500 rounded-md m-2'
							onChange={e => setNewTask({ ...newTask, description: e.target.value })}
						/>

						<input type='file' accept='image/*' onChange={handleFileChange} />
						<button type='submit' style={{ padding: '0.5rem 1rem' }}>
							Add Task
						</button>
					</form>
					{/* List of Tasks */}
					<ul style={{ listStyle: 'none', padding: 0 }}>
						{tasks.map((task, key) => (
							<li
								key={key}
								style={{
									border: '1px solid #ccc',
									borderRadius: '4px',
									padding: '1rem',
									marginBottom: '0.5rem',
								}}>
								<div className='space-y-4'>
									<h3>{task.title}</h3>
									<p>{task.description}</p>
									<Image src={task.image_url} alt={task.title} width={100} height={100} />
									<textarea
										placeholder='update description'
										className='border border-white rounded-1 w-1/2 p-2'
										onChange={e => setNewDescription(e.target.value)}
									/>

									<div>
										<button style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }} onClick={() => updateTask(task.id)}>
											Update
										</button>
										<button style={{ padding: '0.5rem 1rem' }} onClick={() => deleteTask(task.id)}>
											Delete
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TaskManager;
