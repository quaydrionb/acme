// Importing NextAuth library
import NextAuth from 'next-auth';
// Importing the Credentials provider from NextAuth
import Credentials from 'next-auth/providers/credentials';
// Importing the custom authentication configuration
import { authConfig } from './auth.config';
// Importing Zod for schema validation
import { z } from 'zod';
// Importing @vercel/postgres for SQL database interactions
import { sql } from '@vercel/postgres';
// Importing the User type definition
import type { User } from '@/app/lib/definitions';
// Importing bcrypt for password hashing and comparison
import bcrypt from 'bcrypt';

// Function to fetch a user from the database based on email
async function getUser(email: string): Promise<User | undefined> {
  try {
    // Using @vercel/postgres to execute an SQL query to fetch the user
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Initializing NextAuth with custom configurations
export const { auth, signIn, signOut } = NextAuth({
  // Spread the properties from the authConfig object
  ...authConfig,
  // Adding the Credentials provider with custom authorize function
  providers: [
    Credentials({
      async authorize(credentials) {
        // Parsing and validating the provided credentials using Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          // Destructuring email and password from the parsed credentials
          const { email, password } = parsedCredentials.data;
          // Fetching the user from the database based on the provided email
          const user = await getUser(email);

          // Checking if the user exists and if the passwords match
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // If passwords match, return the user
          if (passwordsMatch) return user;
        }
        
        // Log an error if credentials are invalid and return null
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
