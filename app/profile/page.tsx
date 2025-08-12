import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ensureSchema, getUser } from '@/lib/db';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions)) as any;
  if (!session?.user?.email) {
    redirect('/login');
  }

  await ensureSchema();
  const oid = (session as any).oid as string | undefined;
  const id = oid && uuidValidate(oid) ? oid : uuidv4();

  const user = await getUser(id);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.data?.name}</p>
      <p>Email: {user?.data?.email}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
