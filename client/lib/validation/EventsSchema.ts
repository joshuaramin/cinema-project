import * as z from "zod";

export const EventsScehma = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Event location is required"),
  startDate: z.date().min(new Date()),
  endDate: z.date().min(new Date()),
});
