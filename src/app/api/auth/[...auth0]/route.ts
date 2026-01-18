import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import { isUserBlocked } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },
    returnTo: '/core/dashboard',
  }),
  callback: handleCallback({
    afterCallback: async (req, res, session) => {
      // Check if user is blocked
      if (session?.user && isUserBlocked(session.user.name)) {
        // Destroy the session and redirect to login with blocked message
        return NextResponse.redirect(new URL('/api/auth/logout?returnTo=/login?blocked=true', req.url));
      }
      return session;
    },
  }),
});
