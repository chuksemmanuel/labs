import Left from '@/components/Left';
import Right from '@/components/Right';
import SplitScreen from '@/components/SplitScreen';

const page = () => {
	return (
		<SplitScreen leftWidth={25}>
			<Left />
			<Right />
		</SplitScreen>
	);
};

export default page;
