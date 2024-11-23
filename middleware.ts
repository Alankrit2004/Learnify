import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
    
    // Only check for branch selection on the home page
    if (request.nextUrl.pathname === '/') {
      // Get cookies from the request
      const selectedBranch = request.cookies.get('selectedBranch')?.value
      const selectedSemester = request.cookies.get('selectedSemester')?.value

      if (selectedBranch && selectedSemester) {
        // Redirect to dashboard if selections exist
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
