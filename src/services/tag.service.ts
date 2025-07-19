import { database } from "@/lib/database";
import { User } from "next-auth";

export const TagService = {
	getOrCreate: async (user: User, tagName: string) => {
		if (!user.id) throw new Error("User ID is required");

		return await database.tag.upsert({
			where: {
				name_userId: {
					name: tagName,
					userId: user.id,
				},
			},
			update: {}, // no update needed - just return existing if found
			create: {
				name: tagName,
				userId: user.id,
			},
		});
	},
};
