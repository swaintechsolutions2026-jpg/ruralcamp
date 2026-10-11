import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { createBooking, createEnquiry } from "@/lib/bookings.functions";
import { formatINR, type Product } from "@/lib/catalog";
import { eligibleOptions, quote } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

const field = "mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

type BookingResult = Awaited<ReturnType<typeof createBooking>>;

export function BookingForm({ product }: { product: Product }) {
  const submit = useServerFn(createBooking);
  const [travellers, setTravellers] = useState(product.options[0]?.minTravellers ?? (product.type === "stay" ? 2 : 1));
  const options = useMemo(() => eligibleOptions(product, travellers), [product, travellers]);
  const [optionId, setOptionId] = useState(product.options[0]?.id ?? "");
  const activeId = options.some((o) => o.id === optionId) ? optionId : options[0]?.id ?? "";
  const q = activeId ? quote(product, activeId, travellers) : null;
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<BookingResult | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setErr(null);
    try {
      const res = await submit({
        data: {
          slug: product.slug,
          optionId: activeId,
          travellers,
          travelDate: String(f.get("date") ?? ""),
          name: String(f.get("name") ?? ""),
          phone: String(f.get("phone") ?? ""),
          email: String(f.get("email") ?? ""),
          notes: String(f.get("notes") ?? ""),
        },
      });
      setDone(res);
    } catch (e) {
      setErr(e instanceof Error && e.message.length < 160 ? e.message : "Please check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const msg = `Hi Rural Camps, I just requested a booking. Reference ${done.reference} — ${done.title} (${done.option}), ${done.travellers} traveller(s).`;
    return (
      <div className="rounded-xl bg-card p-6 shadow-soft md:p-8">
        <CheckCircle2 className="text-primary" size={36} />
        <h3 className="mt-4 text-3xl">Booking request received</h3>
        <p className="mt-2 text-muted-foreground">Your reference is</p>
        <p className="font-display text-4xl text-primary">{done.reference}</p>
        {done.totalPaise != null ? (
          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4 text-sm">
            <div><dt className="text-muted-foreground">Total</dt><dd className="font-bold">{formatINR(done.totalPaise)}</dd></div>
            <div><dt className="text-muted-foreground">30% advance</dt><dd className="font-bold">{formatINR(done.advancePaise!)}</dd></div>
            <div><dt className="text-muted-foreground">Balance</dt><dd className="font-bold">{formatINR(done.balancePaise!)}</dd></div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">We'll share a price for your group shortly.</p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">
          Payment status: <strong>Not paid yet</strong>. Our team will check availability and send UPI / bank details for the advance on WhatsApp.
        </p>
        <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          <MessageCircle size={18} /> Send reference on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-card p-6 shadow-soft md:p-8">
      <h3 className="text-3xl">Request to book</h3>
      <div className="grid grid-cols-2 gap-4">
        <Field label={product.options[0]?.unit === "camp" ? "Persons" : "Travellers"}>
          <input type="number" min={1} max={100} value={travellers} onChange={(e) => setTravellers(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className={field} required />
        </Field>
        {product.startDate ? (
          <Field label="Date"><input disabled value={product.dateLabel} className={`${field} opacity-70`} /></Field>
        ) : (
          <Field label="Preferred date"><input type="date" name="date" className={field} required /></Field>
        )}
      </div>
      <Field label="Option">
        {options.length ? (
          <select value={activeId} onChange={(e) => setOptionId(e.target.value)} className={field}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>{o.label} — {o.pricePaise != null ? `${formatINR(o.pricePaise)}/${o.unit}` : "Price on request"}</option>
            ))}
          </select>
        ) : (
          <p className="mt-1.5 text-sm text-muted-foreground">No rate for this group size — please send an enquiry instead.</p>
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name"><input name="name" required minLength={2} maxLength={100} className={field} autoComplete="name" /></Field>
        <Field label="Mobile / WhatsApp"><input name="phone" required type="tel" maxLength={20} className={field} autoComplete="tel" /></Field>
      </div>
      <Field label="Email (optional)"><input name="email" type="email" maxLength={255} className={field} autoComplete="email" /></Field>
      <Field label="Notes (optional)"><textarea name="notes" rows={3} maxLength={1000} className={field} /></Field>

      {q && !("error" in q) && (
        <div className="rounded-lg bg-secondary p-4 text-sm">
          {q.totalPaise != null ? (
            <dl className="grid grid-cols-3 gap-2">
              <div><dt className="text-muted-foreground">Total</dt><dd className="text-lg font-bold">{formatINR(q.totalPaise)}</dd></div>
              <div><dt className="text-muted-foreground">Advance (30%)</dt><dd className="text-lg font-bold text-primary">{formatINR(q.advancePaise!)}</dd></div>
              <div><dt className="text-muted-foreground">Balance</dt><dd className="text-lg font-bold">{formatINR(q.balancePaise!)}</dd></div>
            </dl>
          ) : (
            <p>Price on request — we'll send you a quote.</p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">No payment is taken now. We confirm availability first, then share advance payment details. Cancellation terms are shared before you pay.</p>
        </div>
      )}
      {err && <p className="text-sm font-semibold text-destructive" role="alert">{err}</p>}
      <button disabled={busy || !options.length} className="w-full rounded-full bg-primary py-4 font-bold text-primary-foreground transition hover:brightness-110 disabled:opacity-50">
        {busy ? "Sending…" : "Request Booking"}
      </button>
    </form>
  );
}

const CATEGORIES = ["Private tour", "Custom tour", "Birthday camping", "Couple camping", "College group trip", "Corporate group tour", "Private event", "Family trip", "Camping / rural stay", "Other"];

export function EnquiryForm({ defaultCategory = "Custom tour", title = "Get a custom quote" }: { defaultCategory?: string; title?: string }) {
  const submit = useServerFn(createEnquiry);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "");
    const t = Number(s("travellers"));
    setBusy(true);
    setErr(null);
    try {
      await submit({
        data: {
          category: s("category"),
          name: s("name"),
          phone: s("phone"),
          email: s("email"),
          travellers: t > 0 ? t : undefined,
          desiredDate: s("date"),
          pickupPoint: s("pickup"),
          budget: s("budget"),
          preference: s("preference"),
          message: s("message"),
        },
      });
      setSent(`Hi Rural Camps, I just sent an enquiry (${s("category")}) for ${t || "?"} traveller(s). My name is ${s("name")}.`);
    } catch {
      setErr("Please check your name and phone number and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-card p-6 text-card-foreground shadow-soft md:p-8">
        <CheckCircle2 className="text-primary" size={36} />
        <h3 className="mt-4 text-3xl">Thank you — we've got it.</h3>
        <p className="mt-2 text-muted-foreground">Our team will call or WhatsApp you soon. Want a faster reply?</p>
        <a href={whatsappLink(sent)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          <MessageCircle size={18} /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-card p-6 text-card-foreground shadow-soft md:p-8">
      <h3 className="text-3xl">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name"><input name="name" required minLength={2} maxLength={100} className={field} autoComplete="name" /></Field>
        <Field label="Mobile / WhatsApp"><input name="phone" type="tel" required maxLength={20} className={field} autoComplete="tel" /></Field>
        <Field label="Enquiry type">
          <select name="category" defaultValue={defaultCategory} className={field}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Travellers"><input name="travellers" type="number" min={1} max={500} className={field} /></Field>
        <Field label="Desired date"><input name="date" type="date" className={field} /></Field>
        <Field label="Pickup point"><input name="pickup" maxLength={120} placeholder="e.g. Bhubaneswar, Koraput" className={field} /></Field>
        <Field label="Budget (optional)"><input name="budget" maxLength={60} className={field} /></Field>
        <Field label="Preference">
          <select name="preference" className={field} defaultValue="No preference">
            <option>No preference</option><option>Standard</option><option>Deluxe</option>
          </select>
        </Field>
      </div>
      <Field label="Special requests"><textarea name="message" rows={3} maxLength={1500} className={field} /></Field>
      <Field label="Email (optional)"><input name="email" type="email" maxLength={255} className={field} /></Field>
      {err && <p className="text-sm font-semibold text-destructive" role="alert">{err}</p>}
      <button disabled={busy} className="w-full rounded-full bg-primary py-4 font-bold text-primary-foreground transition hover:brightness-110 disabled:opacity-50">
        {busy ? "Sending…" : "Get Custom Quote"}
      </button>
    </form>
  );
}
