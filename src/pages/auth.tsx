import RiLockPasswordFill from "~icons/ri/lock-password-fill";
import RiArrowRightLine from "~icons/ri/arrow-right-line";
import RiLoader5Fill from "~icons/ri/loader-5-fill";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { DotcreatorsLogoResponsive } from "@/components/DotcreatorsLogoResponsive";
import { NextSeo } from "next-seo";

export default function Auth() {
	const [accessToken, setAccessToken] = useState<string>();
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	async function checkToken() {
		try {
			setIsLoading(true);

			fetch(`${process.env.API_URL}auth?accessToken=${accessToken}`, {
				method: "POST",
			}).then(async (response) => {
				const data = await response.json();
				if (data.status === "success") {
					console.log("Success");

					fetch("/api/auth", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ accessToken: data.response }),
					})
						.then(() => {
							setIsLoading(false);
							setIsError(false);
							router.push("/");
						})
						.catch((e) => {
							setIsError(true);
							setIsLoading(false);
							throw new Error(
								"Failed to send access token to the server: " + e,
							);
						});
				} else {
					setIsError(true);
					setIsLoading(false);
				}
			});
		} catch (e) {
			setIsError(true);
			setIsLoading(false);
			console.error("Failed to send access token to the server:", e);
		}
	}
	return (
		<>
			<NextSeo
				title="Get access"
				description="Paste code below to access the site!"
				noindex={true}
				nofollow={true}
			/>
			<section className="md:grid h-screen w-full md:grid-cols-3 items-center justify-end">
				<div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-5 bg-dot-body">
					<DotcreatorsLogoResponsive width={40} height={38} />
					<p className="max-w-72 text-center text-zinc-400">
						Welcome to dotcreators! Please paste code below to access the site
					</p>
					<section className="h-15 flex flex-row items-center gap-5 rounded-2xl bg-dot-secondary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
						<RiLockPasswordFill />
						<input
							onChange={(e) => setAccessToken(e.target.value)}
							type="password"
							maxLength={7}
							placeholder="Input access token"
							className="h-full bg-transparent outline-none placeholder:text-sm placeholder:text-zinc-400"
						/>
						<button
							onClick={() => {
								checkToken();
							}}
						>
							{!isLoading ? (
								<RiArrowRightLine />
							) : (
								<RiLoader5Fill className="animate-spin" />
							)}
						</button>
					</section>
					{isError && (
						<p className="text-center text-sm text-dot-rose">Invalid code</p>
					)}
				</div>
				<Image
					src="/mesh-gradient.webp"
					alt="Background"
					width={1000}
					height={500}
					quality={80}
					priority={true}
					className="-z-10 md:block hidden col-span-2 h-screen w-full opacity-50 blur-md"
				/>
			</section>
		</>
	);
}

//   import DotcreatorsLogo from '@/components/DotcreatorsLogo';
// import RiDiscordFill from '~icons/ri/discord-fill';
// import Image from 'next/image';

// export default function Auth() {
//   return (
//     <>
//       <section className="grid h-screen w-full grid-cols-3 items-center justify-end">
//         <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center gap-5 bg-dot-body">
//           <DotcreatorsLogo />
//           <p className="max-w-72 text-center text-zinc-400">
//             Welcome to dotcreators dashboard! Please log-in to continue
//           </p>
//           <button className="flex flex-row items-center gap-3 rounded-2xl bg-dot-secondary p-3 px-5 transition-colors duration-200 ease-in-out md:hover:bg-[#5865F2]/70">
//             <RiDiscordFill />
//             Continue with Discord
//           </button>
//           <p className="max-w-72 text-center text-xs text-zinc-400">
//             This website uses cookies.
//           </p>
//         </div>
//         <Image
//           src="/meshGradient.png"
//           alt="Background"
//           width={1000}
//           height={500}
//           quality={100}
//           className="-z-10 col-span-2 h-screen w-full opacity-50"
//         />
//       </section>
//     </>
//   );
// }
// }
