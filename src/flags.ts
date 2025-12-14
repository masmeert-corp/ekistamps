import { flag } from "flags/next";

import { Config } from "@/config";

export const registerFlag = flag({
	key: "register",
	defaultValue: false,
	decide() {
		return Config.REGISTRATION_ENABLED;
	},
});
