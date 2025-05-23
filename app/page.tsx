'use client';
const page = () => {
	const handleSubmit = () => {};

	return (
		<div>
			<form className='gap-2' onSubmit={handleSubmit}>
				<input type='text' placeholder='email' />
				<input type='password' placeholder='Password' />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default page;
