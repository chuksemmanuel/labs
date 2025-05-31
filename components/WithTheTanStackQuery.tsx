'use client';
import { useQuery } from '@tanstack/react-query';
const WithTheTanStackQuery = () => {
	const fetchData = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.come/todos');
		if (!response.ok) throw new Error('Network response was not ok');

		return response.json();
	};
	const data = useQuery({ queryKey: ['todo'], queryFn: fetchData });
	console.log(data);
	return <div>WithTheTanStackQuery</div>;
};

export default WithTheTanStackQuery;
