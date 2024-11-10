alter table "public"."products" drop column "isActive";

alter table "public"."products" drop column "isBestSeller";

alter table "public"."products" add column "is_active" boolean not null default true;

alter table "public"."products" add column "is_best_seller" boolean not null;

alter table "public"."products_category" drop column "isActive";

alter table "public"."products_category" add column "is_active" boolean not null default true;

alter table "public"."users" drop column "isActive";

alter table "public"."users" drop column "isAdmin";

alter table "public"."users" drop column "isVerified";

alter table "public"."users" add column "is_active" boolean not null default true;

alter table "public"."users" add column "is_admin" boolean not null default false;

alter table "public"."users" add column "is_verified" boolean not null default false;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.filter_products(name_filter text, price_filter text, bestseller boolean, active boolean, "order" text, category_filter text)
 RETURNS TABLE(id bigint, name character varying, image_url character varying, price bigint, is_best_seller boolean, is_active boolean, category bigint, label character varying)
 LANGUAGE plpgsql
AS $function$
DECLARE
    condition text := '';
    sql text := 'SELECT 
              p.id, 
              p.name, 
              p.image_url,
              p.price, 
              p.is_best_seller,
              p.is_active, 
              p.category, 
              pc.label 
              FROM products p
              LEFT JOIN products_category pc ON pc.id = p.category
              WHERE p.category = ' || category_filter || '';
BEGIN
    -- Build the condition dynamically based on the value of "name"
    IF name_filter IS NOT NULL AND name_filter != '' THEN
        condition := condition || ' AND name ILIKE ''%' || name_filter || '%''';
    END IF;

    IF price_filter IS NOT NULL AND price_filter != '' THEN
        condition := condition || ' AND price = ' || price_filter || '';
    END IF;

    IF bestSeller IS NOT NULL THEN
        condition := condition || ' AND is_best_seller = ' || bestSeller || '';
    END IF;

    IF active IS NOT NULL THEN
        condition := condition || ' AND p.is_active = ' || active || '';
    END IF;

    IF "order" IS NOT NULL AND "order" != '' THEN
        IF "order" = 'newest' THEN
            condition := condition || ' ORDER BY p.created_at DESC';
        ELSE
            condition := condition || ' ORDER BY p.created_at ASC';
        END IF;
    END IF;

    sql := sql || condition;

    -- Execute the dynamic SQL and return the result
    RETURN QUERY EXECUTE sql;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_name_opts()
 RETURNS TABLE(value character varying, label character varying)
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN QUERY
  SELECT DISTINCT name AS value, name AS label 
  FROM products ORDER BY name asc;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_price_opts()
 RETURNS TABLE(value character varying, label character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN 
RETURN QUERY
SELECT DISTINCT price::varchar as value, price::varchar as label FROM products;
END;
$function$
;

create policy "Enable read access for all users"
on "public"."products"
as permissive
for all
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."products_category"
as permissive
for all
to public
using (true);


create policy "ReadAll"
on "public"."products_category"
as permissive
for all
to anon
using (true);



