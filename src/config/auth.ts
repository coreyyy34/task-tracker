import { database } from "@/lib/database";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { ROUTES } from "./routes";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, auth } = NextAuth({
	providers: [
		GitHub,
		Google({
			// Google only provides Refresh Token to an application the first time a user signs in.
			// Force the Refresh Token to always be provided on sign in.
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		MicrosoftEntraID,
	],
	adapter: PrismaAdapter(database),
	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	trustHost: true,
	pages: {
		signIn: ROUTES.auth.login,
		error: ROUTES.auth.error,
	},
});
