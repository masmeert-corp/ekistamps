"use client";

import {
	ChevronDown,
	ChevronsUpDown,
	ChevronUp,
	PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";
import {
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
	useQueryState,
} from "nuqs";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";

const sortableFields = [
	"name",
	"locationName",
	"availableFrom",
	"updatedAt",
] as const;

type SortableField = (typeof sortableFields)[number];

export function StampsTable() {
	const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
	const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
	const [sortBy, setSortBy] = useQueryState(
		"sortBy",
		parseAsStringLiteral(sortableFields),
	);
	const [sortOrder, setSortOrder] = useQueryState(
		"sortOrder",
		parseAsStringLiteral(["asc", "desc"] as const).withDefault("asc"),
	);

	const [searchInput, setSearchInput] = useState(search);
	const debouncedSearch = useDebounce(searchInput, 300);

	useEffect(() => {
		if (debouncedSearch !== search) {
			void setSearch(debouncedSearch || null);
			void setPage(1);
		}
	}, [debouncedSearch, search, setSearch, setPage]);

	const [result] = api.stamp.list.useSuspenseQuery({
		page,
		search: search || undefined,
		sortBy: sortBy ?? undefined,
		sortOrder: sortBy ? sortOrder : undefined,
	});

	const toggleSort = (field: SortableField) => {
		if (sortBy === field) {
			void setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			void setSortBy(field);
			void setSortOrder("asc");
		}
		void setPage(1);
	};

	const SortHeader = ({
		field,
		children,
	}: {
		field: SortableField;
		children: React.ReactNode;
	}) => (
		<Button
			className="h-8"
			onClick={() => toggleSort(field)}
			size="sm"
			variant="ghost"
		>
			{children}
			{sortBy === field ? (
				sortOrder === "asc" ? (
					<ChevronUp className="ml-1 h-4 w-4" />
				) : (
					<ChevronDown className="ml-1 h-4 w-4" />
				)
			) : (
				<ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
			)}
		</Button>
	);

	return (
		<div className="w-full px-4 lg:px-6">
			<div className="flex items-center justify-between py-4">
				<Input
					className="max-w-sm"
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search by name or location..."
					value={searchInput}
				/>
				<Button asChild>
					<Link href="/admin/stamps/new">
						<PlusCircleIcon className="h-4 w-4" />
						New Stamp
					</Link>
				</Button>
			</div>

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<SortHeader field="name">Name</SortHeader>
							</TableHead>
							<TableHead>
								<SortHeader field="locationName">Location</SortHeader>
							</TableHead>
							<TableHead>
								<SortHeader field="availableFrom">Available From</SortHeader>
							</TableHead>
							<TableHead>
								<SortHeader field="updatedAt">Updated</SortHeader>
							</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.data.length ? (
							result.data.map((stamp) => (
								<TableRow key={stamp.id}>
									<TableCell className="font-medium">{stamp.name}</TableCell>
									<TableCell>{stamp.locationName}</TableCell>
									<TableCell>
										{stamp.availableFrom &&
											new Date(stamp.availableFrom).toLocaleDateString()}
									</TableCell>
									<TableCell>{stamp.updatedAt.toLocaleDateString()}</TableCell>
									<TableCell>{/* Your actions here */}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell className="h-24 text-center" colSpan={5}>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<p className="flex-1 text-muted-foreground text-sm">
					Page {result.page} of {result.totalPages} ({result.totalCount} total)
				</p>
				<div className="flex items-center gap-2">
					<Button
						disabled={page <= 1}
						onClick={() => setPage(page - 1)}
						size="sm"
						variant="outline"
					>
						Previous
					</Button>
					<Button
						disabled={page >= result.totalPages}
						onClick={() => setPage(page + 1)}
						size="sm"
						variant="outline"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
