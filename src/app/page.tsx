import Link from "next/link";

export default async function Home() {
	return (
		<div>
			<h1>Hello world</h1>
			<Link href="/sign-in">Get started</Link>
			<Link href="/admin">Admin dashboard</Link>
		</div>
	);
}
