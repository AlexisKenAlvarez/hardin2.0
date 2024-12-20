drop policy "Enable read access for all users" on "public"."featured";

drop policy "Enable read access for all users" on "public"."products";

revoke delete on table "public"."featured" from "anon";

revoke insert on table "public"."featured" from "anon";

revoke references on table "public"."featured" from "anon";

revoke select on table "public"."featured" from "anon";

revoke trigger on table "public"."featured" from "anon";

revoke truncate on table "public"."featured" from "anon";

revoke update on table "public"."featured" from "anon";

revoke delete on table "public"."featured" from "authenticated";

revoke insert on table "public"."featured" from "authenticated";

revoke references on table "public"."featured" from "authenticated";

revoke select on table "public"."featured" from "authenticated";

revoke trigger on table "public"."featured" from "authenticated";

revoke truncate on table "public"."featured" from "authenticated";

revoke update on table "public"."featured" from "authenticated";

revoke delete on table "public"."featured" from "service_role";

revoke insert on table "public"."featured" from "service_role";

revoke references on table "public"."featured" from "service_role";

revoke select on table "public"."featured" from "service_role";

revoke trigger on table "public"."featured" from "service_role";

revoke truncate on table "public"."featured" from "service_role";

revoke update on table "public"."featured" from "service_role";

alter table "public"."featured" drop constraint "featured_product_fkey";

alter table "public"."featured" drop constraint "featured_product_key";

drop function if exists "public"."filter_products"(name_filter text, price_filter text, bestseller boolean, active boolean, "order" text, sub_category_filter text);

drop function if exists "public"."filter_products"(name_filter text, price_filter text, bestseller boolean, active boolean, "order" text, category_filter text, sub_category_filter text);

alter table "public"."featured" drop constraint "featured_pkey";

drop index if exists "public"."featured_pkey";

drop index if exists "public"."featured_product_key";

drop table "public"."featured";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.filter_products(name_filter text, price_filter text, bestseller boolean, active boolean, "order" text, category_filter text, sub_category_filter text)
 RETURNS TABLE(id bigint, name character varying, image_url character varying, is_best_seller boolean, is_active boolean, category bigint, label character varying, sub_category character varying, sub_category_id bigint, prices jsonb)
 LANGUAGE plpgsql
AS $function$DECLARE
    condition text := '';
    sql text := '';
BEGIN

       -- Build the condition dynamically based on the value of "name"
    IF name_filter IS NOT NULL AND name_filter != '' THEN
        condition := condition || ' AND name ILIKE ''%' || name_filter || '%''';
    END IF;

    IF category_filter IS NOT NULL AND category_filter != '' THEN
        condition := condition || ' AND p.category = ' || category_filter || '';
    END IF;

    IF price_filter IS NOT NULL AND price_filter != '' THEN
        condition := condition || ' AND pp.product in (SELECT product FROM select_product_price)';
    END IF;

    IF bestSeller IS NOT NULL THEN
        condition := condition || ' AND is_best_seller = ' || bestSeller || '';
    END IF;

    IF active IS NOT NULL THEN
        condition := condition || ' AND p.is_active = ' || active || '';
    END IF;

    IF sub_category_filter IS NOT NULL AND sub_category_filter != '' THEN
        condition := condition || ' AND sc.id = ' || sub_category_filter || '';
    END IF;

    IF "order" IS NOT NULL AND "order" != '' THEN
        IF "order" = 'newest' THEN
            condition := condition || ' ORDER BY p.created_at DESC';
        ELSE
            condition := condition || ' ORDER BY p.created_at ASC';
        END IF;
    END IF;

    sql := '
    WITH select_product_price AS (
        SELECT product
        FROM products_prices wpp
        WHERE 1 = 1 ';

    IF price_filter IS NOT NULL AND price_filter != '' THEN 
        sql := sql || ' AND wpp.price = ' || quote_literal(price_filter);
    ELSE
        sql := sql || ' AND FALSE'; -- Return no rows if price_filter is NULL
    END IF;

    sql := sql || '
    )
    SELECT 
        p.id, 
        p.name, 
        p.image_url,
        p.is_best_seller,
        p.is_active, 
        p.category, 
        pc.label, 
        sc.label AS sub_category,
        p.sub_category AS sub_category_id,
        jsonb_agg(
            jsonb_build_object(''price'', pp.price, ''description'', pp.description)
        ) AS prices
    FROM products p
    LEFT JOIN products_category pc ON pc.id = p.category
    LEFT JOIN products_prices pp ON pp.product = p.id
    LEFT JOIN sub_category sc ON sc.id = p.sub_category
    WHERE 1 = 1 ' || condition;

    -- Add condition for price_filter (based on the CTE)
    IF price_filter IS NOT NULL AND price_filter != '' THEN
        sql := sql || ' AND pp.product IN (SELECT product FROM select_product_price)';
    END IF;

    sql := sql || '
    GROUP BY 
        p.id, 
        p.name, 
        p.image_url, 
        p.is_best_seller, 
        p.is_active, 
        p.category, 
        pc.label, 
        sc.label, 
        p.sub_category
    ORDER BY p.name;';

    -- Execute the dynamic SQL and return the result
    RETURN QUERY EXECUTE sql;
END;$function$
;

create policy "Enable all for service role"
on "public"."products"
as permissive
for all
to service_role
using (true);


create policy "Enable read access for all normal users"
on "public"."products"
as permissive
for select
to anon, authenticated
using (true);



