import { IEvent } from "@/types/index.types";

const API_URL = "https://devevent-backend-production.up.railway.app";

// Get events
export const getEvents = async (): Promise<IEvent[]> => {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};

// Get event by ID
export const getEventById = async (id: string): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/${id}`);
  if (!response.ok) throw new Error("Failed to fetch event");
  return response.json();
};

// Create event
export const createEvent = async (
  event: Omit<IEvent, "_id" | "createdAt" | "updatedAt">,
): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to create event");
  return response.json();
};

// Update event
export const updateEvent = async (
  id: string,
  event: Partial<IEvent>,
): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return response.json();
};

// Delete event
export const deleteEvent = async (id: string): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
  return response.json();
};

// Upload image
export const uploadImage = async (base64: string): Promise<string> => {
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64 }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.url; // Supabase public URL
};

// Delete image
export const deleteImage = async (fileName: string): Promise<void> => {
  const response = await fetch(`${API_URL}/upload`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
};

// Book event
export const bookEvent = async (id: string, email: string): Promise<IEvent> => {
  const response = await fetch(`${API_URL}/events/${id}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to book event");
  }

  return response.json();
};
