import { redirect } from "next/navigation";

import { registerFlag } from "@/flags";

import { AuthForm } from "../_components/auth-form";

export default async function RegisterPage() {
	const registrationEnabled = await registerFlag();

	if (!registrationEnabled) {
		redirect("/sign-in");
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center p-6">
			<div className="w-full max-w-md">
				<AuthForm mode="register" />
			</div>
		</div>
	);
}
