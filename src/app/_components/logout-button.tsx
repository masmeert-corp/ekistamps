"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/better-auth/client";

export function LogoutButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function handleLogout() {
		setIsLoading(true);
		await authClient.signOut();
		router.push("/");
		router.refresh();
	}

	return (
		<Button disabled={isLoading} onClick={handleLogout} variant="outline">
			<LogOutIcon className="size-4" />
			{isLoading ? "Signing out..." : "Sign out"}
		</Button>
	);
}
