'use client';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
	email: string;
	password: string;
};

const ReactHookForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		defaultValues: {
			email: 'test@email.com',
		},
	});

	const onSubmit: SubmitHandler<FormFields> = async data => {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			console.log(data);
			// throw new Error(JSON.stringify({ type: 'email', message: 'Email already taken' }));
			throw new Error('Something went wrong!');
		} catch (error) {
			let type, message;
			if (error instanceof Error) {
				try {
					const parsed = JSON.parse(error.message);
					type = parsed.type;
					message = parsed.message;
				} catch {
					// fallback if not JSON
					type = undefined;
					message = error.message;
				}
			}

			if (type === 'email') {
				setError('email', { message });
			} else {
				setError('root', { message });
			}
		}
	};
	return (
		<div className='page-width'>
			<form className='flex flex-col gap-2 w-[500px] m-auto' onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-0.5'>
					<input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Invalid email address',
							},
							validate: value => {
								if (value.toLowerCase().includes('admin')) {
									return 'Email most not include admin';
								}
								return true;
							},
						})}
						type='text'
						placeholder='email'
						className='border border-gray-400 rounded px-4 py-2'
					/>
					{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
				</div>

				<div className='flex flex-col gap-0.5'>
					<input
						{...register('password', {
							required: 'Password is required:',
							minLength: {
								value: 8,
								message: 'Password must have at least 8 characters:',
							},
						})}
						type='password'
						placeholder='Password'
						className='border border-gray-400 rounded px-4 py-2'
					/>
					{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
				</div>
				<div className='flex flex-col gap-0.5'>
					<button
						type='submit'
						className='bg-purple-500 text-white rounded py-2 px-4 font-medium cursor-pointer hover:bg-purple-600 active:bg-purple-700 '
						disabled={isSubmitting}>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
					{errors.root && <span className='text-red-500 text-xs'>{errors.root.message}</span>}
				</div>
			</form>
		</div>
	);
};

export default ReactHookForm;
