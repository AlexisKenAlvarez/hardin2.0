alter table "public"."products" add column "category" bigint not null;

alter table "public"."products" add constraint "products_category_fkey" FOREIGN KEY (category) REFERENCES products_category(id) not valid;

alter table "public"."products" validate constraint "products_category_fkey";


