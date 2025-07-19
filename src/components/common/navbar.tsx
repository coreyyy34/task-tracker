"use client";

import { CheckSquare, LogOut, User as UserIcon } from "lucide-react";
import { User } from "next-auth";
import { FC } from "react";
import { Button } from "./button";

import { signOut } from "next-auth/react";

interface NavbarProps {
	user: User;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
	const handleLogout = async () => {
		await signOut();
	};

	return (
		<nav className="bg-blue-500 shadow-xl border-b border-slate-700">
			<div className="container mx-auto flex items-center justify-between px-8 py-4">
				<div className="flex items-center space-x-3">
					<CheckSquare className="h-8 w-8 text-white" />
					<div className="text-white font-bold text-2xl tracking-wide">
						Task Tracker
					</div>
				</div>

				<div className="items-center gap-6 ">
					<div className="flex items-center gap-3">
						{user.image ? (
							// using <img> instead of next/image because sources (GitHub, Google, Microsoft) are already optimized.
							// next/image also requires domain config.
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={user.image}
								alt="User profile image"
								height={32}
								width={32}
								className="rounded-full"
							/>
						) : (
							<div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
								<UserIcon className="w-4 h-4 text-white" />
							</div>
						)}

						<span className="text-white font-medium">
							{user.name}
						</span>

						<Button
							variant="ghost"
							size="icon"
							onClick={handleLogout}
						>
							<LogOut className="w-4 h-4 text-white" />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
