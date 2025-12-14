"use client";

import { Construction } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/server/better-auth/client";

type AuthMode = "login" | "register";

interface AuthFormProps extends React.ComponentProps<"div"> {
	mode: AuthMode;
	registrationEnabled?: boolean;
}

const CONFIG = {
	login: {
		title: "Welcome back",
		subtitle: "Sign in to your account",
		submitLabel: "Sign in",
		googleLabel: "Continue with Google",
		githubLabel: "Continue with GitHub",
		swapHint: "Don't have an account?",
		swapHref: "/sign-up",
		swapLabel: "Sign up",
		showForgotPassword: true,
		showName: false,
	},
	register: {
		title: "Create an account",
		subtitle: "Start planning your next adventure",
		submitLabel: "Create account",
		googleLabel: "Continue with Google",
		githubLabel: "Continue with GitHub",
		swapHint: "Already have an account?",
		swapHref: "/sign-in",
		swapLabel: "Sign in",
		showForgotPassword: false,
		showName: true,
	},
} as const;

function GoogleIcon() {
	return (
		<svg
			aria-hidden="true"
			className="mr-2 size-4"
			viewBox="0 0 488 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
				fill="currentColor"
			/>
		</svg>
	);
}

function GithubIcon() {
	return (
		<svg
			aria-hidden="true"
			className="mr-2 size-4"
			viewBox="0 0 496 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function AuthForm({
	mode,
	registrationEnabled = true,
	className,
	...props
}: AuthFormProps) {
	const config = CONFIG[mode];
	const showSignUpLink = registrationEnabled;
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [lastMethodUsed, setLastMethodUsed] = useState<string | null>(null);

	useEffect(() => {
		setLastMethodUsed(authClient.getLastUsedLoginMethod());
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			if (mode === "register") {
				const result = await authClient.signUp.email({
					name,
					email,
					password,
				});
				if (result.error) {
					setError(result.error.message ?? "Failed to create account");
					return;
				}
			} else {
				const result = await authClient.signIn.email({
					email,
					password,
				});
				if (result.error) {
					setError(result.error.message ?? "Invalid email or password");
					return;
				}
			}
			router.push("/");
			router.refresh();
		} catch (error) {
			console.error(error);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	async function handleProvider(provider: "google" | "github") {
		setIsLoading(true);
		setError("");
		try {
			await authClient.signIn.social({
				provider,
				errorCallbackURL: mode === "login" ? "/sign-in" : "/sign-up",
			});
		} catch (error) {
			console.error(error);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<div className="text-center">
				<h1 className="font-serif text-5xl text-foreground tracking-tight">
					{config.title}
				</h1>
				<p className="mt-2 text-muted-foreground">{config.subtitle}</p>
			</div>

			{!registrationEnabled && mode === "login" && (
				<Alert>
					<Construction className="size-4" />
					<AlertTitle>App in development</AlertTitle>
					<AlertDescription>
						Registration and social sign-ins are currently disabled.
					</AlertDescription>
				</Alert>
			)}

			<div className="rounded-2xl border border-border/50 bg-white p-8">
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					{error && (
						<div className="rounded-lg bg-red-50 p-3 text-red-600 text-sm">
							{error}
						</div>
					)}

					{config.showName && (
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								disabled={isLoading}
								id="name"
								onChange={(e) => setName(e.target.value)}
								placeholder="Your name"
								required
								type="text"
								value={name}
							/>
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							disabled={isLoading}
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
							type="email"
							value={email}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							{config.showForgotPassword && (
								<Link
									className="text-muted-foreground text-xs transition-colors hover:text-foreground"
									href="/forgot-password"
								>
									Forgot password?
								</Link>
							)}
						</div>
						<Input
							disabled={isLoading}
							id="password"
							minLength={8}
							onChange={(e) => setPassword(e.target.value)}
							required
							type="password"
							value={password}
						/>
					</div>

					<Button className="relative mt-2" disabled={isLoading} type="submit">
						{isLoading ? "Loading..." : config.submitLabel}
					</Button>

					<div className="relative my-2">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-border/50 border-t" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-white px-3 text-muted-foreground">or</span>
						</div>
					</div>

					<Button
						className="relative"
						disabled={isLoading || !registrationEnabled}
						onClick={() => handleProvider("google")}
						type="button"
						variant="outline"
					>
						{lastMethodUsed === "google" &&
							!isLoading &&
							registrationEnabled && (
								<Badge className="-top-2 -right-2 absolute px-1.5 py-0 text-[10px]">
									Last used
								</Badge>
							)}
						<GoogleIcon />
						{config.googleLabel}
					</Button>

					<Button
						className="relative"
						disabled={isLoading || !registrationEnabled}
						onClick={() => handleProvider("github")}
						type="button"
						variant="outline"
					>
						{lastMethodUsed === "github" &&
							!isLoading &&
							registrationEnabled && (
								<Badge className="-top-2 -right-2 absolute px-1.5 py-0 text-[10px]">
									Last used
								</Badge>
							)}
						<GithubIcon />
						{config.githubLabel}
					</Button>
				</form>
			</div>

			{(mode === "register" || showSignUpLink) && (
				<p className="text-center text-muted-foreground text-sm">
					{config.swapHint}{" "}
					<Link
						className="text-foreground underline-offset-4 hover:underline"
						href={config.swapHref}
					>
						{config.swapLabel}
					</Link>
				</p>
			)}

			<p className="text-center text-muted-foreground text-xs">
				By continuing, you agree to our{" "}
				<Link className="underline-offset-4 hover:underline" href="/terms">
					Terms
				</Link>{" "}
				and{" "}
				<Link className="underline-offset-4 hover:underline" href="/privacy">
					Privacy Policy
				</Link>
			</p>
		</div>
	);
}
