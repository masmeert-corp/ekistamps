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
			className="bg-linear-to-b from-rose-50 via-rose-50 to-orange-50"
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
				<div className="flex flex-1 flex-col">
					<div className="flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							{children}
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
