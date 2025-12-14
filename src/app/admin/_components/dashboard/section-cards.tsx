import {
	ArrowUpRightIcon,
	SquareArrowUpRightIcon,
	TrendingDownIcon,
	TrendingUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function AdminDashboardSectionCards() {
	return (
		<div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 dark:*:data-[slot=card]:bg-card">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total stamps</CardDescription>
					<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
						123
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<ArrowUpRightIcon />
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">Total stamps count</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Stamps saved</CardDescription>
					<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
						123
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<ArrowUpRightIcon />
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">
						Stamps saved in the last month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>New Users</CardDescription>
					<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
						1,234
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<ArrowUpRightIcon />
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">
						New user in the last month
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active Reports</CardDescription>
					<CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
						12
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							<ArrowUpRightIcon />
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">
						Unsolved issues currently opened
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
