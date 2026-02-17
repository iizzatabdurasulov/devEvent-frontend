"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { events } from "@/constants/constants";
import { useParams, useRouter } from "next/navigation";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Zod schema
const UpdateEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  desc: z.string().min(1, "Description is required"),
  overview: z.string().optional(),
  aboutOrganizer: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof UpdateEventSchema>;

const EditEvent = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      location: "",
      date: "",
      time: "",
      desc: "",
      overview: "",
      aboutOrganizer: "",
      tags: [],
      images: [],
    },
  });

  // Load event data
  useEffect(() => {
    if (eventId) {
      const event = events.find((e) => e.id === Number(eventId));
      if (event) {
        setValue("title", event.title);
        setValue("location", event.location);
        setValue("date", event.date);
        setValue("time", event.time);
        setValue("desc", event.desc || "");
        setValue("overview", event.overview || "");
        setValue("aboutOrganizer", event.aboutOrganizer || "");
        setValue("tags", event.tags || []);
        setValue("images", event.images || []);
      }
    }
  }, [eventId, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!eventId) {
      setError("Event ID not found");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Event update failed");
      }

      const updatedEvent = await response.json();
      setSuccess(true);

      // Redirect to events page after 1 second
      setTimeout(() => {
        router.push("/events");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-161 mx-auto">
      <h2 className="font-semibold text-center text-[48px] leading-[100%] bg-clip-text text-transparent mb-11.5 bg-[linear-gradient(179.01deg,#FFFFFF_0.85%,#00CBFF_484.31%)]">
        Edit Event
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 border border-[#182830] rounded-[10px] bg-[#0D161A] p-7.5"
      >
        <Field>
          <FieldLabel>Event Title</FieldLabel>
          <Input {...register("title")} />
          {errors.title && (
            <FieldDescription className="text-red-500">
              {errors.title.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input {...register("location")} />
          {errors.location && (
            <FieldDescription className="text-red-500">
              {errors.location.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Date</FieldLabel>
          <Input type="date" {...register("date")} />
          {errors.date && (
            <FieldDescription className="text-red-500">
              {errors.date.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Time</FieldLabel>
          <Input type="time" {...register("time")} />
          {errors.time && (
            <FieldDescription className="text-red-500">
              {errors.time.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea className={cn(
            "min-h-24 max-h-40 resize-none overflow-y-auto",
            errors.desc && "border-red-500",
          )} {...register("desc")} />
          {errors.desc && (
            <FieldDescription className="text-red-500">
              {errors.desc.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Overview</FieldLabel>
          <Textarea className={cn(
            "min-h-24 max-h-40 resize-none overflow-y-auto",
            errors.desc && "border-red-500",
          )} {...register("overview")} />
        </Field>

        <Field>
          <FieldLabel>About Organizer</FieldLabel>
          <Textarea className={cn(
            "min-h-24 max-h-40 resize-none overflow-y-auto",
            errors.desc && "border-red-500",
          )} {...register("aboutOrganizer")} />
        </Field>

        <Field>
          <FieldLabel>Tags (comma separated)</FieldLabel>
          <Input
            {...register("tags", {
              setValueAs: (val) =>
                typeof val === "string"
                  ? val.split(",").map((t) => t.trim())
                  : [],
            })}
          />
        </Field>

        <Field>
          <FieldLabel>Images</FieldLabel>
          <Input
            type="file"
            multiple
            onChange={(e) =>
              setValue(
                "images",
                Array.from(e.target.files || []).map((f) => f.name),
              )
            }
          />
        </Field>

        <Button
          className="btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Event"}
        </Button>

        {error && (
          <FieldDescription className="text-red-500 text-center">
            {error}
          </FieldDescription>
        )}

        {success && (
          <FieldDescription className="text-green-500 text-center">
            Event updated successfully! Redirecting...
          </FieldDescription>
        )}
      </form>
    </div>
  );
};

export default EditEvent;
