"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { planOptions, planValues, type PlanId } from "@/data/packages";
import { serviceIds, services } from "@/data/services";
import { Button } from "@/components/Button";
import { contactSchema } from "@/lib/contact-schema";

type FormState = {
  name: string;
  email: string;
  service: string;
  location: string;
  plan: PlanId;
  message: string;
};

type FieldName = keyof FormState;

const empty: FormState = {
  name: "",
  email: "",
  service: "",
  location: "",
  plan: "undecided",
  message: "",
};

const fieldClass =
  "w-full rounded-[7px] border border-charcoal/15 bg-white px-3.5 py-3 text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-n-500 focus:border-charcoal";

function isPlan(value: string | null): value is PlanId {
  return Boolean(value && (planValues as readonly string[]).includes(value));
}

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const plan = params.get("plan");
    const service = params.get("service");
    setForm((current) => ({
      ...current,
      plan: isPlan(plan) ? plan : current.plan,
      service: service && (serviceIds as readonly string[]).includes(service) ? service : current.service,
    }));
  }, [params]);

  function update<K extends FieldName>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateField(key: FieldName) {
    const parsed = contactSchema.safeParse(form);
    if (parsed.success) {
      setErrors((current) => ({ ...current, [key]: undefined }));
      return;
    }
    const message = parsed.error.flatten().fieldErrors[key]?.[0];
    setErrors((current) => ({ ...current, [key]: message }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        service: fieldErrors.service?.[0],
        location: fieldErrors.location?.[0],
        plan: fieldErrors.plan?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-n-300 bg-white p-6" role="status">
        <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Thank you, {form.name}.</p>
        <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-n-700">
          This design draft validated your note. It is not emailed or stored yet.
        </p>
        <button
          type="button"
          className="text-link mt-6 font-display text-sm font-semibold"
          onClick={() => {
            setForm(empty);
            setStatus("idle");
          }}
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`grid gap-5 ${compact ? "" : "mt-8"}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            className={fieldClass}
            name="name"
            autoComplete="name"
            value={form.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => validateField("name")}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => validateField("email")}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service" error={errors.service}>
          <select
            className={fieldClass}
            name="service"
            value={form.service}
            aria-invalid={Boolean(errors.service)}
            onChange={(event) => update("service", event.target.value)}
            onBlur={() => validateField("service")}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project location" error={errors.location}>
          <input
            className={fieldClass}
            name="location"
            autoComplete="country-name"
            placeholder="Country"
            value={form.location}
            aria-invalid={Boolean(errors.location)}
            onChange={(event) => update("location", event.target.value)}
            onBlur={() => validateField("location")}
          />
        </Field>
      </div>
      <Field label="Plan" error={errors.plan}>
        <select
          className={fieldClass}
          name="plan"
          value={form.plan}
          onChange={(event) => update("plan", event.target.value as PlanId)}
        >
          {planOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          name="message"
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => validateField("message")}
        />
      </Field>
      {status === "error" ? (
        <p className="text-sm font-medium text-charcoal" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request a Quote"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[12px] font-medium tracking-[0.08em] text-n-700 uppercase">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-[13px] font-medium text-charcoal">{error}</span> : null}
    </label>
  );
}
