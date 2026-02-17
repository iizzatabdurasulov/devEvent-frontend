"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CreateEventSchema } from "@/lib/schemas/schemas";
import { Calendar1Icon, Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createEvent, uploadImage } from "../api/api";

interface FormErrors {
  [key: string]: string;
}

interface AgendaItem {
  id: number;
  time: string;
  title: string;
}

interface EventDetail {
  id: number;
  value: string;
}

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    time: "",
    images: [] as string[],
    desc: "",
    overview: "",
    aboutOrganizer: "",
    tags: [] as string[],
    bookedSpots: 0,
  });
  const [uploading, setUploading] = useState(false);

  // Agenda state
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: 1, time: "", title: "" },
  ]);

  // EventDetails state
  const [eventDetails, setEventDetails] = useState<EventDetail[]>([
    { id: 1, value: "" },
  ]);

  const router = useRouter();

  const addAgendaItem = () => {
    setAgendaItems((prev) => [
      ...prev,
      { id: prev.length + 1, time: "", title: "" },
    ]);
  };

  const removeAgendaItem = (id: number) => {
    if (agendaItems.length === 1) return;
    setAgendaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAgendaChange = (
    id: number,
    field: "time" | "title",
    value: string,
  ) => {
    setAgendaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const addEventDetail = () => {
    setEventDetails((prev) => [...prev, { id: prev.length + 1, value: "" }]);
  };

  const removeEventDetail = (id: number) => {
    if (eventDetails.length === 1) return;
    setEventDetails((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEventDetailChange = (id: number, value: string) => {
    setEventDetails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  // ── Image upload ──────────────────────────────────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ Rasm hajmi 5MB dan kichik bo'lishi kerak");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("❌ Faqat rasm yuklash mumkin");
      return;
    }

    try {
      setUploading(true);
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const supabaseUrl = await uploadImage(base64);
      setFormData((prev) => ({ ...prev, images: [supabaseUrl] }));
      alert("✅ Rasm muvaffaqiyatli yuklandi!");
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("❌ Rasm yuklashda xatolik yuz berdi");
    } finally {
      setUploading(false);
    }
  };

  // ── Input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // ── Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const dataToValidate = {
      title: formData.title.trim(),
      location: formData.location.trim(),
      date: date ? date.toISOString().split("T")[0] : "",
      time: formData.time || "",
      images: formData.images.filter((img) => img.trim() !== ""),
      desc: formData.desc.trim(),
      overview: formData.overview.trim(),
      eventDetails: eventDetails.filter((d) => d.value.trim() !== ""),
      agenda: agendaItems.filter(
        (a) => a.time.trim() !== "" && a.title.trim() !== "",
      ),
      aboutOrganizer: formData.aboutOrganizer.trim(),
      tags:
        formData.tags.length > 0
          ? formData.tags.filter((tag) => tag.trim() !== "")
          : ["event"],
    };

    const eventPayload = {
      ...dataToValidate,
      bookedSpots: formData.bookedSpots,
      bookedEmails: [],
    };

    try {
      const validatedData = CreateEventSchema.parse(dataToValidate);
      console.log("✅ Validation muvaffaqiyatli:", validatedData);

      const result = await createEvent(eventPayload);
      console.log("✅ Event yaratildi:", result);

      alert("✅ Event muvaffaqiyatli yaratildi!");
      router.push("/events");
    } catch (error: unknown) {
      console.error("❌ Xatolik:", error);

      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors(fieldErrors);
        alert("Please fix the highlighted errors and try again.");
      } else if (error instanceof Error) {
        let errorMessage = "Error: " + error.message;
        if (error.message?.includes("duplicate key")) {
          errorMessage = "This event already exists.";
        } else if (error.message?.includes("Failed to create event")) {
          errorMessage = "Error creating event. Please try again later.";
        }
        alert(`❌ ${errorMessage}`);
      } else {
        alert("Unknown error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-161 mx-auto">
      <h2 className="font-semibold text-center text-[48px] leading-[100%] bg-[linear-gradient(179.01deg,#FFFFFF_0.85%,#00CBFF_484.31%)] bg-clip-text text-transparent mb-11.5">
        Create an event
      </h2>
      <form
        className="flex flex-col gap-y-6 border border-[#182830] rounded-[10px] bg-[#0D161A] p-7.5"
        onSubmit={handleSubmit}
      >
        {/* Event Title */}
        <Field>
          <FieldLabel className="text-[15px] leading-6 text-[#E7F2FF]">
            Event title
          </FieldLabel>
          <Input
            className={cn(
              "py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]",
              errors.title && "border-red-500",
            )}
            placeholder="Enter event title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && (
            <FieldDescription className="text-red-500">
              {errors.title}
            </FieldDescription>
          )}
        </Field>

        {/* Event Location */}
        <Field>
          <FieldLabel>Event Location</FieldLabel>
          <Input
            className={cn(
              "py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]",
              errors.location && "border-red-500",
            )}
            placeholder="Enter event location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && (
            <FieldDescription className="text-red-500">
              {errors.location}
            </FieldDescription>
          )}
        </Field>

        {/* Event Date */}
        <Field>
          <FieldLabel htmlFor="date-picker-optional">Event Date</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-optional"
                className={cn(
                  "flex gap-2 items-center justify-start font-normal",
                  errors.date && "border-red-500",
                )}
              >
                <Calendar1Icon />
                <h5>{date ? date.toLocaleDateString() : "Select date"}</h5>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpen(false);
                  if (errors.date) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.date;
                      return newErrors;
                    });
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <FieldDescription className="text-red-500">
              {errors.date}
            </FieldDescription>
          )}
        </Field>

        {/* Event Time */}
        <Field className="relative">
          <FieldLabel htmlFor="time-picker-optional">Event time</FieldLabel>
          <div className="absolute left-3 top-10.5 text-[10px] z-10 pointer-events-none">
            <Clock size={15} />
          </div>
          <Input
            type="time"
            id="time-picker-optional"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={cn(
              "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:opacity-100 pl-8",
              errors.time && "border-red-500",
            )}
          />
          {errors.time && (
            <FieldDescription className="text-red-500">
              {errors.time}
            </FieldDescription>
          )}
          <FieldDescription>24-soatlik format: HH:MM</FieldDescription>
        </Field>

        {/* Event Image / Banner */}
        <Field>
          <FieldLabel htmlFor="picture">Event Image</FieldLabel>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className={cn(errors.images && "border-red-500")}
          />
          <FieldDescription>JPG, PNG or WEBP</FieldDescription>
        </Field>

        {/* Preview */}
        {formData.images[0] && (
          <div className="mt-2">
            <img
              src={formData.images[0]}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Tags */}
        <Field>
          <FieldLabel htmlFor="tags">Tags</FieldLabel>
          <Input
            value={tagsInput}
            placeholder="Add tags: react, next.js, javascript"
            onChange={(e) => {
              const value = e.target.value;
              setTagsInput(value);
              setFormData((prev) => ({
                ...prev,
                tags: value
                  ? value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag !== "")
                  : [],
              }));
              if (errors.tags) {
                setErrors((prev) => {
                  const n = { ...prev };
                  delete n.tags;
                  return n;
                });
              }
            }}
            className={cn(
              "py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]",
              errors.tags && "border-red-500",
            )}
          />
          {errors.tags && (
            <FieldDescription className="text-red-500">
              {errors.tags}
            </FieldDescription>
          )}
          <FieldDescription>separate with comma " , "</FieldDescription>
        </Field>

        {/* Event Description */}
        <Field>
          <FieldLabel htmlFor="description">Event Description</FieldLabel>
          <Textarea
            id="description"
            className={cn(
              "min-h-24 max-h-40 resize-none overflow-y-auto",
              errors.desc && "border-red-500",
            )}
            placeholder="Briefly describe the event"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          />
          {errors.desc && (
            <FieldDescription className="text-red-500">
              {errors.desc}
            </FieldDescription>
          )}
        </Field>

        {/* Event Overview */}
        <Field>
          <FieldLabel htmlFor="overview">Event Overview</FieldLabel>
          <Input
            id="overview"
            type="text"
            placeholder="Short overview of the event"
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
            className={cn(
              "py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]",
              errors.overview && "border-red-500",
            )}
          />
          {errors.overview && (
            <FieldDescription className="text-red-500">
              {errors.overview}
            </FieldDescription>
          )}
        </Field>

        {/* About Organizer */}
        <Field>
          <FieldLabel htmlFor="organizer">About Organizer</FieldLabel>
          <Input
            id="organizer"
            type="text"
            placeholder="Information about the organizer"
            name="aboutOrganizer"
            value={formData.aboutOrganizer}
            onChange={handleInputChange}
            className={cn(
              "py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]",
              errors.aboutOrganizer && "border-red-500",
            )}
          />
          {errors.aboutOrganizer && (
            <FieldDescription className="text-red-500">
              {errors.aboutOrganizer}
            </FieldDescription>
          )}
        </Field>

        {/* ── Event Details ───────────────────────────────────────── */}
        <Field>
          <FieldLabel>Event Details</FieldLabel>
          <div className="flex flex-col gap-y-3">
            {eventDetails.map((detail, index) => (
              <div key={detail.id} className="flex gap-2 items-center">
                <Input
                  placeholder={`Detail ${index + 1}: e.g. "Date: 28th October 2025"`}
                  value={detail.value}
                  onChange={(e) =>
                    handleEventDetailChange(detail.id, e.target.value)
                  }
                  className="py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8] flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeEventDetail(detail.id)}
                  disabled={eventDetails.length === 1}
                  className="p-2 text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addEventDetail}
            className="mt-2 flex items-center gap-1.5 text-[#00CBFF] text-[14px] hover:text-white transition-colors"
          >
            <Plus size={16} />
            Add detail
          </button>
          <FieldDescription>
            e.g. "Venue: Toshkent", "Mode: Hybrid"
          </FieldDescription>
        </Field>

        {/* ── Agenda ─────────────────────────────────────────────── */}
        <Field>
          <FieldLabel>Agenda</FieldLabel>
          <div className="flex flex-col gap-y-3">
            {agendaItems.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Time (e.g. 09:00 AM – 10:00 AM)"
                  value={item.time}
                  onChange={(e) =>
                    handleAgendaChange(item.id, "time", e.target.value)
                  }
                  className="py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[14px] leading-6 text-[#DCFFF8] w-52 shrink-0"
                />
                <Input
                  placeholder={`Session ${index + 1} title`}
                  value={item.title}
                  onChange={(e) =>
                    handleAgendaChange(item.id, "title", e.target.value)
                  }
                  className="py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[14px] leading-6 text-[#DCFFF8] flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeAgendaItem(item.id)}
                  disabled={agendaItems.length === 1}
                  className="p-2 text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addAgendaItem}
            className="mt-2 flex items-center gap-1.5 text-[#00CBFF] text-[14px] hover:text-white transition-colors"
          >
            <Plus size={16} />
            Add session
          </button>
        </Field>

        {/* ── Booked Spots ────────────────────────────────────────── */}
        <Field>
          <FieldLabel htmlFor="bookedSpots">Initial Booked Spots</FieldLabel>
          <Input
            id="bookedSpots"
            type="number"
            min={0}
            name="bookedSpots"
            placeholder="0"
            value={formData.bookedSpots}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bookedSpots: parseInt(e.target.value) || 0,
              }))
            }
            className="py-4 pl-4.5 border border-[#243B47] rounded-xl bg-[#182830] text-[16px] leading-6 text-[#DCFFF8]"
          />
          <FieldDescription>
            Dastlabki band qilingan o'rinlar soni (odatda 0)
          </FieldDescription>
        </Field>

        {/* Submit Button */}
        <button type="submit" className="w-full btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
