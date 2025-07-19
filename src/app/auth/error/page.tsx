import AuthErrorPageContent from "@/components/page";

const LoginPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const error = (await searchParams).error;
	const errorMessage = Array.isArray(error) ? error[0] : error;
	return <AuthErrorPageContent error={errorMessage} />;
};

export default LoginPage;
