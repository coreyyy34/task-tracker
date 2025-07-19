import Logger from "@/lib/logger";
import { withAuthHandler } from "@/lib/with-auth-handler";
import { TimeEntryCreateInput } from "@/types/shared";
import { timeEntrySchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { TaskService } from "@/services/task.service";

export const GET = withAuthHandler(async (user) => {
	try {
		const entries = await TaskService.findAllByUser(user);

		Logger.info(
			"getTimeEntries.success",
			"Fetched time entries successfully",
			{
				entryCount: entries.length,
				userId: user.id,
			}
		);

		return NextResponse.json(entries);
	} catch (error) {
		Logger.error("getTimeEntries.error", "Failed to fetch time entries", {
			userId: user.id,
			error,
		});
		throw error;
	}
});

export const POST = withAuthHandler(async (user, request: NextRequest) => {
	try {
		const input = await request.json();
		Logger.info(
			"createTimeEntry.inputReceived",
			"Received time entry input",
			{
				userId: user.id,
				input,
			}
		);

		await timeEntrySchema.validate(input);

		const timeEntry = input as TimeEntryCreateInput;
		const result = await TaskService.create(user, timeEntry);

		Logger.info(
			"createTimeEntry.success",
			"Time entry created successfully",
			{
				userId: user.id,
				entryId: result.id,
			}
		);

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		Logger.error("createTimeEntry.error", "Failed to create time entry", {
			userId: user.id,
			error,
		});
		throw error;
	}
});
