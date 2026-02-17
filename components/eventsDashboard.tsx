"use client";

import { deleteEvent, getEvents } from "@/app/api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IEvent } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EventsDashboardProps {
  isAdmin?: boolean;
}

const EventsDashboard: React.FC<EventsDashboardProps> = ({
  isAdmin = false,
}) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // ✅ qo'shildi
  const router = useRouter();
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Error fetching events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = (id?: string) => {
    if (!id) {
      toast.error("Event id not found");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );
    if (confirmed) {
      confirmDelete(id);
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      setDeletingId(id);
      console.log("Deleting event with ID:", id);
      const response = await deleteEvent(id);
      console.log("Delete response:", response);

      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event successfully deleted");
    } catch (err: any) {
      console.error("Error deleting event:", err);
      console.error("Error message:", err?.message);
      console.error("Error response:", err?.response?.data);
      toast.error(
        err?.response?.data?.message ||
          "Error deleting event. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={fetchEvents}>Try again</button>
      </div>
    );
  }

  if (events.length === 0) {
    return <div>Events not found</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Events</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Booked spot</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((item) => (
            <TableRow
              onClick={() => router.push(`/events/${item._id}`)}
              key={item._id}
              className="cursor-pointer"
            >
              <TableCell className={cn("flex items-center gap-4")}>
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>{" "}
                {item.title}
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.bookedSpots || 0}</TableCell>
              {isAdmin && (
                <TableCell className={cn("space-x-2")}>
                  <Link
                    href={`/adminManagement/edit/event/${item._id}`}
                    className="hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="text-red-400 cursor-pointer hover:underline disabled:opacity-50"
                  >
                    {deletingId === item._id ? "Deleting..." : "Delete"}
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsDashboard;
