import { Skeleton } from "@/components/ui/skeleton";

export function StampsTableSkeleton() {
	return (
		<div className="w-full px-4 lg:px-6">
			<div className="py-4">
				<Skeleton className="h-9 w-full max-w-sm" />
			</div>
			<div className="overflow-hidden rounded-md border">
				<div className="space-y-2 p-4">
					<Skeleton className="h-26 w-full" />
				</div>
			</div>
			<div className="flex justify-end gap-2 py-4">
				<Skeleton className="h-9 w-20" />
				<Skeleton className="h-9 w-20" />
			</div>
		</div>
	);
}
