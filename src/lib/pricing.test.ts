import { describe, expect, it } from "vitest";
import { findProduct, isUpcoming, GROUP_TOURS } from "./catalog";
import { quote } from "./pricing";

const get = (s: string) => findProduct(s)!;

describe("booking rules", () => {
  it("30% advance: ₹6,500 → ₹1,950 advance, ₹4,550 balance", () => {
    const q = quote(get("koraput-deluxe-13-nov-2026"), "ex-bbsr", 1);
    expect(q).toMatchObject({ totalPaise: 650000, advancePaise: 195000, balancePaise: 455000 });
  });

  it("8-person private rate is not applied to a group of 5", () => {
    expect(quote(get("koraput-2-day-private"), "std-8", 5)).toHaveProperty("error");
    expect(quote(get("koraput-2-day-private"), "std-4", 5)).toMatchObject({ totalPaise: 5 * 350000 });
  });

  it("couple private tour is price on request", () => {
    expect(quote(get("koraput-2-day-private"), "couple", 2)).toMatchObject({ totalPaise: null });
  });

  it("Ramachandi is ₹600 per camp of 2 persons", () => {
    expect(quote(get("ramachandi-camping"), "per-camp", 3)).toMatchObject({ units: 2, totalPaise: 120000 });
  });

  it("completed or past departures are never upcoming", () => {
    const strangers = GROUP_TOURS.find((t) => t.slug === "strangers-tour-9-oct-2026")!;
    expect(isUpcoming(strangers, "2026-10-01")).toBe(false);
    expect(isUpcoming(get("koraput-deluxe-16-oct-2026"), "2026-10-17")).toBe(false);
    expect(isUpcoming(get("koraput-deluxe-16-oct-2026"), "2026-10-12")).toBe(true);
  });
});
