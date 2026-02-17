import { z } from "zod";

// Event Detail
export const EventDetailSchema = z.object({
  id: z.number(),
  value: z.string().min(1, "Detail value is required"),
});

export const AgendaItemSchema = z.object({
  id: z.number(),
  time: z.string().min(1, "Vaqt kiritish shart"),
  title: z.string().min(3, "Agenda title min 3 ta harf"),
});

export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title kiritish shart")
    .min(5, "Title kamida 5 ta harf bo'lishi kerak"),

  location: z
    .string()
    .min(1, "Location kiritish shart")
    .min(3, "Location kamida 3 ta harf bo'lishi kerak"),

  date: z
    .string()
    .min(1, "Sana tanlash shart")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Sana formati noto'g'ri (YYYY-MM-DD)"),

  time: z.string().min(1, "Vaqt kiritish shart"),

  images: z.array(z.string()).optional().default([]),

  desc: z
    .string()
    .min(1, "Description kiritish shart")
    .min(10, "Description kamida 10 ta harf bo'lishi kerak"),

  overview: z.string().min(1, "Overview kiritish shart"),

  eventDetails: z.array(EventDetailSchema).optional().default([]),

  agenda: z.array(AgendaItemSchema).optional().default([]),

  aboutOrganizer: z.string().min(1, "Organizer haqida ma'lumot kiritish shart"),

  tags: z
    .array(z.string().min(1))
    .min(1, "Kamida 1 ta tag bo'lishi kerak")
    .default(["event"]),
});
