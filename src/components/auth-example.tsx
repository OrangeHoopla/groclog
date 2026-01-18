/**
 * Example component showing how to use Auth0 authentication checks
 * 
 * This file demonstrates both server-side and client-side authentication patterns
 */

'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';

/**
 * Client-side component example using useUser hook
 */
export function AuthExample() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        <p>Welcome, {user.name}!</p>
        <p>Email: {user.email}</p>
        <Button asChild>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not logged in.</p>
      <Button asChild>
        <a href="/api/auth/login">Login</a>
      </Button>
    </div>
  );
}
