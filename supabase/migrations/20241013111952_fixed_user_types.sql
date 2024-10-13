alter table "public"."users" alter column "isActive" set default true;

alter table "public"."users" alter column "isAdmin" set default false;

alter table "public"."users" alter column "isAdmin" set data type boolean using "isAdmin"::boolean;


