import Link from 'next/link';
import { ReactNode } from 'react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login">Login</Link>
          <form action="/api/auth/signout" method="post" style={{ marginLeft: 'auto' }}>
            <button>Logout</button>
          </form>
        </nav>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}
