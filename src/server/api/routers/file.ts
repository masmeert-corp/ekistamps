import z from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const fileRouter = createTRPCRouter({
	getPresignedUrl: adminProcedure
		.input(
			z.object({
				filename: z.string(),
				contentType: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const key = `${crypto.randomUUID()}-${input.filename}`;
			const uploadUrl = {}; // TODO

			return {
				key,
				uploadUrl,
			};
		}),
});
