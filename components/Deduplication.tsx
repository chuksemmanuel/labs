'use client';
import { useQuery } from '@tanstack/react-query';

const Deduplication = () => {
	const getRandomNumber = async () => {
		// fake load time
		await new Promise(resolve => setTimeout(resolve, 1000));
		return Math.floor(Math.random() * 100);
	};

	const { data } = useQuery({
		queryKey: ['randomNumber'],
		queryFn: getRandomNumber,
	});
	return <div>Random Number Is : {data}</div>;
};

export default Deduplication;
