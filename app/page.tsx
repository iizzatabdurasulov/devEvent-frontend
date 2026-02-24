import Image from "next/image";
import EventForm from "@/components/eventForm";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="">
      <div className="max-w-161  mx-auto mb-15  text-center ">
        <h1 className="capitalize font-semibold lg:text-[50px] text-[40px] leading-15 space-x-0.5 bg-[linear-gradient(179.01deg,#FFFFFF_0.85%,#00CBFF_484.31%)] bg-clip-text text-transparent">
          The Hub for Every Dev Event you can't miss!
        </h1>
        <p className="lg:text-[18px] text-[14px] leading-7 text-[#E7F2FF] pt-3 lg:pb-7 pb-5">
          Hackathons, Meetups, and Conferences, All in One Place
        </p>
        <Link
          href="/events"
          className=" lg:inline-flex flex gap-2 items-center justify-center
  font-medium text-[16px] leading-6 text-white
  px-7 py-3 border border-[#182830]
  rounded-full cursor-pointer"
        >
          Explore Events
          <Image
            alt="Arrow down"
            width={20}
            height={20}
            src="/icons/arrow-down.svg"
          />
        </Link>
      </div>

      <h2 className="md:text-start text-center font-bold text-[24px] leading-9 text-white mb-6 ">
        Featured Events
      </h2>
      <EventForm />
    </div>
  );
};

export default HomePage;
