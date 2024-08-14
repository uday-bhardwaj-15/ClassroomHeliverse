// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uNo: any;
      id: string;
      name: string;
      email: string;
      image: string;
      role: string; // Add role here
      username: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string; // Add role here
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string; // Add role here
    username: string;
  }
}
