import { Suspense } from "react";

import { api, HydrateClient } from "@/trpc/server";
import { StampsTableSkeleton } from "./_components/stamps-table/skeleton";
import { StampsTable } from "./_components/stamps-table/stamps-table";

type SearchParams = Promise<{
	page?: string;
	q?: string;
	sortBy?: string;
	sortOrder?: string;
}>;

export default async function AdminStampsPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = await searchParams;

	await api.stamp.list.prefetch({
		page: Number(params.page) || 1,
		search: params.q || undefined,
		sortBy: params.sortBy as
			| "name"
			| "locationName"
			| "availableFrom"
			| "updatedAt"
			| undefined,
		sortOrder: params.sortOrder as "asc" | "desc" | undefined,
	});

	return (
		<HydrateClient>
			<Suspense fallback={<StampsTableSkeleton />}>
				<StampsTable />
			</Suspense>
		</HydrateClient>
	);
}
