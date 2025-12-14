import { registerFlag } from "@/flags";

import { AuthForm } from "../_components/auth-form";

export default async function LoginPage() {
	const registrationEnabled = await registerFlag();

	return (
		<div className="flex min-h-svh flex-col items-center justify-center p-6">
			<div className="w-full max-w-md">
				<AuthForm mode="login" registrationEnabled={registrationEnabled} />
			</div>
		</div>
	);
}
