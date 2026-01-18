import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

/**
 * Check if a user is blocked from accessing the application
 * @param userName - The user's name to check
 * @returns true if user is blocked, false otherwise
 */
export function isUserBlocked(userName: string | undefined | null): boolean {
  if (!userName) return false;
  return userName.toLowerCase().trim() === 'kevin qu';
}

/**
 * Check if user is authenticated and return session
 * @returns Session object if authenticated, null otherwise
 */
export async function checkAuth() {
  try {
    const session = await getSession();
    
    // Block specific user
    if (session?.user && isUserBlocked(session.user.name)) {
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

/**
 * Require authentication - redirects to login if not authenticated
 * Blocks specific users from accessing the application
 * @returns Session object if authenticated
 */
export async function requireAuth() {
  const session = await checkAuth();
  
  if (!session || !session.user) {
    redirect('/api/auth/login');
  }
  
  // Double check: block specific user even if they have a session
  if (isUserBlocked(session.user.name)) {
    redirect('/api/auth/logout?returnTo=/login?blocked=true');
  }
  
  return session;
}

/**
 * Get the current user from session
 * @returns User object if authenticated, null otherwise
 */
export async function getCurrentUser() {
  const session = await checkAuth();
  const user = session?.user ?? null;
  
  // Return null if user is blocked
  if (user && isUserBlocked(user.name)) {
    return null;
  }
  
  return user;
}
