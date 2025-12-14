import { eq } from "drizzle-orm";
import z from "zod";
import { schema } from "@/server/db";
import { stampInsertSchema, stampUpdateSchema } from "@/server/db/zod";
import {
	adminProcedure,
	authenticatedProcedure,
	createTRPCRouter,
} from "../trpc";

export const stampRouter = createTRPCRouter({
	list: authenticatedProcedure.query(() => {}),

	byId: authenticatedProcedure
		.input(z.object({ id: z.uuid() }))
		.query(async ({ ctx, input }) =>
			ctx.db.query.stamp.findFirst({
				where: eq(schema.stamp.id, input.id),
			}),
		),

	create: adminProcedure
		.input(stampInsertSchema)
		.query(async ({ ctx, input }) =>
			ctx.db.insert(schema.stamp).values(input).returning(),
		),

	update: adminProcedure
		.input(
			z.object({
				id: z.uuid(),
				values: stampUpdateSchema,
			}),
		)
		.query(async ({ ctx, input }) =>
			ctx.db
				.update(schema.stamp)
				.set(input.values)
				.where(eq(schema.stamp.id, input.id))
				.returning(),
		),

	delete: adminProcedure
		.input(z.object({ id: z.uuid() }))
		.query(async ({ ctx, input }) =>
			ctx.db.delete(schema.stamp).where(eq(schema.stamp.id, input.id)),
		),
});
