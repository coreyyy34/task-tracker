import LoginPageContent from "@/components/pages/login.page";
import { auth } from "@/config/auth";
import { ROUTES } from "@/config/routes";
import { redirect } from "next/navigation";
import AuthErrorPageContent from "../../../components/page";

const LoginPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const session = await auth();

	if (session?.user) {
		redirect(ROUTES.dashboard);
	}

	const error = (await searchParams).error;
	if (error) {
		const errorMessage = Array.isArray(error) ? error[0] : error;
		return <AuthErrorPageContent error={errorMessage} />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
			<LoginPageContent />
		</div>
	);
};

export default LoginPage;
