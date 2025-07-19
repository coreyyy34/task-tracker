import { auth } from "@/config/auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "next-auth";

type Handler = (
	user: User,
	req: NextRequest,
	context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export const withAuthHandler = (handler: Handler) => {
	return async (
		req: NextRequest,
		context: { params: Promise<Record<string, string>> }
	): Promise<NextResponse> => {
		try {
			const session = await auth();
			const user = session?.user;

			if (!user?.id) {
				return NextResponse.json(
					{ error: "Unauthorized" },
					{ status: 401 }
				);
			}

			return await handler(user, req, context);
		} catch (error) {
			console.error("Error in withAuthHandler:", error);
			return NextResponse.json(
				{ error: "An unexpected error occurred." },
				{ status: 500 }
			);
		}
	};
};
