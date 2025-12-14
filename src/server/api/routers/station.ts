import { ilike, or } from "drizzle-orm";
import z from "zod";
import { schema } from "@/server/db";
import { authenticatedProcedure, createTRPCRouter } from "../trpc";

export const stationRouter = createTRPCRouter({
	search: authenticatedProcedure
		.input(
			z.object({
				query: z.string().min(1),
				limit: z.number().default(20),
			}),
		)
		.query(async ({ ctx, input }) => {
			const pattern = `%${input.query}%`;
			return ctx.db.query.station.findMany({
				limit: input.limit,
				where: or(
					ilike(schema.station.name, pattern),
					ilike(schema.station.nameKana, pattern),
					ilike(schema.station.nameRomaji, pattern),
					ilike(schema.station.nameEn, pattern),
				),
				with: {
					stationLines: {
						with: {
							line: {
								with: {
									company: true,
								},
							},
						},
					},
					prefecture: true,
				},
			});
		}),
});
