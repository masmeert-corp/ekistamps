import type { Config as DrizzleConfig } from "drizzle-kit";

import { Config } from "@/config";

export default {
	schema: "./src/server/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: Config.DATABASE_URL,
	},
	tablesFilter: ["ekistamps_*"],
} satisfies DrizzleConfig;
