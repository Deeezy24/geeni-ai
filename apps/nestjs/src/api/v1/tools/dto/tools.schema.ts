import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const SummaryTone = z.enum(["Simple", "Detailed", "Bullet Points"]);
const SummaryLength = z.coerce.number().min(25).max(75);
const SummaryType = z.enum(["text", "url", "file", "audio", "image", "video"]);

const ToolsSchema = z
  .object({
    summaryTone: SummaryTone,
    summaryLength: SummaryLength,
    summaryType: SummaryType,
    inputText: z.string().optional(),
    inputUrl: z.string().url().optional(),
    selectTime: z.enum(["Specific Time", "Full Video"]).optional(),
    startTimestamp: z.string().optional().default("00:00:00"),
    endTimestamp: z.string().optional().default("00:00:00"),
    workspaceId: z.string(),
    modelId: z.string(),
    chatId: z.string(),
  })
  .superRefine((data, ctx) => {
    switch (data.summaryType) {
      case "text":
        if (!data.inputText || data.inputText.trim() === "") {
          ctx.addIssue({
            path: ["inputText"],
            code: z.ZodIssueCode.custom,
            message: "Text is required for text summary",
          });
        }
        break;
      case "url":
        if (!data.inputUrl || data.inputUrl.trim() === "") {
          ctx.addIssue({
            path: ["inputUrl"],
            code: z.ZodIssueCode.custom,
            message: "URL is required for URL summary",
          });
        }
        break;
      case "file":
      case "audio":
      case "image":
      case "video":
        if (data.selectTime === "Specific Time" && (!data.startTimestamp || !data.endTimestamp)) {
          ctx.addIssue({
            path: ["startTimestamp", "endTimestamp"],
            code: z.ZodIssueCode.custom,
            message: "Start and end timestamps are required for specific time",
          });
        }
        break;
    }
  });

const GetToolsSchema = z.object({
  model: z.string().optional(),
  isPopular: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val; // Let Zod throw an error if it's invalid
  }, z.boolean().optional()),
});

class ToolsSummaryDto extends createZodDto(ToolsSchema) {}
class GetToolsDto extends createZodDto(GetToolsSchema) {}

export { GetToolsDto, ToolsSummaryDto };
