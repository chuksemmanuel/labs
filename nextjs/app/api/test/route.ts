import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	console.log('test');
	console.log(req.url);
	return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	console.log(body);
	return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}
