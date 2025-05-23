'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
	email: string;
	password: string;
};

const ReactHookForm = () => {
	const { register, handleSubmit } = useForm<FormFields>();
	const onSubmit: SubmitHandler<FormFields> = data => {
		console.log(data);
	};
	return (
		<div className='page-width'>
			<form className='flex flex-col gap-2 w-[500px] m-auto' onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email', {
						required: true,
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/,
						validate: value => value !== 'admin',
					})}
					type='text'
					placeholder='email'
					className='border border-gray-400 rounded px-4 py-2'
				/>
				<input
					{...register('password', {
						required: true,
						minLength: 8,
					})}
					type='password'
					placeholder='Password'
					className='border border-gray-400 rounded px-4 py-2'
				/>
				<button
					type='submit'
					className='bg-purple-500 text-white rounded py-2 px-4 font-medium cursor-pointer hover:bg-purple-600 active:bg-purple-700'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ReactHookForm;
