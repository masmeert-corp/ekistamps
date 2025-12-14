"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
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

export interface PaginatedData<TData> {
	data: TData[];
	totalCount: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	result: PaginatedData<TData>;
	onPageChange: (page: number) => void;
	sorting?: SortingState;
	onSortingChange?: (sorting: SortingState) => void;
	search?: string;
	onSearchChange?: (search: string) => void;
	searchPlaceholder?: string;
}

export function PaginatedTable<TData, TValue>({
	columns,
	result,
	onPageChange,
	sorting: externalSorting,
	onSortingChange,
	search,
	onSearchChange,
	searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
	const [internalSorting, setInternalSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});

	const sorting = externalSorting ?? internalSorting;

	const table = useReactTable({
		data: result.data,
		columns,
		pageCount: result.totalPages,
		manualPagination: true,
		manualSorting: !!onSortingChange,
		onSortingChange: (updater) => {
			const newSorting =
				typeof updater === "function" ? updater(sorting) : updater;
			if (onSortingChange) {
				onSortingChange(newSorting);
			} else {
				setInternalSorting(newSorting);
			}
		},
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			rowSelection,
			pagination: {
				pageIndex: result.page - 1,
				pageSize: result.pageSize,
			},
		},
	});

	return (
		<div className="w-full">
			{onSearchChange && (
				<div className="py-4">
					<Input
						className="max-w-sm"
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder={searchPlaceholder}
						value={search ?? ""}
					/>
				</div>
			)}
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									data-state={row.getIsSelected() && "selected"}
									key={row.id}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-muted-foreground text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{result.totalCount} row(s) selected.
				</div>
				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">
						Page {result.page} of {result.totalPages}
					</span>
					<Button
						disabled={result.page <= 1}
						onClick={() => onPageChange(result.page - 1)}
						size="sm"
						variant="outline"
					>
						Previous
					</Button>
					<Button
						disabled={result.page >= result.totalPages}
						onClick={() => onPageChange(result.page + 1)}
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
