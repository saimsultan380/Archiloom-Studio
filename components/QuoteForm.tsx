"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  enquiryBudgets,
  enquiryDeliverables,
  enquiryProjectTypes,
  enquiryRoles,
  enquiryServices,
  enquiryStages,
  enquiryTimelines,
  serviceQueryMap,
  type EnquiryBudget,
  type EnquiryDeliverable,
  type EnquiryProjectType,
  type EnquiryRole,
  type EnquiryService,
  type EnquiryStage,
  type EnquiryTimeline,
} from "@/data/enquiry";
import { planOptions, type PlanId } from "@/data/packages";
import { Button } from "@/components/Button";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type FormState = {
  service: EnquiryService | "";
  role: EnquiryRole | "";
  company: string;
  projectType: EnquiryProjectType | "";
  location: string;
  area: string;
  stage: EnquiryStage | "";
  deliverables: EnquiryDeliverable[];
  message: string;
  budget: EnquiryBudget | "";
  timeline: EnquiryTimeline | "";
  name: string;
  email: string;
  phone: string;
  plan: string;
};

type FieldName = keyof ContactInput;

const empty: FormState = {
  service: "",
  role: "",
  company: "",
  projectType: "",
  location: "",
  area: "",
  stage: "",
  deliverables: [],
  message: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  plan: "",
};

const fieldClass =
  "w-full rounded-full border border-charcoal/15 bg-white px-4 py-3 text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-n-500 focus:border-charcoal";

const areaClass =
  "w-full min-h-32 resize-y rounded-[12px] border border-charcoal/15 bg-white px-4 py-3 text-[15px] leading-[1.55] text-charcoal outline-none transition-colors duration-300 placeholder:text-n-500 focus:border-charcoal";

function isPlan(value: string | null): value is PlanId {
  return Boolean(value && planOptions.some((option) => option.value === value));
}

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const [form, setForm] = useState<FormState>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const service = params.get("service");
    const plan = params.get("plan");
    setForm((current) => ({
      ...current,
      service: service && service in serviceQueryMap ? serviceQueryMap[service] : current.service,
      plan: isPlan(plan) ? plan : current.plan,
    }));
  }, [params]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleDeliverable(id: EnquiryDeliverable) {
    setForm((current) => ({
      ...current,
      deliverables: current.deliverables.includes(id)
        ? current.deliverables.filter((item) => item !== id)
        : [...current.deliverables, id],
    }));
    setErrors((current) => ({ ...current, deliverables: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        service: fieldErrors.service?.[0],
        role: fieldErrors.role?.[0],
        projectType: fieldErrors.projectType?.[0],
        location: fieldErrors.location?.[0],
        stage: fieldErrors.stage?.[0],
        deliverables: fieldErrors.deliverables?.[0],
        message: fieldErrors.message?.[0],
        budget: fieldErrors.budget?.[0],
        timeline: fieldErrors.timeline?.[0],
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }

    if (file && file.size > 8 * 1024 * 1024) {
      setFormError("Attachment must be 8 MB or smaller.");
      return;
    }

    setStatus("submitting");
    try {
      const body = new FormData();
      body.set("payload", JSON.stringify(parsed.data));
      if (file) body.set("file", file);
      const response = await fetch("/api/contact", { method: "POST", body });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setFormError(data?.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setFormError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-n-300 bg-white p-6" role="status">
        <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Thank you, {form.name}.</p>
        <p className="mt-3 max-w-xl text-[16px] leading-[1.6] text-n-700">
          This design draft validated your enquiry. It is not emailed or stored yet.
        </p>
        <button
          type="button"
          className="text-link mt-6 font-display text-sm font-semibold"
          onClick={() => {
            setForm(empty);
            setFile(null);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const planLabel = planOptions.find((option) => option.value === form.plan)?.label;

  return (
    <form onSubmit={onSubmit} noValidate className={`grid gap-8 ${compact ? "" : "mt-8"}`}>
      {planLabel ? (
        <p className="text-[14px] text-n-700">
          Engagement: <span className="font-medium text-charcoal">{planLabel}</span>
        </p>
      ) : null}

      <Section index="01" title="What service do you need?" error={errors.service}>
        <ChoiceList
          name="service"
          value={form.service}
          options={enquiryServices}
          onChange={(value) => update("service", value)}
        />
      </Section>

      <Section index="02" title="Tell us about yourself" error={errors.role}>
        <ChoiceList name="role" value={form.role} options={enquiryRoles} onChange={(value) => update("role", value)} />
        <label className="mt-5 block">
          <span className="mb-2 block text-[14px] text-n-700">Company or organization (optional)</span>
          <input
            className={fieldClass}
            name="company"
            placeholder="Your company name"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </label>
      </Section>

      <Section index="03" title="Project details" error={errors.projectType || errors.location || errors.stage}>
        <p className="mb-3 text-[14px] text-n-700">What type of project is it?</p>
        <ChoiceList
          name="projectType"
          value={form.projectType}
          options={enquiryProjectTypes}
          onChange={(value) => update("projectType", value)}
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[14px] text-n-700">Where is the project located?</span>
            <input
              className={fieldClass}
              name="location"
              placeholder="City and country"
              value={form.location}
              aria-invalid={Boolean(errors.location)}
              onChange={(event) => update("location", event.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[14px] text-n-700">Approximate project area (optional)</span>
            <input
              className={fieldClass}
              name="area"
              placeholder="e.g. 3,000 sq ft or 280 m²"
              value={form.area}
              onChange={(event) => update("area", event.target.value)}
            />
          </label>
        </div>
        <p className="mt-5 mb-3 text-[14px] text-n-700">What stage is the project at?</p>
        <ChoiceList name="stage" value={form.stage} options={enquiryStages} onChange={(value) => update("stage", value)} />
      </Section>

      <Section index="04" title="What do you need us to deliver?" error={errors.deliverables || errors.message}>
        <p className="mb-3 text-[14px] text-n-700">Select all that apply</p>
        <ul className="grid gap-2">
          {enquiryDeliverables.map((item) => (
            <li key={item.id}>
              <label className="flex items-start gap-3 text-[15px] leading-snug">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-charcoal"
                  checked={form.deliverables.includes(item.id)}
                  onChange={() => toggleDeliverable(item.id)}
                />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
        <label className="mt-5 block">
          <span className="mb-2 block text-[14px] text-n-700">Project detail</span>
          <textarea
            className={areaClass}
            name="message"
            rows={5}
            placeholder="What are you planning to build or design? What challenges are you facing? What drawings, models, images, or other deliverables do you need?"
            value={form.message}
            aria-invalid={Boolean(errors.message)}
            onChange={(event) => update("message", event.target.value)}
          />
        </label>
      </Section>

      <Section index="05" title="Budget and timeline" error={errors.budget || errors.timeline}>
        <p className="mb-3 text-[14px] text-n-700">Estimated budget (USD)</p>
        <ChoiceList name="budget" value={form.budget} options={enquiryBudgets} onChange={(value) => update("budget", value)} />
        <p className="mt-5 mb-3 text-[14px] text-n-700">Timeline</p>
        <ChoiceList
          name="timeline"
          value={form.timeline}
          options={enquiryTimelines}
          onChange={(value) => update("timeline", value)}
        />
      </Section>

      <Section index="06" title="How can we contact you?" error={errors.name || errors.email}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[14px] text-n-700">Your name</span>
            <input
              className={fieldClass}
              name="name"
              autoComplete="name"
              placeholder="Full name"
              value={form.name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => update("name", event.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[14px] text-n-700">Business email</span>
            <input
              className={fieldClass}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => update("email", event.target.value)}
            />
          </label>
        </div>
        <label className="mt-5 block">
          <span className="mb-2 block text-[14px] text-n-700">Phone / WhatsApp (optional)</span>
          <input
            className={fieldClass}
            name="phone"
            autoComplete="tel"
            placeholder="+1 000 000 0000"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </label>
        <label className="mt-5 block">
          <span className="mb-2 block text-[14px] text-n-700">Drawings or references (optional)</span>
          <input
            className="block w-full text-[14px] text-n-700 file:mr-4 file:rounded-full file:border-0 file:bg-charcoal file:px-4 file:py-2 file:font-display file:text-[12px] file:font-semibold file:text-white"
            type="file"
            name="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,application/pdf,image/png,image/jpeg,image/webp,application/zip"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <span className="mt-2 block text-[13px] text-n-500">PDF, image, or ZIP. 8 MB maximum.</span>
        </label>
      </Section>

      {formError ? (
        <p className="text-sm font-medium text-charcoal" role="alert">
          {formError}
        </p>
      ) : null}
      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Tell Us About Your Project"}
        </Button>
      </div>
    </form>
  );
}

function Section({
  index,
  title,
  error,
  children,
}: {
  index: string;
  title: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-n-300 pt-6">
      <legend className="font-display text-[18px] font-semibold tracking-[-0.02em]">
        <span className="mr-2 text-n-500">{index}</span>
        {title}
      </legend>
      <div className="mt-4">{children}</div>
      {error ? <p className="mt-3 text-[13px] font-medium text-charcoal">{error}</p> : null}
    </fieldset>
  );
}

function ChoiceList<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T | "";
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <ul className="grid gap-2">
      {options.map((option) => (
        <li key={option.id}>
          <label className="flex items-start gap-3 text-[15px] leading-snug">
            <input
              type="radio"
              name={name}
              className="mt-1 h-4 w-4 accent-charcoal"
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
