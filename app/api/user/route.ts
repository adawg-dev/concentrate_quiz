import { NextResponse } from 'next/server';
import { ensureSchema, getUser } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 });
  await ensureSchema();
  const user = await getUser(id);
  return NextResponse.json({ user });
}
