import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { fileRouter } from "./routers/file";
import { stampRouter } from "./routers/stamp";
import { stationRouter } from "./routers/station";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	file: fileRouter,
	stamp: stampRouter,
	station: stationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
