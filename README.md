This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Auth0 Setup

This project uses Auth0 for authentication. To set it up:

1. Create an Auth0 account and application at [auth0.com](https://auth0.com)
2. Add the following environment variables to your `.env.local` file:

```env
AUTH0_SECRET='use [openssl rand -hex 32] to generate'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN'
AUTH0_CLIENT_ID='YOUR_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_CLIENT_SECRET'
AUTH0_AUDIENCE='YOUR_API_AUDIENCE' # Optional, only if using API
```

3. Configure your Auth0 application:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`

### Using Auth0 in Your Code

**Server Components:**
```typescript
import { requireAuth, checkAuth, getCurrentUser } from '@/lib/auth0';

// Require authentication (redirects if not logged in)
export default async function ProtectedPage() {
  const session = await requireAuth();
  return <div>Welcome {session.user.name}</div>;
}

// Check authentication without redirecting
export default async function Page() {
  const session = await checkAuth();
  if (session) {
    return <div>Logged in as {session.user.name}</div>;
  }
  return <div>Not logged in</div>;
}
```

**Client Components:**
```typescript
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function ClientComponent() {
  const { user, error, isLoading } = useUser();
  // Use user, error, isLoading as needed
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Auth0 Next.js SDK](https://auth0.com/docs/quickstart/webapp/nextjs) - Auth0 integration guide.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
