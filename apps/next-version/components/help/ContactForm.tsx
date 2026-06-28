// contact form — collects name, email, and message.
// uses react-hook-form + zod for validation.
// currently logs to console — connect to email service (Resend/SendGrid) later.
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// component
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // TODO: connect to Resend or SendGrid to actually send the email
    console.log("Contact form submitted:", data);
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div
          className="w-12 h-12 rounded-full bg-green-50 flex items-center
                        justify-center"
        >
          <span className="text-2xl">✓</span>
        </div>
        <p className="text-[15px] font-medium text-slate-800">Message sent!</p>
        <p className="text-[13px] text-slate-400">
          We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-[13px] text-blue-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-slate-700">Name</label>
        <Input {...register("name")} placeholder="Your name" />
        {errors.name && (
          <p className="text-[12px] text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-slate-700">Email</label>
        <Input {...register("email")} placeholder="your@email.com" />
        {errors.email && (
          <p className="text-[12px] text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-slate-700">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="How can we help you?"
          className="border border-slate-200 rounded-lg px-3 py-2 text-[14px]
                     resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.message && (
          <p className="text-[12px] text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-500 text-white"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
