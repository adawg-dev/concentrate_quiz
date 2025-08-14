/* eslint-disable no-console */
'server-only';

import { User, UserData } from '.';

// Resolve BACKEND_URL from environment at call-time for flexibility in tests and envs
function getBackendUrl(): string {
  return (globalThis as any).process?.env?.BACKEND_URL ?? 'http://localhost:3010';
}

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(
        `${getBackendUrl()}/api/v0/users/by-email?email=${encodeURIComponent(email)}`
      );
      console.log('Response:', response);

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  static async upsertUser(userData: UserData): Promise<UserData> {
    try {
      const response = await fetch(`${getBackendUrl()}/api/v0/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to upsert user: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }
}
