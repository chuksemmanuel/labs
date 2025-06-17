'use client';
import { useEffect, useState } from 'react';
import { Auth } from './Auth';
import TaskManager from './TaskManager';
import { supabase } from '@/supabase-client';
import type { Session } from '@supabase/supabase-js';

const App = () => {
	const [session, setSession] = useState<Session | null>(null);
	const fetchSession = async () => {
		const currentSession = await supabase.auth.getSession();
		setSession(currentSession.data.session);
		console.log(currentSession);
	};

	const logOut = async () => {
		await supabase.auth.signOut();
	};

	useEffect(() => {
		fetchSession();

		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);
	return (
		<>
			{session ? (
				<>
					<button onClick={logOut}>Log out</button>
					<TaskManager session={session} />
				</>
			) : (
				<Auth />
			)}
		</>
	);
};

export default App;
