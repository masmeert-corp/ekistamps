import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import z from "zod";

import { schema } from "@/server/db";
import { withPagination } from "@/server/db/utils";
import { stampInsertSchema, stampUpdateSchema } from "@/server/db/zod";
import {
	adminProcedure,
	authenticatedProcedure,
	createTRPCRouter,
} from "../trpc";

const sortableColumns = {
	name: schema.stamp.name,
	locationName: schema.stamp.locationName,
	availableFrom: schema.stamp.availableFrom,
	updatedAt: schema.stamp.updatedAt,
} as const;

export const stampRouter = createTRPCRouter({
	list: authenticatedProcedure
		.input(
			z.object({
				page: z.number().min(1).default(1),
				pageSize: z.number().min(1).max(100).default(10),
				search: z.string().optional(),
				sortBy: z
					.enum(["name", "locationName", "availableFrom", "updatedAt"])
					.optional(),
				sortOrder: z.enum(["asc", "desc"]).optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { page, pageSize, search, sortBy, sortOrder = "asc" } = input;

			const searchFilter = search
				? or(
						ilike(schema.stamp.name, `%${search}%`),
						ilike(schema.stamp.nameEn, `%${search}%`),
						ilike(schema.stamp.locationName, `%${search}%`),
						ilike(schema.stamp.locationNameEn, `%${search}%`),
					)
				: undefined;

			const orderByColumn = sortBy ? sortableColumns[sortBy] : schema.stamp.id;
			const orderBy =
				sortOrder === "desc" ? desc(orderByColumn) : asc(orderByColumn);

			const baseQuery = ctx.db.select().from(schema.stamp).where(searchFilter);

			const countQuery = ctx.db
				.select({ count: sql<number>`cast(count(*) as integer)` })
				.from(schema.stamp)
				.where(searchFilter);

			const [data, totalCount] = await Promise.all([
				withPagination(baseQuery.$dynamic(), orderBy, page, pageSize),
				countQuery.then((result) => result[0]?.count ?? 0),
			]);

			return {
				data,
				totalCount,
				page,
				pageSize,
				totalPages: Math.ceil(totalCount / pageSize),
			};
		}),

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
