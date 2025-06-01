import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Next React Lab',
	description: 'A personal lab space for learning, testing, and prototyping with Next.js, React and related frontend libraries.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${montserrat.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
