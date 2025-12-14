import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/server/better-auth/server";
import { AdminHeader } from "./_components/admin-header";
import { AdminSidebar } from "./_components/admin-sidebar";

export default async function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await getSession();
	if (session?.user.role !== "admin") redirect("/");

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AdminSidebar variant="inset" />
			<SidebarInset>
				<AdminHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
