import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isWebhook = createRouteMatcher(['/api/webhooks(.*)'])

const isProtected = createRouteMatcher([
  '/dashboard(.*)',
  '/projects(.*)',
  '/documents(.*)',
  '/activites(.*)',
  '/missions(.*)',
  '/agents(.*)',
  '/conversations(.*)',
  '/bibliotheque(.*)',
  '/settings(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isWebhook(req)) return
  if (isProtected(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
}
