"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { StampSelect } from "@/server/db/zod";

function ActionsCell({ stamp }: { stamp: StampSelect }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="h-8 w-8 p-0" variant="ghost">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View details</DropdownMenuItem>
				<DropdownMenuItem>Edit stamp</DropdownMenuItem>
				{stamp.imageUrl && <DropdownMenuItem>View image</DropdownMenuItem>}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const statusVariants: Record<
	StampSelect["status"],
	"default" | "secondary" | "destructive"
> = {
	available: "default",
	limited: "secondary",
	discontinued: "destructive",
};

const shapeLabels: Record<NonNullable<StampSelect["shape"]>, string> = {
	circle: "Circle",
	square: "Square",
	hexagon: "Hexagon",
	pentagon: "Pentagon",
	other: "Other",
};

export const columns: ColumnDef<StampSelect>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				aria-label="Select all"
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				variant="ghost"
			>
				Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const nameEn = row.original.nameEn;
			if (!nameEn) return <span className="text-muted-foreground">—</span>;
			return <span className="font-medium">{nameEn}</span>;
		},
	},
	{
		accessorKey: "locationName",
		header: ({ column }) => (
			<Button
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				variant="ghost"
			>
				Location
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const locationEn = row.original.locationNameEn;
			if (!locationEn) return <span className="text-muted-foreground">—</span>;
			return <span>{locationEn}</span>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as StampSelect["status"];
			return (
				<Badge className="capitalize" variant={statusVariants[status]}>
					{status}
				</Badge>
			);
		},
		filterFn: (row, id, value) => value.includes(row.getValue(id)),
	},
	{
		accessorKey: "shape",
		header: "Shape",
		cell: ({ row }) => {
			const shape = row.getValue("shape") as StampSelect["shape"];
			if (!shape) return <span className="text-muted-foreground">—</span>;
			return <span className="capitalize">{shapeLabels[shape]}</span>;
		},
		filterFn: (row, id, value) => value.includes(row.getValue(id)),
	},
	{
		accessorKey: "sizeCm",
		header: "Size",
		cell: ({ row }) => {
			const size = row.getValue("sizeCm") as string | null;
			if (!size) return <span className="text-muted-foreground">—</span>;
			return <span>{size} cm</span>;
		},
	},
	{
		accessorKey: "color",
		header: "Color",
		cell: ({ row }) => {
			const colorEn = row.original.colorEn;
			if (!colorEn) return <span className="text-muted-foreground">—</span>;
			return <span>{colorEn}</span>;
		},
	},
	{
		accessorKey: "availableFrom",
		header: ({ column }) => (
			<Button
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				variant="ghost"
			>
				Available From
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("availableFrom") as string | null;
			if (!date) return <span className="text-muted-foreground">—</span>;
			return <span>{new Date(date).toLocaleDateString()}</span>;
		},
	},
	{
		accessorKey: "availableUntil",
		header: "Available Until",
		cell: ({ row }) => {
			const date = row.getValue("availableUntil") as string | null;
			if (!date) return <span className="text-muted-foreground">—</span>;
			return <span>{new Date(date).toLocaleDateString()}</span>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => (
			<Button
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				variant="ghost"
			>
				Updated
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("updatedAt") as Date;
			return <span>{date.toLocaleDateString()}</span>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => <ActionsCell stamp={row.original} />,
	},
];
