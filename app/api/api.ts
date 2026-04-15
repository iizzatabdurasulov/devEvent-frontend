import { events } from "@/constants/constants";
import { IEvent } from "@/types/index.types";

const resolveEventId = (id: number | string): number => {
  const numericId = typeof id === "string" ? Number(id) : id;
  if (Number.isNaN(numericId)) {
    throw new Error("Invalid event ID");
  }
  return numericId;
};

// Get events
export const getEvents = async (): Promise<IEvent[]> => {
  return events;
};

// Get event by ID
export const getEventById = async (id: number | string): Promise<IEvent> => {
  const numericId = resolveEventId(id);
  const event = events.find((e) => e.id === numericId);

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

// Create event
export const createEvent = async (
  event: Omit<IEvent, "id">,
): Promise<IEvent> => {
  const newId =
    events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
  const newEvent: IEvent = {
    ...event,
    id: newId,
    bookedEmails: event.bookedEmails ?? [],
  } as IEvent;

  events.push(newEvent);
  return newEvent;
};

// Update event
export const updateEvent = async (
  id: number | string,
  updatedData: Partial<IEvent>,
): Promise<IEvent> => {
  const numericId = resolveEventId(id);
  const index = events.findIndex((e) => e.id === numericId);

  if (index === -1) throw new Error("Event not found");

  events[index] = { ...events[index], ...updatedData };
  return events[index];
};

// Delete event
export const deleteEvent = async (id: number | string): Promise<IEvent> => {
  const numericId = resolveEventId(id);
  const index = events.findIndex((e) => e.id === numericId);

  if (index === -1) throw new Error("Event not found");

  const deleted = events.splice(index, 1)[0];
  return deleted;
};

// Book event
export const bookEvent = async (
  id: number | string,
  email: string,
): Promise<IEvent> => {
  const numericId = resolveEventId(id);
  const event = events.find((e) => e.id === numericId);

  if (!event) throw new Error("Event not found");

  if (event.bookedEmails.includes(email)) {
    throw new Error("Already booked");
  }

  event.bookedEmails.push(email);
  event.bookedSpots += 1;

  return event;
};
