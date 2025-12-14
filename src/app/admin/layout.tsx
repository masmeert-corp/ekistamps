import { redirect } from "next/navigation";

import { getSession } from "@/server/better-auth/server";

export default async function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await getSession();
	if (session?.user.role !== "admin") redirect("/map");

	return <div className="w-full p-4">{children}</div>;
}
