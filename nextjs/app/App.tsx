'use client';
import React, { useState } from 'react';
import './styles.css';
import Dexie, { type EntityTable } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

interface Todo {
	id: number;
	task: string;
	completed: boolean;
	date: Date;
}

const db = new Dexie('todoApp') as Dexie & {
	todos: EntityTable<Todo, 'id'>; // id is the primary key
};

db.version(1).stores({
	todos: '++id, task, completed, date',
});

const { todos } = db;

const App = () => {
	const [taskField, setTaskField] = useState('');
	const allItems = useLiveQuery(() => todos.toArray(), []);

	const addTask = async (e: React.FormEvent) => {
		e.preventDefault();

		await todos.add({
			task: taskField,
			completed: false,
			date: new Date(),
		});

		setTaskField(''); // Clear the input field after adding the task
	};

	return (
		<div className='container'>
			<h3 className='teal-text center-align'>Todo App</h3>
			<form className='add-item-form' onSubmit={addTask}>
				<input
					type='text'
					className='itemField'
					placeholder='What do you want to do today?'
					required
					value={taskField}
					onChange={e => setTaskField(e.target.value)}
				/>
				<button type='submit' className='waves-effect btn teal right'>
					Add
				</button>
			</form>

			<div className='card white darken-1'>
				<div className='card-content'>
					{allItems && allItems.length > 0 ? (
						allItems
							.sort((a, b) => (a.date < b.date ? 1 : -1))
							.map(item => (
								<div className='row' key={item.id}>
									<p className='col s10'>
										<label>
											<input
												type='checkbox'
												checked={item.completed}
												className='checkbox-blue'
												onChange={async () => {
													await todos.update(item.id, { completed: !item.completed });
												}}
											/>
											<span className={item.completed ? 'black-tex strike-text' : 'black-tex'}>{item.task}</span>
										</label>
									</p>
									<i
										className='col s2 material-icons delete-button'
										onClick={async () => {
											await todos.delete(item.id);
										}}>
										delete
									</i>
								</div>
							))
					) : (
						<p className='center-align'>No items yet</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
