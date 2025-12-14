import { api, HydrateClient } from "@/trpc/server";
import { StampsTable } from "./_components/stamps-table/stamps-table";

export default async function AdminStampsPage() {
	await api.stamp.list.prefetch({
		page: 1,
	});
	return (
		<HydrateClient>
			<StampsTable />
		</HydrateClient>
	);
}
