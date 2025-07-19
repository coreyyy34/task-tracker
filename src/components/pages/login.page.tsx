"use client";

import { ROUTES } from "@/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faGoogle,
	faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/common/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

const providers = [
	{
		id: "github",
		name: "GitHub",
		color: "bg-gray-900 hover:bg-gray-800",
		icon: faGithub,
	},
	{
		id: "google",
		name: "Google",
		color: "bg-red-600 hover:bg-red-700",
		icon: faGoogle,
	},
	{
		id: "microsoft-entra-id",
		name: "Microsoft",
		color: "bg-blue-600 hover:bg-blue-700",
		icon: faMicrosoft,
	},
];

const LoginPageContent = () => {
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

	const handleSignIn = (provider: string) => {
		setLoadingProvider(provider);
		signIn(provider, { callbackUrl: ROUTES.dashboard });
	};

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Task Tracker
				</h1>
				<p className="text-gray-600">
					Sign in to start tracking your tasks.
				</p>
			</div>

			<div className="space-y-4">
				{providers.map((provider) => (
					<Button
						key={provider.id}
						className={`w-full ${provider.color}`}
						onClick={() => handleSignIn(provider.id)}
						loading={loadingProvider === provider.id}
						disabled={loadingProvider !== null}
					>
						<FontAwesomeIcon
							icon={provider.icon}
							className="w-5 h-5"
						/>
						<span>Continue with {provider.name}</span>
					</Button>
				))}
			</div>
		</div>
	);
};

export default LoginPageContent;
