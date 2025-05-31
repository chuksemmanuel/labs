interface SplitScreenProps {
	children: [React.ReactNode, React.ReactNode];
	leftWidth: number;
}
const SplitScreen = ({ children, leftWidth }: SplitScreenProps) => {
	const [left, right] = children;

	return (
		<section className='grid w-screen' style={{ gridTemplateColumns: `${leftWidth}% 1fr` }}>
			<div>{left}</div>
			<div className=''>{right}</div>
		</section>
	);
};

export default SplitScreen;
