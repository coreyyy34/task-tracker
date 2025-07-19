import { Prisma } from "@/generated/prisma";
import { withAuthHandler } from "@/lib/with-auth-handler";
import { NextRequest, NextResponse } from "next/server";
import isNumber from "is-number";
import Logger from "@/lib/logger";
import { TaskService } from "@/services/task.service";

export const DELETE = withAuthHandler(async (user, _: NextRequest, context) => {
	const { id: rawId } = await context.params;

	if (!isValidId(rawId)) {
		Logger.warn(
			"deleteTimeEntry.invalidId",
			"Task ID is malformed or invalid",
			{
				rawId,
				userId: user.id,
			}
		);
		return taskNotFoundResponse();
	}

	const id = Number(rawId);

	try {
		await TaskService.delete(user, id);
		Logger.info("deleteTimeEntry.success", "Task deleted successfully", {
			taskId: id,
			userId: user.id,
		});
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			Logger.warn(
				"deleteTimeEntry.notFound",
				"No matching task found for deletion",
				{
					taskId: id,
					userId: user.id,
				}
			);
			return taskNotFoundResponse();
		}

		Logger.error(
			"deleteTimeEntry.error",
			"Unexpected error during task deletion",
			{
				taskId: id,
				userId: user.id,
				error,
			}
		);
		throw error;
	}
});

const isValidId = (id: string): boolean => {
	return isNumber(id) && Number.isInteger(Number(id)) && Number(id) > 0;
};

const taskNotFoundResponse = () =>
	NextResponse.json({ error: "Task not found" }, { status: 404 });
