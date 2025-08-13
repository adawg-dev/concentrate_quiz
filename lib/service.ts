/* eslint-disable no-console */
"server-only"

import { User, UserData } from "."

// Use BACKEND_URL from environment (set to http://backend:3010 in Docker); fallback to localhost for local dev
// Using globalThis avoids TS/node type issues in different runtimes
const BACKEND_URL: string = (globalThis as any).process?.env?.BACKEND_URL ?? 'http://localhost:3010'

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v0/users/by-email?email=${encodeURIComponent(email)}`);
      console.log('Response:', response)
      
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
      const response = await fetch(`${BACKEND_URL}/api/v0/users`, {
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