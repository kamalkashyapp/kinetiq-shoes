-- ==============================================================================
-- KINETIQ SNEAKER E-COMMERCE DATABASE SCHEMA
-- Postgres / Supabase with Row Level Security, Triggers & Safe Functions
-- ==============================================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 1. CATALOG TABLES
-- ==============================================================================

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  hero_image text,
  position int default 0,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  collection_id uuid references public.collections(id) on delete set null,
  subtitle text,
  description text,
  story text,
  price_inr int not null,
  compare_at_inr int,
  weight_grams int,
  drop_mm int,
  stack_mm int,
  upper text,
  outsole text,
  is_published boolean default false,
  is_featured boolean default false,
  rating_avg numeric(2,1) default 0.0,
  rating_count int default 0,
  search_vector tsvector generated always as (
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(subtitle,'') || ' ' || coalesce(description,''))
  ) stored,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_search_idx on public.products using gin (search_vector);
create index if not exists products_collection_idx on public.products (collection_id);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  sku text unique not null,
  size numeric(4,1) not null,
  color text not null,
  color_hex text,
  stock int not null default 0 check (stock >= 0),
  price_delta_inr int default 0,
  is_active boolean default true,
  unique (product_id, size, color)
);

create index if not exists product_variants_product_id_idx on public.product_variants (product_id);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  url text not null,
  alt text not null,
  kind text default 'gallery' check (kind in ('gallery', 'hover', 'spin', 'editorial')),
  frame_index int,
  position int default 0
);

create index if not exists product_images_product_id_idx on public.product_images (product_id);

-- ==============================================================================
-- 2. USERS, PROFILES & ADDRESSES
-- ==============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  preferred_size numeric(4,1),
  marketing_opt_in boolean default false,
  deleted_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  label text default 'Home',
  full_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  country text default 'IN',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- ==============================================================================
-- 3. CARTS
-- ==============================================================================

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  guest_token text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references public.carts(id) on delete cascade not null,
  variant_id uuid references public.product_variants(id) on delete cascade not null,
  quantity int not null check (quantity > 0),
  unique (cart_id, variant_id)
);

-- ==============================================================================
-- 4. ORDERS & SHIPMENTS
-- ==============================================================================

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references public.profiles(id),
  email text not null,
  phone text,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded')),
  subtotal_inr int not null,
  discount_inr int default 0,
  shipping_inr int default 0,
  tax_inr int default 0,
  total_inr int not null,
  currency text default 'INR',
  discount_code text,
  shipping_address jsonb not null,
  shipping_method text default 'Standard Express',
  cashfree_order_id text unique,
  cashfree_payment_session_id text,
  cashfree_payment_id text,
  paid_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  variant_id uuid references public.product_variants(id),
  product_name text not null,
  product_slug text not null,
  size numeric(4,1) not null,
  color text not null,
  unit_price_inr int not null,
  quantity int not null check (quantity > 0),
  image_url text
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  carrier text default 'BlueDart',
  awb text not null,
  tracking_url text,
  status text default 'label_created',
  events jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  kind text check (kind in ('percent', 'flat')),
  value int not null,
  min_cart_inr int default 0,
  max_uses int,
  used_count int default 0,
  starts_at timestamptz default now(),
  expires_at timestamptz,
  is_active boolean default true
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  fit_feedback text check (fit_feedback in ('runs_small', 'true_to_size', 'runs_large')),
  photo_urls text[] default '{}',
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, product_id)
);

create table if not exists public.returns (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  order_item_id uuid references public.order_items(id) not null,
  reason text not null,
  status text default 'requested' check (status in ('requested', 'approved', 'pickup_scheduled', 'inspected', 'refunded', 'rejected')),
  created_at timestamptz default now()
);

-- ==============================================================================
-- 5. AUDIT, WEBHOOK IDEMPOTENCY & FIRST-PARTY ANALYTICS
-- ==============================================================================

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'cashfree',
  event_type text not null,
  payload jsonb not null,
  signature_valid boolean not null,
  processed boolean default false,
  created_at timestamptz default now()
);

create unique index if not exists webhook_idempotency_idx on public.webhook_events ((payload->'data'->'payment'->>'cf_payment_id'), event_type);

create table if not exists public.analytics_events (
  id bigserial primary key,
  session_id text not null,
  user_id uuid references public.profiles(id) on delete set null,
  event_name text not null,
  path text not null,
  referrer text,
  device text,
  country text default 'IN',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_event_name_idx on public.analytics_events (event_name, created_at desc);

-- ==============================================================================
-- 6. FUNCTIONS & TRIGGERS
-- ==============================================================================

-- Create profile row on auth.users insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Automatic updated_at timestamp triggers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products for each row execute procedure public.set_updated_at();

drop trigger if exists set_carts_updated_at on public.carts;
create trigger set_carts_updated_at before update on public.carts for each row execute procedure public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();

-- Safe stock decrement executed inside Cashfree webhook transaction
create or replace function public.decrement_stock_for_order(
  p_order_id uuid,
  p_cf_payment_id text
) returns boolean as $$
declare
  v_item record;
  v_current_stock int;
begin
  -- Idempotency check: if order is already paid, skip decrement
  if exists (select 1 from public.orders where id = p_order_id and status = 'paid') then
    return true;
  end if;

  -- Row lock and decrement stock for each variant in order
  for v_item in (select variant_id, quantity from public.order_items where order_id = p_order_id) loop
    select stock into v_current_stock
    from public.product_variants
    where id = v_item.variant_id
    for update;

    if v_current_stock < v_item.quantity then
      raise exception 'INSUFFICIENT_STOCK: variant %', v_item.variant_id;
    end if;

    update public.product_variants
    set stock = stock - v_item.quantity
    where id = v_item.variant_id;
  end loop;

  -- Mark order as paid
  update public.orders
  set status = 'paid',
      cashfree_payment_id = p_cf_payment_id,
      paid_at = now()
  where id = p_order_id;

  return true;
end;
$$ language plpgsql security definer;

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.shipments enable row level security;
alter table public.discount_codes enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.returns enable row level security;
alter table public.webhook_events enable row level security;
alter table public.analytics_events enable row level security;

-- Admin role helper
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Drop existing policies if re-running
drop policy if exists "Allow public read published collections" on public.collections;
drop policy if exists "Admin manage collections" on public.collections;
create policy "Allow public read published collections" on public.collections for select using (true);
create policy "Admin manage collections" on public.collections for all using (public.is_admin());

drop policy if exists "Allow public read published products" on public.products;
drop policy if exists "Admin manage products" on public.products;
create policy "Allow public read published products" on public.products for select using (is_published = true or public.is_admin());
create policy "Admin manage products" on public.products for all using (public.is_admin());

drop policy if exists "Allow public read variants" on public.product_variants;
drop policy if exists "Admin manage variants" on public.product_variants;
create policy "Allow public read variants" on public.product_variants for select using (true);
create policy "Admin manage variants" on public.product_variants for all using (public.is_admin());

drop policy if exists "Allow public read images" on public.product_images;
drop policy if exists "Admin manage images" on public.product_images;
create policy "Allow public read images" on public.product_images for select using (true);
create policy "Admin manage images" on public.product_images for all using (public.is_admin());

drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

drop policy if exists "Users manage own addresses" on public.addresses;
create policy "Users manage own addresses" on public.addresses for all using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users manage own cart" on public.carts;
create policy "Users manage own cart" on public.carts for all using (auth.uid() = user_id or guest_token is not null);

drop policy if exists "Users manage own cart items" on public.cart_items;
create policy "Users manage own cart items" on public.cart_items for all using (
  exists (select 1 from public.carts where carts.id = cart_items.cart_id and (carts.user_id = auth.uid() or carts.guest_token is not null))
);

drop policy if exists "Customers read own orders" on public.orders;
drop policy if exists "Admin write orders" on public.orders;
create policy "Customers read own orders" on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "Admin write orders" on public.orders for all using (public.is_admin());

drop policy if exists "Customers read own order items" on public.order_items;
create policy "Customers read own order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or public.is_admin()))
);

drop policy if exists "Users manage wishlist" on public.wishlist_items;
create policy "Users manage wishlist" on public.wishlist_items for all using (auth.uid() = user_id);

drop policy if exists "Users manage returns" on public.returns;
create policy "Users manage returns" on public.returns for all using (
  exists (select 1 from public.orders where orders.id = returns.order_id and orders.user_id = auth.uid()) or public.is_admin()
);

drop policy if exists "Public read approved reviews" on public.reviews;
drop policy if exists "Authenticated insert reviews" on public.reviews;
drop policy if exists "Admin manage reviews" on public.reviews;
create policy "Public read approved reviews" on public.reviews for select using (is_approved = true or public.is_admin());
create policy "Authenticated insert reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Admin manage reviews" on public.reviews for all using (public.is_admin());

drop policy if exists "Allow anonymous analytics ingestion" on public.analytics_events;
drop policy if exists "Admin select analytics" on public.analytics_events;
create policy "Allow anonymous analytics ingestion" on public.analytics_events for insert with check (true);
create policy "Admin select analytics" on public.analytics_events for select using (public.is_admin());

drop policy if exists "Admin manage discounts" on public.discount_codes;
create policy "Admin manage discounts" on public.discount_codes for all using (public.is_admin());

drop policy if exists "Admin view webhooks" on public.webhook_events;
create policy "Admin view webhooks" on public.webhook_events for select using (public.is_admin());
