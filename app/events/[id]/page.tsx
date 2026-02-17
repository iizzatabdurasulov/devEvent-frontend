import { getEventById } from "@/app/api/api";
import Bokking from "@/components/booking";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductDetail = async ({ params }: Props) => {
  const { id } = await params;

  let event;

  try {
    event = await getEventById(id);
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }

  if (!event) {
    notFound();
  }

  const getEventImage = (images?: string[]): string => {
    if (images && images.length > 0 && images[0]) {
      const img = images[0];
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
      }
    }
    return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop";
  };

  return (
    <div>
      <div className="flex items-center md:flex-row flex-col gap-y-7.5 justify-between">
        <div className="md:w-[60%] w-full">
          <h1 className="capitalize font-semibold lg:text-[50px] text-[40px] leading-15 space-x-0.5 bg-[linear-gradient(179.01deg,#FFFFFF_0.85%,#00CBFF_484.31%)] bg-clip-text text-transparent">
            {event.title}
          </h1>
          <p className="lg:text-[18px] text-[14px] leading-7 text-[#E7F2FF] pt-3 lg:pb-7 pb-5">
            {event.desc}
          </p>
          <Image
            src={getEventImage(event.images)}
            alt={event.title || "Event image"}
            width={810}
            height={457}
            className="lg:w-202.5 lg:h-114.25 w-full h-auto rounded-[14px]"
            unoptimized
            priority
          />

          {/* Event Details */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300">{event.overview}</p>
          </div>

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Agenda</h2>
              <div className="space-y-3">
                {event.agenda.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <span className="text-blue-400 font-medium">
                      {item.time}
                    </span>
                    <span className="text-gray-300">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Organizer */}
          {event.aboutOrganizer && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">About Organizer</h2>
              <p className="text-gray-300">{event.aboutOrganizer}</p>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Tags</h2>

            <ul className="flex gap-5 items-center">
              {event.tags.map((tag) => {
                return (
                  <li
                    className="p-2 rounded-md bg-gray-700 text-white text-[14px] font-semibold  text-center"
                    key={tag}
                  >
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Book your spot */}
        <div className="md:w-[30%] w-full">
          <Bokking eventId={event._id} bookedSpots={event.bookedSpots} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
