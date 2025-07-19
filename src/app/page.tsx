import { ROUTES } from "@/config/routes";
import { redirect } from "next/navigation";
import HomePageContent from "../components/pages/home.page";
import { auth } from "@/config/auth";

const HomePage = async () => {
	const session = await auth();

	if (!session?.user) {
		redirect(ROUTES.auth.login);
	}

	return <HomePageContent user={session.user} />;
};

export default HomePage;
