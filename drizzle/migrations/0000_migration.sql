CREATE SEQUENCE public.booking_ref_seq START 1;

CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('RC-' || to_char(now() AT TIME ZONE 'Asia/Kolkata','YYYY') || '-' || lpad(nextval('public.booking_ref_seq')::text, 5, '0')),
  product_type text NOT NULL,
  product_slug text NOT NULL,
  product_title text NOT NULL,
  option_label text,
  travellers integer NOT NULL,
  travel_date date,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  notes text,
  unit_price_paise bigint,
  total_paise bigint,
  advance_paise bigint,
  balance_paise bigint,
  booking_status text NOT NULL DEFAULT 'awaiting_review',
  payment_status text NOT NULL DEFAULT 'unpaid',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.booking_requests TO service_role;
GRANT USAGE ON SEQUENCE public.booking_ref_seq TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  travellers integer,
  desired_date date,
  pickup_point text,
  budget text,
  preference text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;