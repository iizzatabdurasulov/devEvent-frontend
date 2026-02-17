  "use client";
  import React, { useEffect, useState } from "react";
  import EventItem from "./eventItem";
  import { IEvent } from "@/types/index.types";
  import { getEvents } from "@/app/api/api";

  const EventForm = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      loadEvents();
    }, []);

    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError("Error loading events. Please try again.");
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-100">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={loadEvents}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-100">
          <p className="text-gray-400 text-lg">Events not found</p>
        </div>
      );
    }

    return (
      <div className="grid justify-items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6.25 gap-y-15">
        {events.map((data) => (
          <EventItem key={data._id} data={data} />
        ))}
      </div>
    );
  };

  export default EventForm;