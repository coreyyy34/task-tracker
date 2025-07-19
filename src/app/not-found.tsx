import { ROUTES } from "@/config/routes";
import { Button } from "@/components/common/button";
import Link from "next/link";
import CardLayout from "@/components/common/card-layout";

const NotFoundPageContent = () => {
	return (
		<CardLayout
			subtitle={
				<div className="text-6xl font-bold text-gray-300">404</div>
			}
			description="The page you are looking for doesn't exist or has been moved."
			errorCode="404 - Not Found"
		>
			<div>
				<Link href={ROUTES.dashboard || "/"}>
					<Button className="w-full">
						<span>Go to Dashboard</span>
					</Button>
				</Link>
			</div>

			<div>
				<Link href="/">
					<Button variant="outline" className="w-full bg-transparent">
						<span>Back to Home</span>
					</Button>
				</Link>
			</div>
		</CardLayout>
	);
};

export default NotFoundPageContent;
