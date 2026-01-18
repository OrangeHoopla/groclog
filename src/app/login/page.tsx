import { LoginForm } from "@/components/login-form"
import { checkAuth, isUserBlocked } from "@/lib/auth0"
import { redirect } from "next/navigation"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ blocked?: string }>
}) {
  const session = await checkAuth()
  
  // If user is already logged in and not blocked, redirect to dashboard
  if (session?.user && !isUserBlocked(session.user.name)) {
    redirect('/core/dashboard')
  }
  
  // If blocked user tries to access, show blocked message
  const params = await searchParams
  const isBlocked = params.blocked === 'true'
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isBlocked && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Access denied. Your account has been blocked.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  )
}
