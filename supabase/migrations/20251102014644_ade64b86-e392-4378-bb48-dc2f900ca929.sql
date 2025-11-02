-- Add price and condition columns to products table
ALTER TABLE public.products 
ADD COLUMN price numeric(10,2),
ADD COLUMN condition text CHECK (condition IN ('new', 'used'));

-- Update existing products to have a default condition
UPDATE public.products SET condition = 'new' WHERE condition IS NULL;