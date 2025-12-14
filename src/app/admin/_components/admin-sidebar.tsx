"use client";

import {
	type LucideIcon,
	MessageSquareWarningIcon,
	PlusCircleIcon,
	StampIcon,
	TrainTrackIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

type AdminSidebarNavigationItem = {
	title: string;
	url: string;
	icon?: LucideIcon;
};

const SIDEBAR_NAVIGATION_ITEMS: AdminSidebarNavigationItem[] = [
	{
		title: "Stamps",
		url: "/admin",
		icon: StampIcon,
	},
	{
		title: "Reports",
		url: "/admin/reports",
		icon: MessageSquareWarningIcon,
	},
];

function AdminSidebarContent({
	items,
}: {
	items: AdminSidebarNavigationItem[];
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							tooltip="Quick Create"
						>
							<PlusCircleIcon />
							<span>Quick Create</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					{items.map((item) => {
						const isActive = pathname === item.url;

						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									isActive={isActive}
									tooltip={item.title}
								>
									<Link href={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
			className="**:data-[sidebar=sidebar]:bg-linear-to-b **:data-[sidebar=sidebar]:from-rose-50 **:data-[sidebar=sidebar]:via-rose-50 **:data-[sidebar=sidebar]:to-orange-50"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<a href="/">
								<TrainTrackIcon className="size-5!" />
								<span className="font-semibold text-base">Ekistamps</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<AdminSidebarContent items={SIDEBAR_NAVIGATION_ITEMS} />
			</SidebarContent>
			<SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
		</Sidebar>
	);
}
