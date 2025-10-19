-- Demo Products Seed Data for NOFILTR.

-- Product 1: Daily Face Cleanser
INSERT INTO products (
  name,
  slug,
  description,
  price,
  compare_at_price,
  inventory_quantity,
  sku,
  main_image_url,
  hover_image_url,
  skin_types,
  ingredients,
  usage_instructions,
  benefits,
  volume,
  is_featured
) VALUES (
  'NOFILTR. Daily Face Cleanser',
  'daily-face-cleanser',
  'A gentle, sulfate-free cleanser that removes impurities while maintaining your skin''s natural moisture barrier. Perfect for daily use.',
  899,
  1199,
  100,
  'NF-CLEANSER-190',
  '/products/cleanser-main.jpg',
  '/products/cleanser-hover.jpg',
  ARRAY['oily', 'combination', 'normal', 'sensitive'],
  '{"Glycerin": "Hydrating humectant that attracts moisture to the skin", "Niacinamide": "Vitamin B3 that strengthens skin barrier and reduces inflammation", "Chamomile Extract": "Soothing botanical that calms irritation", "Hyaluronic Acid": "Moisture-binding ingredient for plump, hydrated skin"}'::jsonb,
  'Apply a small amount to damp face and neck. Gently massage in circular motions for 30-60 seconds. Rinse thoroughly with lukewarm water. Use morning and evening for best results.',
  ARRAY[
    'Removes dirt, oil, and makeup without stripping',
    'Maintains skin''s natural pH balance',
    'Gentle enough for sensitive skin',
    'Leaves skin feeling soft and refreshed',
    'Prepares skin for better absorption of serums and moisturizers'
  ],
  '190 ml',
  true
);

-- Product 2: Daily Moisturizer
INSERT INTO products (
  name,
  slug,
  description,
  price,
  compare_at_price,
  inventory_quantity,
  sku,
  main_image_url,
  hover_image_url,
  skin_types,
  ingredients,
  usage_instructions,
  benefits,
  volume,
  is_featured
) VALUES (
  'NOFILTR. Daily Moisturizer',
  'daily-moisturizer',
  'A lightweight, fast-absorbing moisturizer enriched with ceramides and peptides. Provides long-lasting hydration without feeling heavy.',
  1299,
  1699,
  100,
  'NF-MOIST-50',
  '/products/moisturizer-main.jpg',
  '/products/moisturizer-hover.jpg',
  ARRAY['dry', 'combination', 'normal', 'sensitive'],
  '{"Ceramides": "Essential lipids that strengthen skin barrier", "Peptides": "Amino acids that boost collagen production", "Squalane": "Lightweight oil that mimics skin''s natural sebum", "Vitamin E": "Antioxidant that protects against environmental damage", "Hyaluronic Acid": "Deep hydration and plumping"}'::jsonb,
  'After cleansing and applying serum, take a pea-sized amount and warm between fingertips. Gently press and pat onto face and neck. Use morning and evening. Can be used under makeup.',
  ARRAY[
    'Provides 24-hour hydration',
    'Strengthens skin barrier function',
    'Reduces appearance of fine lines',
    'Non-comedogenic (won''t clog pores)',
    'Lightweight, fast-absorbing formula',
    'Suitable for all skin types'
  ],
  '50 ml',
  true
);

-- Additional product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
SELECT 
  id,
  '/products/cleanser-lifestyle.jpg',
  'Daily Face Cleanser lifestyle shot',
  1
FROM products WHERE slug = 'daily-face-cleanser';

INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
SELECT 
  id,
  '/products/moisturizer-lifestyle.jpg',
  'Daily Moisturizer lifestyle shot',
  1
FROM products WHERE slug = 'daily-moisturizer';

-- Sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified_purchase)
SELECT 
  p.id,
  auth.uid(),
  5,
  'Best cleanser I''ve ever used!',
  'This cleanser is absolutely amazing. My skin feels so clean but not stripped at all. The texture is perfect and a little goes a long way.',
  true
FROM products p
WHERE p.slug = 'daily-face-cleanser'
LIMIT 1;

INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified_purchase)
SELECT 
  p.id,
  auth.uid(),
  5,
  'Perfect daily moisturizer',
  'I have combination skin and this moisturizer is perfect. It''s lightweight but still super hydrating. My skin looks so much healthier!',
  true
FROM products p
WHERE p.slug = 'daily-moisturizer'
LIMIT 1;

