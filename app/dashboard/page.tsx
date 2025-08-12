import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ensureSchema, getUser, upsertUser } from '@/lib/db';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as any;
  if (!session?.user?.email) {
    redirect('/login');
  }

  await ensureSchema();

  // Use oid if available; otherwise a deterministic UUID from email namespace (for demo use random)
  const oid = (session as any).oid as string | undefined;
  const id = oid && uuidValidate(oid) ? oid : uuidv4();

  const data = {
    name: (session.user?.name as string | undefined) ?? undefined,
    email: (session.user?.email as string | undefined) ?? undefined,
    updatedAt: new Date().toISOString(),
  };

  await upsertUser(id, data);
  const user = await getUser(id);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
