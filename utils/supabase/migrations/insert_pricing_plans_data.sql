-- Insert the two payment plans for dodopayments integration
INSERT INTO public.dodo_pricing_plans (
  name,
  description,
  price,
  credits,
  currency,
  dodo_product_id,
  is_active,
  metadata
) VALUES 
(
  'Starter Pack',
  '20 AI photos, 1 model training included',
  19.00,
  20,
  'USD',
  'pdt_0NZWYLLB5fkJqKoTspaFn',
  true,
  '{"features": ["20 AI photos", "1 model training included"]}'
),
(
  'Premium Pack',
  '500 AI photos, 2 model training included, 20-30 min training time',
  150.00,
  500,
  'USD',
  'pdt_0NZWZB7dYVd8OPPf6Dbqi',
  true,
  '{"features": ["500 AI photos", "2 model training included"]}'
);
