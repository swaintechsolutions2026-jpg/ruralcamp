import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findProduct, isUpcoming } from "./catalog";
import { quote } from "./pricing";

const phone = z.string().trim().min(8, "Enter a valid phone number").max(20).regex(/^[+\d\s-]+$/, "Enter a valid phone number");

const bookingSchema = z.object({
  slug: z.string().min(1).max(100),
  optionId: z.string().min(1).max(50),
  travellers: z.number().int().min(1).max(100),
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  name: z.string().trim().min(2).max(100),
  phone,
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    const product = findProduct(data.slug);
    if (!product) throw new Error("Unknown tour or stay.");
    if (product.type === "group-tour" && !isUpcoming(product)) throw new Error("This departure is no longer open for booking.");
    const q = quote(product, data.optionId, data.travellers);
    if ("error" in q) throw new Error(q.error);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("booking_requests")
      .insert({
        product_type: product.type,
        product_slug: product.slug,
        product_title: product.title,
        option_label: q.option.label,
        travellers: data.travellers,
        travel_date: product.startDate ?? (data.travelDate || null),
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        notes: data.notes || null,
        unit_price_paise: q.option.pricePaise,
        total_paise: q.totalPaise,
        advance_paise: q.advancePaise,
        balance_paise: q.balancePaise,
      })
      .select("reference")
      .single();
    if (error) {
      console.error(error);
      throw new Error("We couldn't save your booking. Please try again or WhatsApp us.");
    }
    return {
      reference: row.reference,
      title: product.title,
      option: q.option.label,
      travellers: data.travellers,
      totalPaise: q.totalPaise,
      advancePaise: q.advancePaise,
      balancePaise: q.balancePaise,
    };
  });

const enquirySchema = z.object({
  category: z.string().trim().min(1).max(60),
  name: z.string().trim().min(2).max(100),
  phone,
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  travellers: z.number().int().min(1).max(500).optional(),
  desiredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  pickupPoint: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(60).optional(),
  preference: z.string().trim().max(30).optional(),
  message: z.string().trim().max(1500).optional(),
});

export const createEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquirySchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      category: data.category,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      travellers: data.travellers ?? null,
      desired_date: data.desiredDate || null,
      pickup_point: data.pickupPoint || null,
      budget: data.budget || null,
      preference: data.preference || null,
      message: data.message || null,
    });
    if (error) {
      console.error(error);
      throw new Error("We couldn't send your enquiry. Please try again or WhatsApp us.");
    }
    return { ok: true };
  });
