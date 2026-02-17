"use client";

import EventsDashboard from "@/components/eventsDashboard";
import { useRouter } from "next/navigation";

const AdminManagement = () => {
  const router = useRouter();
  return (
    <div>
      <header className="flex lg:justify-between lg:flex-row flex-col  justify-center items-center mb-6">
        <h1 className="capitalize font-semibold lg:text-[50px] text-[40px] leading-15 space-x-0.5 bg-[linear-gradient(179.01deg,#FFFFFF_0.85%,#00CBFF_484.31%)] bg-clip-text text-transparent">
          Event Management
        </h1>
        <button
          onClick={() => router.push(`/createEvent`)}
          className=" lg:w-auto w-full btn"
        >
          Add new Event
        </button>
      </header>
      <EventsDashboard isAdmin={true} />
    </div>
  );
};

export default AdminManagement;
