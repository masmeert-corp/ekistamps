import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Config = createEnv({
	server: {
		BETTER_AUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string()
				: z.string().optional(),
		BETTER_AUTH_GOOGLE_CLIENT_ID: z.string(),
		BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string(),
		BETTER_AUTH_GITHUB_CLIENT_ID: z.string(),
		BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string(),
		FRONTEND_URL: z.url(),
		BACKEND_URL: z.url(),
		DATABASE_URL: z.url(),
		S3_ENDPOINT: z.url(),
		S3_ACCESS_KEY: z.string().min(1),
		S3_SECRET_KEY: z.string().min(1),
		S3_BUCKET_NAME: z.string().min(1),
		S3_PUBLIC_URL: z.url(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		REGISTRATION_ENABLED: z
			.string()
			.default("false")
			.transform((s) => s !== "false" && s !== "0"),
	},

	client: {
		NEXT_PUBLIC_MAPBOX_TOKEN: z.string(),
	},

	experimental__runtimeEnv: {
		NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
