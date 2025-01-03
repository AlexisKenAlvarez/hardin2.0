

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "sub_category_filter" "text") RETURNS TABLE("id" bigint, "name" character varying, "image_url" character varying, "price" bigint, "is_best_seller" boolean, "is_active" boolean, "category" bigint, "label" character varying, "sub_category" character varying, "sub_category_id" bigint)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    condition text := '';
    sql text := 'SELECT DISTINCT on (p.id)
              p.id, 
              p.name, 
              p.image_url,
              p.is_best_seller,
              p.is_active, 
              p.category, 
              pc.label, 
              pp.price,
              sc.label as sub_category
              p.sub_category as sub_category_id
              FROM products p
              LEFT JOIN products_category pc ON pc.id = p.category
              LEFT JOIN products_prices pp ON pp.product = p.Id
              LEFT JOIN sub_category sc ON sc.category = p.sub_category
              WHERE p.category = ' || category_filter || '';
BEGIN
    -- Build the condition dynamically based on the value of "name"
    IF name_filter IS NOT NULL AND name_filter != '' THEN
        condition := condition || ' AND name ILIKE ''%' || name_filter || '%''';
    END IF;

    IF price_filter IS NOT NULL AND price_filter != '' THEN
        condition := condition || ' AND pp.price = ' || price_filter || '';
    END IF;

    IF bestSeller IS NOT NULL THEN
        condition := condition || ' AND is_best_seller = ' || bestSeller || '';
    END IF;

    IF active IS NOT NULL THEN
        condition := condition || ' AND p.is_active = ' || active || '';
    END IF;

    IF sub_category_filter IS NOT NULL THEN
        condition := condition || ' AND sc.id = ' || sub_category_filter || '';
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
$$;


ALTER FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "sub_category_filter" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "category_filter" "text", "sub_category_filter" "text") RETURNS TABLE("id" bigint, "name" character varying, "image_url" character varying, "is_best_seller" boolean, "is_active" boolean, "category" bigint, "label" character varying, "price" bigint, "sub_category" character varying, "sub_category_id" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    condition text := '';
    sql text := 'SELECT 
              DISTINCT ON (p.id)
              p.id, 
              p.name, 
              p.image_url,
              p.is_best_seller,
              p.is_active, 
              p.category, 
              pc.label, 
              pp.price,
              sc.label as sub_category,
              p.sub_category as sub_category_id
              FROM products p
              LEFT JOIN products_category pc ON pc.id = p.category
              LEFT JOIN products_prices pp ON pp.product = p.Id
              LEFT JOIN sub_category sc ON sc.id = p.sub_category
              WHERE 1 = 1 ';
BEGIN
    -- Build the condition dynamically based on the value of "name"
    IF name_filter IS NOT NULL AND name_filter != '' THEN
        condition := condition || ' AND name ILIKE ''%' || name_filter || '%''';
    END IF;

    IF category_filter IS NOT NULL AND category_filter != '' THEN
        condition := condition || ' AND p.category = ' || category_filter || '';
    END IF;

    IF price_filter IS NOT NULL AND price_filter != '' THEN
        condition := condition || ' AND pp.price = ' || price_filter || '';
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

    sql := sql || condition;

    -- Execute the dynamic SQL and return the result
    RETURN QUERY EXECUTE sql;
END;
$$;


ALTER FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "category_filter" "text", "sub_category_filter" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_name_opts"("category_filter" "text") RETURNS TABLE("label" character varying, "value" character varying)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN query
    SELECT DISTINCT p.name AS value, p.name AS label 
    FROM products p WHERE category = category_filter::BIGINT ORDER BY p.name asc;
END;
$$;


ALTER FUNCTION "public"."get_name_opts"("category_filter" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_price_opts"("category_filter" "text") RETURNS TABLE("label" character varying, "value" character varying)
    LANGUAGE "plpgsql"
    AS $$BEGIN
    RETURN query
   SELECT DISTINCT 
   pp.price::varchar as value, pp.price::varchar as label
   FROM products_prices pp
   LEFT JOIN products p ON p.Id = pp.product
   WHERE category = category_filter::BIGINT;
END;$$;


ALTER FUNCTION "public"."get_price_opts"("category_filter" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."sub_category" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "label" character varying NOT NULL,
    "is_active" boolean DEFAULT true,
    "category" bigint NOT NULL
);


ALTER TABLE "public"."sub_category" OWNER TO "postgres";


COMMENT ON TABLE "public"."sub_category" IS 'Sub category for drinks';



ALTER TABLE "public"."sub_category" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."drinks_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."featured" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "product" bigint NOT NULL
);


ALTER TABLE "public"."featured" OWNER TO "postgres";


COMMENT ON TABLE "public"."featured" IS 'Featured products';



ALTER TABLE "public"."featured" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."featured_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "image_url" character varying NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "is_best_seller" boolean DEFAULT false NOT NULL,
    "category" bigint NOT NULL,
    "updated_at" timestamp without time zone,
    "updated_by" character varying,
    "sub_category" bigint
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products_category" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "label" character varying DEFAULT ''::character varying NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."products_category" OWNER TO "postgres";


COMMENT ON TABLE "public"."products_category" IS 'Categories of foods and drinks';



ALTER TABLE "public"."products_category" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."products" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."products_prices" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "price" bigint NOT NULL,
    "description" character varying,
    "product" bigint NOT NULL
);


ALTER TABLE "public"."products_prices" OWNER TO "postgres";


COMMENT ON TABLE "public"."products_prices" IS 'Products prices with description';



ALTER TABLE "public"."products_prices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_prices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" character varying NOT NULL,
    "username" character varying NOT NULL,
    "is_verified" boolean DEFAULT false NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "id_url" character varying,
    "image_url" character varying,
    "is_admin" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE "public"."users" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."sub_category"
    ADD CONSTRAINT "drinks_category_label_key" UNIQUE ("label");



ALTER TABLE ONLY "public"."sub_category"
    ADD CONSTRAINT "drinks_category_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."featured"
    ADD CONSTRAINT "featured_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."featured"
    ADD CONSTRAINT "featured_product_key" UNIQUE ("product");



ALTER TABLE ONLY "public"."products_category"
    ADD CONSTRAINT "products_category_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products_prices"
    ADD CONSTRAINT "products_prices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."featured"
    ADD CONSTRAINT "featured_product_fkey" FOREIGN KEY ("product") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_fkey" FOREIGN KEY ("category") REFERENCES "public"."products_category"("id");



ALTER TABLE ONLY "public"."products_prices"
    ADD CONSTRAINT "products_prices_product_fkey" FOREIGN KEY ("product") REFERENCES "public"."products"("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_sub_category_fkey" FOREIGN KEY ("sub_category") REFERENCES "public"."sub_category"("id");



ALTER TABLE ONLY "public"."sub_category"
    ADD CONSTRAINT "sub_category_category_fkey" FOREIGN KEY ("category") REFERENCES "public"."products_category"("id") ON DELETE RESTRICT;



CREATE POLICY "Enable read access for all users" ON "public"."featured" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."products" TO "authenticated" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."products_category" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."products_prices" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."sub_category" USING (true);



CREATE POLICY "ReadAll" ON "public"."products_category" TO "anon" USING (true);



ALTER TABLE "public"."featured" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products_category" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products_prices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sub_category" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





























































































































































































GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "sub_category_filter" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "sub_category_filter" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "sub_category_filter" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "category_filter" "text", "sub_category_filter" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "category_filter" "text", "sub_category_filter" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."filter_products"("name_filter" "text", "price_filter" "text", "bestseller" boolean, "active" boolean, "order" "text", "category_filter" "text", "sub_category_filter" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_name_opts"("category_filter" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_name_opts"("category_filter" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_name_opts"("category_filter" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_price_opts"("category_filter" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_price_opts"("category_filter" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_price_opts"("category_filter" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."sub_category" TO "anon";
GRANT ALL ON TABLE "public"."sub_category" TO "authenticated";
GRANT ALL ON TABLE "public"."sub_category" TO "service_role";



GRANT ALL ON SEQUENCE "public"."drinks_category_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."drinks_category_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."drinks_category_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."featured" TO "anon";
GRANT ALL ON TABLE "public"."featured" TO "authenticated";
GRANT ALL ON TABLE "public"."featured" TO "service_role";



GRANT ALL ON SEQUENCE "public"."featured_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."featured_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."featured_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."products_category" TO "anon";
GRANT ALL ON TABLE "public"."products_category" TO "authenticated";
GRANT ALL ON TABLE "public"."products_category" TO "service_role";



GRANT ALL ON SEQUENCE "public"."products_category_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_category_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_category_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."products_prices" TO "anon";
GRANT ALL ON TABLE "public"."products_prices" TO "authenticated";
GRANT ALL ON TABLE "public"."products_prices" TO "service_role";



GRANT ALL ON SEQUENCE "public"."products_prices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_prices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_prices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
