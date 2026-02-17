import { IEvent } from "@/types/index.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: IEvent;
}

const EventItem = ({ data }: Props) => {
  const getEventImage = (): string => {
    if (data.images && data.images.length > 0) {
      const firstImage = data.images[0];

      if (
        firstImage.startsWith("http://") ||
        firstImage.startsWith("https://")
      ) {
        return firstImage;
      }
    }

    return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format";
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Sana ko'rsatilmagan";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("uz-UZ", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const eventId = data._id

  return (
    <Link
      href={`/events/${eventId}`}
      className="block hover:opacity-90 transition-opacity"
    >
      <div className="relative">
        <Image
          src={getEventImage()}
          alt={data.title || "Event image"}
          width={410}
          height={300}
          className="lg:w-102.5 lg:h-75 w-full h-auto rounded-[14px] object-cover"
          unoptimized
          priority={false}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format";
          }}
        />
      </div>

      <h3 className="font-secondary text-[#BDBDBD] text-[14px] leading-4.5 space-x-[-10%] font-light mt-4 flex items-center gap-2">
        <Image
          src="/icons/pin.svg"
          alt="location icon"
          width={18}
          height={18}
        />
        {data.location || "Location not specified"}
      </h3>

      <h2 className="my-3 font-semibold text-[20px] text-white leading-7 line-clamp-2">
        {data.title}
      </h2>

      <div className="flex gap-2 items-center">
        <h4 className="text-[#BDBDBD] text-[14px] font-secondary leading-4.5 font-light space-x-[-10%]">
          {formatDate(data.date)}
        </h4>
        <Image
          src="/icons/line.svg"
          width={8}
          height={8}
          alt="line"
          className="w-8 h-4"
        />
        <h4 className="text-[#BDBDBD] font-secondary text-[14px] leading-4.5 font-light space-x-[-10%]">
          {data.time || "TBA"}
        </h4>
      </div>
    </Link>
  );
};

export default EventItem;
