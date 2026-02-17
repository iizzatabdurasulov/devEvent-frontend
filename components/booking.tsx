"use client";

import { bookEvent, updateEvent } from "@/app/api/api";
import { useState } from "react";

interface BookingProps {
  eventId?: string;
  bookedSpots: number;
}

const Booking = ({ eventId, bookedSpots }: BookingProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventId) {
      setMessage("Event id not found");
      return;
    }

    if (!email || !email.includes("@")) {
      setMessage("Enter correct email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await bookEvent(eventId, email); 

      setMessage("✅ Your place has been booked successfully!");
      setEmail("");

      setTimeout(() => setMessage(""), 3000);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      setMessage(`❌ ${error.message || "Error occurred. Please try again"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[30%] w-full md:fixed md:right-20 md:top-[45%] bg-[#0D161A] border border-[#182830] rounded-[10px] p-6">
      <h5 className="font-bold text-[24px] leading-9 text-white mb-2">
        Book your spot
      </h5>

      <p className="text-gray-400 text-sm mb-4">
        👥 {bookedSpots || 0} people booked
      </p>

      <form className="w-full" onSubmit={handleSubmit}>
        <label className="text-[#E7F2FF] text-[16px] leading-6" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          className="w-full py-3 px-4.5 bg-[#182830] border border-[#243B47] rounded-lg mt-2.5 mb-4.5 text-white placeholder:text-gray-500"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        {message && (
          <p
            className={`text-sm mb-3 ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
