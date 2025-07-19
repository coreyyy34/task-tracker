import { ROUTES } from "@/config/routes";
import { Button } from "@/components/common/button";
import Link from "next/link";
import CardLayout from "./common/card-layout";

interface AuthErrorPageProps {
	error?: string;
}

const getErrorMessage = (error?: string) => {
	switch (error) {
		case "Configuration":
			return {
				title: "Server Configuration Error",
				description:
					"There is a problem with the server configuration. Please contact support.",
			};
		case "AccessDenied":
			return {
				title: "Access Denied",
				description:
					"You do not have permission to sign in. Please contact an administrator.",
			};
		case "Verification":
			return {
				title: "Verification Error",
				description:
					"The verification token has expired or has already been used.",
			};
		case "OAuthSignin":
		case "OAuthCallback":
		case "OAuthCreateAccount":
		case "EmailCreateAccount":
		case "Callback":
			return {
				title: "Authentication Error",
				description:
					"There was an error during the authentication process. Please try again.",
			};
		case "OAuthAccountNotLinked":
			return {
				title: "Account Not Linked",
				description:
					"This account is already associated with another sign-in method.",
			};
		case "EmailSignin":
			return {
				title: "Email Sign-in Error",
				description:
					"Unable to send verification email. Please check your email address.",
			};
		case "CredentialsSignin":
			return {
				title: "Invalid Credentials",
				description:
					"The credentials you provided are incorrect. Please try again.",
			};
		case "SessionRequired":
			return {
				title: "Session Required",
				description: "You must be signed in to access this page.",
			};
		default:
			return {
				title: "Authentication Error",
				description:
					"An unexpected error occurred during authentication. Please try again.",
			};
	}
};

const AuthErrorPageContent = ({ error }: AuthErrorPageProps) => {
	const errorInfo = getErrorMessage(error);

	return (
		<CardLayout description={errorInfo.description} errorCode={error}>
			<Link href={ROUTES.auth.login}>
				<Button className="w-full">
					<span>Sign In with Different Method</span>
				</Button>
			</Link>
		</CardLayout>
	);
};

export default AuthErrorPageContent;
