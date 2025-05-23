'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
/*
    This  example uses hookform resolvers and zod
*/

const schema = z.object({
	email: z.string().email('Please enter a valid email'),
	password: z.string().min(8, 'password must be at least 8 characters'),
});

type FormFields = z.infer<typeof schema>;

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
		resolver: zodResolver(schema),
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
					<input {...register('email')} type='text' placeholder='email' className='border border-gray-400 rounded px-4 py-2' />
					{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
				</div>

				<div className='flex flex-col gap-0.5'>
					<input {...register('password')} type='password' placeholder='Password' className='border border-gray-400 rounded px-4 py-2' />
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
			<p className='text-center text-gray-900 text-sm mt-2'>
				<Link href='/' className='text-purple-500 underline'>
					Login
				</Link>{' '}
				- Using plain React hook form
			</p>
		</div>
	);
};

export default ReactHookForm;
