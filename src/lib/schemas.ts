import * as yup from "yup";

const taskNameSchema = yup
	.string()
	.required("Task name is required")
	.min(3, "Task name should be at least 3 characters long")
	.max(48, "Task name should not exceed 48 characters");

const tagNameSchema = yup
	.string()
	.required("Tag name is required")
	.max(32, "Tag name should not exceed 32 characters");

const notesSchema = yup
	.string()
	.required()
	.nullable()
	.transform((value) => (value === "" ? null : value))
	.max(512, "Notes should not exceed 512 characters");

const isoDateRegex =
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export const clientTimeEntrySchema = yup.object({
	taskName: taskNameSchema,
	tagName: tagNameSchema,
	notes: yup
		.string()
		.required()
		.nullable()
		.transform((value) => (value.trim() === "" ? null : value))
		.max(512, "Notes should not exceed 512 characters"),
});

export const timeEntrySchema = yup.object({
	taskName: taskNameSchema,
	tagName: tagNameSchema,
	notes: notesSchema,

	startDate: yup
		.string()
		.required("Start time is required")
		.matches(isoDateRegex, "Must be a valid ISO 8601 date string"),

	endDate: yup
		.string()
		.required("End time is required")
		.matches(isoDateRegex, "Must be a valid ISO 8601 date string")
		.test(
			"is-end-time-after-start-time",
			"End time must be later than start time",
			(value, context) => {
				const { startDate } = context.parent;
				return (
					startDate && value && new Date(value) > new Date(startDate)
				);
			}
		),

	tagValidation: yup
		.object()
		.test(
			"tag-required",
			"Either tag name or tag ID must be provided, but not both or neither.",
			(_, context) => {
				const { tagName, tagId } = context.parent;
				return (tagName && !tagId) || (!tagName && tagId);
			}
		),
});
