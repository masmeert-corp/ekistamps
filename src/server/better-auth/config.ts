import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, lastLoginMethod } from "better-auth/plugins";

import { Config } from "@/config";
import { db } from "@/server/db";

export const auth = betterAuth({
	trustedOrigins: [Config.FRONTEND_URL],
	plugins: [lastLoginMethod(), admin()],

	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		google: {
			clientId: Config.BETTER_AUTH_GOOGLE_CLIENT_ID,
			clientSecret: Config.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: Config.BETTER_AUTH_GITHUB_CLIENT_ID,
			clientSecret: Config.BETTER_AUTH_GITHUB_CLIENT_SECRET,
		},
	},
});

export type Session = typeof auth.$Infer.Session;
