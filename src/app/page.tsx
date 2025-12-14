import Link from "next/link";

import { getSession } from "@/server/better-auth/server";
import { AdminButton } from "./_components/admin-button";
import { LogoutButton } from "./_components/logout-button";

export default async function Home() {
	const session = await getSession();

	return (
		<div>
			<h1>Hello world</h1>
			{session ? (
				<div>
					<AdminButton />
					<LogoutButton />
				</div>
			) : (
				<Link href="/sign-in">Get started</Link>
			)}
		</div>
	);
}
