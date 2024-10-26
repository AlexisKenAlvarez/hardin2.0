alter table "public"."featured" alter column "product" set not null;

alter table "public"."products" add column "updated_at" timestamp without time zone;

alter table "public"."products" add column "updated_by" character varying;

CREATE UNIQUE INDEX featured_product_key ON public.featured USING btree (product);

alter table "public"."featured" add constraint "featured_product_key" UNIQUE using index "featured_product_key";


