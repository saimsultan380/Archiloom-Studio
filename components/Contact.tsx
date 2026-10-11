"use client";

import type { FormEvent, ReactNode } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { planOptions, planValues, type PlanId } from "@/data/packages";
import { serviceIds, services } from "@/data/services";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";
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

export function Contact() {
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

  return (
    <section id="contact" className="bg-white py-16 text-charcoal md:py-24 lg:py-32">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <SectionLabel label="Contact" />
            <h2 className="mt-4 font-display text-[clamp(36px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.035em]">
              We would love to <span className="title-accent">hear from you.</span>
            </h2>
            <GreenBar />
            <p className="mt-6 max-w-md text-[17px] leading-[1.6] text-n-700">
              Share the site, the service and how you want to work. We come back with a clear next step.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[280px] lg:flex-1">
              <Image
                src="/images/outdoor-terrace.jpg"
                alt="Outdoor terrace with a cabana, kitchen, concrete patio and pool"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
          <div className="border border-n-300 bg-n-100 p-6 md:p-8 lg:col-span-7 lg:p-10">
            <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">Request a quote</p>
            <h3 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.03em]">Start with the scope.</h3>
            {status === "success" ? (
              <div className="mt-8 border border-n-300 bg-white p-6" role="status">
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
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
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
            )}
            <div id="consultations" className="mt-8 border-t border-n-300 pt-8">
              <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">Consultations</p>
              <h3 className="mt-3 font-display text-[24px] font-semibold tracking-[-0.03em]">Book a call</h3>
              <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-n-700">
                A short working session to walk through scope, drawings and the right way to engage the studio.
              </p>
              <ConsultationPanel />
            </div>
          </div>
        </div>
      </Container>
    </section>
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

function ConsultationPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <Button variant="secondary" onClick={() => setOpen((value) => !value)} ariaExpanded={open}>
        Book a Consultation
      </Button>
      {open ? (
        <div className="mt-6 border border-n-300 p-4">
          <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">
            Calendar embed — forthcoming
          </p>
          <div className="mt-4 grid grid-cols-7 gap-1.5" aria-hidden>
            {Array.from({ length: 28 }).map((_, index) => (
              <span key={index} className="aspect-square border border-n-300" />
            ))}
          </div>
          <p className="mt-4 text-sm text-n-700">A live calendar will replace this placeholder.</p>
        </div>
      ) : null}
    </div>
  );
}
