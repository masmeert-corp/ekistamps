"use client";

import { ConstructionIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AdminButton() {
	return (
		<Link as-child="true" href="/admin">
			<Button variant="outline">
				<ConstructionIcon className="size-4" />
				Dashboard
			</Button>
		</Link>
	);
}
