"use client";

import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";
import { PaginatedTable } from "../paginated-table";
import { columns } from "./columns";

type SortableField = "name" | "locationName" | "availableFrom" | "updatedAt";

export function StampsTable() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);

	const debouncedSearch = useDebounce(search, 300);
	const sortField = sorting[0]?.id as SortableField | undefined;
	const sortOrder = sorting[0]?.desc ? "desc" : "asc";

	const [data] = api.stamp.list.useSuspenseQuery({
		page,
		search: debouncedSearch || undefined,
		sortBy: sortField,
		sortOrder: sortField ? sortOrder : undefined,
	});

	const handleSortingChange = (newSorting: SortingState) => {
		setSorting(newSorting);
		setPage(1);
	};

	const handleSearchChange = (newSearch: string) => {
		setSearch(newSearch);
		setPage(1);
	};

	return (
		<div className="px-4 lg:px-6">
			<PaginatedTable
				columns={columns}
				onPageChange={setPage}
				onSearchChange={handleSearchChange}
				onSortingChange={handleSortingChange}
				result={data}
				search={search}
				searchPlaceholder="Search by name or location..."
				sorting={sorting}
			/>
		</div>
	);
}
