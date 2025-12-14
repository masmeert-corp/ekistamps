import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { Config } from "@/config";
import * as _schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(Config.DATABASE_URL);
if (Config.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema: _schema });

export const schema = _schema;
