import type { PriceOption, Product } from "./catalog";

export const ADVANCE_RATE = 0.3;

export type Quote = {
  option: PriceOption;
  units: number;
  totalPaise: number | null;
  advancePaise: number | null;
  balancePaise: number | null;
};

export type QuoteError = { error: string };

/** Options a group of this size may book (tiers never apply below their minimum). */
export function eligibleOptions(product: Product, travellers: number): PriceOption[] {
  return product.options.filter(
    (o) =>
      (o.minTravellers == null || travellers >= o.minTravellers) &&
      (o.maxTravellers == null || travellers <= o.maxTravellers),
  );
}

export function quote(product: Product, optionId: string, travellers: number): Quote | QuoteError {
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 100) {
    return { error: "Travellers must be between 1 and 100." };
  }
  const option = product.options.find((o) => o.id === optionId);
  if (!option) return { error: "Please choose a valid option." };
  if (!eligibleOptions(product, travellers).includes(option)) {
    return { error: "This rate isn't available for your group size." };
  }
  const units = option.unit === "camp" ? Math.ceil(travellers / (option.personsPerUnit ?? 1)) : travellers;
  if (option.pricePaise == null) {
    return { option, units, totalPaise: null, advancePaise: null, balancePaise: null };
  }
  const totalPaise = option.pricePaise * units;
  const advancePaise = Math.round(totalPaise * ADVANCE_RATE);
  return { option, units, totalPaise, advancePaise, balancePaise: totalPaise - advancePaise };
}
