import { redirect } from "next/navigation";

import { getSession } from "@/server/better-auth/server";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (session) redirect("/map");

  return <div>{children}</div>;
}
