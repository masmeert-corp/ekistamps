"use client";

import {
	BubblesIcon,
	type LucideIcon,
	MessageSquareWarningIcon,
	PlusCircleIcon,
	Settings2Icon,
	StampIcon,
	TrainFrontIcon,
	TrainTrackIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
		title: "Dashboard",
		url: "#",
		icon: Settings2Icon,
	},
	{
		title: "Stamps",
		url: "#",
		icon: StampIcon,
	},
	{
		title: "Reports",
		url: "#",
		icon: MessageSquareWarningIcon,
	},
];

function AdminSidebarContent({
	items,
}: {
	items: AdminSidebarNavigationItem[];
}) {
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
						<Button
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<StampIcon />
							<span className="sr-only">Stamps</span>
						</Button>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
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
