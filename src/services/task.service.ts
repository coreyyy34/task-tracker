import { User } from "next-auth";
import { PublicTimeEntryWithTag } from "@/types/client";
import { TagService } from "./tag.service";
import { TimeEntryCreateInput } from "@/types/shared";
import { database } from "@/lib/database";

export const TaskService = {
	findAllByUser: async (user: User): Promise<PublicTimeEntryWithTag[]> => {
		if (!user.id) throw new Error("User ID is required");

		const entries = await database.timeEntry.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				startTime: "desc",
			},
			include: {
				tag: true,
			},
		});

		return entries.map((entry) => {
			return {
				id: entry.id,
				taskName: entry.taskName,
				startTime: entry.startTime.toISOString(),
				endTime: entry.endTime.toISOString(),
				notes: entry.notes || "",
				tag: {
					id: entry.tag.id,
					name: entry.tag.name,
				},
			};
		});
	},

	create: async (
		user: User,
		input: TimeEntryCreateInput
	): Promise<PublicTimeEntryWithTag> => {
		if (!user.id) throw new Error("User ID is required");

		const start = new Date(input.startDate);
		const end = new Date(input.endDate);
		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			throw new Error("Invalid startTime or endTime");
		}

		const tag = await TagService.getOrCreate(user, input.tagName);

		const entry = await database.timeEntry.create({
			data: {
				userId: user.id,
				taskName: input.taskName,
				tagId: tag.id,
				startTime: start,
				endTime: end,
				notes: input.notes,
			},
		});

		return {
			id: entry.id,
			taskName: entry.taskName,
			startTime: entry.startTime.toISOString(),
			endTime: entry.endTime.toISOString(),
			notes: entry.notes || "",
			tag: {
				id: tag.id,
				name: tag.name,
			},
		};
	},

	delete: async (user: User, id: number) => {
		if (!user.id) throw new Error("User ID is required");
		await database.timeEntry.delete({ where: { userId: user.id, id: id } });
	},
};
