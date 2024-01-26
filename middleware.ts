// Importing NextAuth library
import NextAuth from 'next-auth';
// Importing the custom authentication configuration
import { authConfig } from './auth.config';

// Initializing NextAuth with custom configurations and exporting the auth object
export default NextAuth(authConfig).auth;

// Exporting additional configuration options
export const config = {
  // Defining a matcher for middleware to exclude specific routes
  // In this case, excluding routes that include 'api', '_next/static', '_next/image', and end with '.png'
  // This matcher is based on the pattern described in the Next.js documentation
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
