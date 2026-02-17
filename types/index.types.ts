export interface IEventDetail {
  id: number;
  value: string;
}

export interface IAgendaItem {
  id: number;
  time: string;
  title: string;
}

export interface IEvent {
  _id?: string;        // ✅ MongoDB ID (optional)
  id?: number;         // ✅ Old ID (backward compatibility)
  title: string;
  location: string;
  date: string;
  time: string;
  images: string[];
  desc: string;
  overview: string;
  eventDetails: IEventDetail[];
  agenda: IAgendaItem[];
  aboutOrganizer: string;
  tags: string[];
  bookedSpots: number;
  createdAt?: string;  // ✅ MongoDB timestamps
  updatedAt?: string;
}

export interface IMenuLink {
  id: number;
  title: string;
  path: string;
}