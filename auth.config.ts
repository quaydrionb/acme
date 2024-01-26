// Importing the NextAuthConfig type from 'next-auth'
import type { NextAuthConfig } from 'next-auth';

// Configuration object for NextAuth
export const authConfig: NextAuthConfig = {
  // Define custom pages, in this case, redirecting signIn to '/login'
  pages: {
    signIn: '/login',
  },
  
  // Callbacks section for handling various events
  callbacks: {
    // Callback for the 'authorized' event
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is logged in
      const isLoggedIn = !!auth?.user;

      // Check if the user is trying to access the dashboard
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        // If on the dashboard page, check if the user is logged in
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        // If the user is logged in and not on the dashboard, redirect to the dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      // If not on the dashboard and not logged in, allow the access
      return true;
    },
  },

  // Providers section for authentication providers (empty array for now)
  providers: [],

  // Ensuring that the configuration satisfies the NextAuthConfig type
} as NextAuthConfig;
