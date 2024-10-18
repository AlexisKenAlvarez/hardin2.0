SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'bc737916-a987-436c-8c3d-b22a49ce4543', '{"action":"user_signedup","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"github"}}', '2024-10-14 09:01:50.319066+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2b87438-2f09-4ae4-b916-a3dd390e8a24', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-14 09:03:06.051819+00', ''),
	('00000000-0000-0000-0000-000000000000', '04218c7c-0c22-4a2d-9e7e-8828b5bfe316', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-14 09:13:45.095632+00', ''),
	('00000000-0000-0000-0000-000000000000', '08de986e-1c9f-4201-b2b5-30313558236b', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-14 09:13:45.117991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a90aad0f-d6f6-4970-917c-17e092c85c35', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-14 10:57:17.988016+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bad4aea-dcf5-420e-8ff6-eb0c087192a9', '{"action":"token_revoked","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-14 10:57:17.989802+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c775ddbd-83bc-4c09-8fda-b27ba2a2e428', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-14 10:58:59.151651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8af7998-a408-4a04-8c36-3b66e0b8ed52', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-15 05:41:18.742126+00', ''),
	('00000000-0000-0000-0000-000000000000', '411536cb-f5a5-41dc-947f-1b5544621437', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-15 05:46:41.258412+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c8d651a-a4e0-4b49-8bdd-f5837d957584', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-15 05:47:16.071763+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ab0c8f3-368a-40a7-bc17-877c8f65eb6d', '{"action":"token_refreshed","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-10-15 05:47:16.103405+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc522733-d1d9-4e5e-b133-ebd8ee1e32ba', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 05:47:38.768818+00', ''),
	('00000000-0000-0000-0000-000000000000', '99d5aba7-4f44-4993-9d50-b725d857c335', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 06:07:52.120104+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a1656fb-d547-447e-905a-d58a136a1a93', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 06:07:52.139637+00', ''),
	('00000000-0000-0000-0000-000000000000', '63a50b7a-6237-4c0d-adcf-ad0a077b950c', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 06:16:56.404154+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e90c0f3-f8f6-4de9-abf2-54e4e1b14639', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 06:21:39.833842+00', ''),
	('00000000-0000-0000-0000-000000000000', '84c59f85-c27e-491e-a7a0-94dba69adfd1', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 06:21:39.847587+00', ''),
	('00000000-0000-0000-0000-000000000000', '4cec08bb-901d-49e5-8330-9ac3288f1f2d', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 06:21:39.86874+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d05cfdc-85c8-4819-8ac8-6dec69ee3497', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 06:23:37.722313+00', ''),
	('00000000-0000-0000-0000-000000000000', '86620d97-911e-44d9-92fe-8ea4a90f755f', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 06:23:37.787418+00', ''),
	('00000000-0000-0000-0000-000000000000', '44a7efba-fd16-44df-bab4-848184379bb9', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 06:23:38.960651+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1198683-1a5a-46a3-8f06-9c13e383cae8', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 06:25:42.165443+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2acd061-de2b-419b-82e3-d28aee71c32d', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 06:25:42.184692+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f88da30-b3be-45f5-9847-4d1826057f90', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 06:25:42.21621+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cacbc3ba-0b60-4220-853f-dcd05e6850b4', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 06:27:04.142895+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd95a421b-1737-43ca-92e2-6ee43f3b9be7', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 06:27:04.156562+00', ''),
	('00000000-0000-0000-0000-000000000000', '783fbdcc-4ab3-4b71-bffb-6a2deb0bf013', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 06:27:04.168674+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5a53ec5-afcc-4c2f-8a15-e0abe37fe321', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 09:27:19.969439+00', ''),
	('00000000-0000-0000-0000-000000000000', '5db55b34-1094-4f1b-8a61-ab9b210a8566', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 09:27:19.992876+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2d701d6-7695-4e30-9b4a-240b26d5cbd7', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 09:27:20.019283+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3683d8a-7703-413e-ad76-26939168e16f', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 09:27:35.810406+00', ''),
	('00000000-0000-0000-0000-000000000000', '30ecd30d-8b2a-4ca2-99dd-0137fe97d64d', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 09:27:35.828099+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bd7e52f-cf2e-44a0-997d-7b16cb4a3ba9', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 09:27:35.841597+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5771feb-2de1-4f31-88e4-4bfde032b241', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 09:27:45.13893+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1bc8e11-344c-4212-856b-4f8ac70cbf6f', '{"action":"login","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 09:27:45.158688+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ff4006ec-051f-4072-a697-dca220347b7e', '{"action":"logout","actor_id":"5f7a5acf-a2c4-44ec-9151-36aaf453769e","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 09:27:45.171882+00', ''),
	('00000000-0000-0000-0000-000000000000', '61f7f398-cd06-4cb7-9998-dd5a1e201349', '{"action":"user_signedup","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"github"}}', '2024-10-15 11:45:35.463222+00', ''),
	('00000000-0000-0000-0000-000000000000', '866559b7-c477-4809-b65c-776c16e6bd9a', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:45:35.48567+00', ''),
	('00000000-0000-0000-0000-000000000000', '5437f1eb-7d6b-455e-83bb-c1ae4476d418', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:45:41.931362+00', ''),
	('00000000-0000-0000-0000-000000000000', '77ae84c6-7021-4792-aac6-ba1600098f10', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 11:46:01.316974+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6f2248c-1d2e-4691-9f5b-6ad4fae456bb', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 11:46:01.333144+00', ''),
	('00000000-0000-0000-0000-000000000000', '977d1c98-6127-4141-a280-798371c0310b', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:46:01.349435+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c6e120a-2075-4dfa-b20b-aa4efacd6f4b', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:46:06.407238+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bee212f7-0092-482b-ac3d-5dcf9ec3d819', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:46:06.421727+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e3d5a73a-6eba-4e57-9619-6dfe038d7199', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:46:06.436596+00', ''),
	('00000000-0000-0000-0000-000000000000', '53f37177-cdc4-46e8-9c32-a6643209170c', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:49:22.332424+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c3e74aa-cc4a-4398-8cd1-9acd9070ccb4', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:49:22.350466+00', ''),
	('00000000-0000-0000-0000-000000000000', '4235d4ac-50bc-43fa-b81d-08cffa741982', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:49:22.368879+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f51e3e8f-bd6f-4246-80a2-0cc5f1696e98', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:49:56.233986+00', ''),
	('00000000-0000-0000-0000-000000000000', '97179b37-8764-4ddb-9cd8-7797fecb86ee', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:49:56.25243+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3c51e34-2815-41ec-9894-fb95ede61cd1', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:49:56.268133+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a722743-39b6-4cf4-8ee0-1ee220cb4e7a', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:51:05.063993+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e32e176-23b6-49c8-af03-79b37600b7d3', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:51:05.077143+00', ''),
	('00000000-0000-0000-0000-000000000000', '51b9d69e-dfc3-4cc7-a128-fa6fb8a4a1b1', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:51:05.090797+00', ''),
	('00000000-0000-0000-0000-000000000000', '2880aaae-d011-4ab2-8db9-46ecbf62eb75', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:51:20.99856+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf12bfaf-6ef2-4c3c-923b-d47be293635c', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:51:21.013314+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb121829-35a3-4fcc-9c29-724e0378edc2', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:51:21.030639+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c198879-ac5c-40d6-b7b6-02af895b9e53', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 11:52:38.824274+00', ''),
	('00000000-0000-0000-0000-000000000000', '622115bb-1d4c-4330-86fa-921bc5d17905', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 11:52:38.84014+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8c761ac-30b6-46c8-aa8a-6787d3be1d22', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:52:38.858142+00', ''),
	('00000000-0000-0000-0000-000000000000', '50714efd-e0ce-4021-bf1b-59032d80b494', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:53:31.384501+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b966107-d5b0-4a06-9b80-27f95cb4ad13', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:53:31.399078+00', ''),
	('00000000-0000-0000-0000-000000000000', '55393129-f83d-47d6-a2b6-b080982be5f0', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:53:31.413557+00', ''),
	('00000000-0000-0000-0000-000000000000', '0802b6a2-dd3e-4ed1-8493-e2fbeedf6314', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:55:56.531137+00', ''),
	('00000000-0000-0000-0000-000000000000', '12d4d27f-0cf8-4237-afb3-0a6ccbf415f4', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:55:56.549779+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdb78d8f-cb4f-4837-a41c-68d474886f24', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:55:56.564042+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d2f5a05-abd0-46aa-bc50-56b7408779ea', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 11:59:16.720382+00', ''),
	('00000000-0000-0000-0000-000000000000', '24ca8697-67a2-4800-92b6-5b19ee43faf4', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 11:59:16.736648+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc226844-1d4f-4e5a-a75b-8c0f616d7f64', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 11:59:16.758096+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa8dbb92-9db9-491b-b732-ef3f5ab3f8ee', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 12:02:10.330746+00', ''),
	('00000000-0000-0000-0000-000000000000', '79530b13-705f-4628-9edc-f0178818df6b', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 12:02:10.348582+00', ''),
	('00000000-0000-0000-0000-000000000000', 'edb4b555-19dd-4b2a-9613-81105e8ab686', '{"action":"identity_unlinked","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"","traits":{"identity_id":"b387c0e1-6598-4563-8e04-c483ded5e490","provider":"google","provider_id":"117310600137025621076"}}', '2024-10-15 12:02:10.364739+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd82ff444-e005-4d55-81b6-148b9f83c8cd', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:02:10.37367+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0d82f3e-0c7f-4f62-a8ba-09f6a3728c5f', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:02:39.057528+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da59a95b-3578-42cb-a43c-f4b80d227deb', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:02:39.071446+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b449c55-3b14-4244-9ad1-09bb62a52dc5', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:02:39.08839+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9e73e77-2129-43f0-8bef-a45a2bdcdfd1', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:03:11.362972+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d301266-76c4-42c6-ad51-0d59739d8bc7', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:03:11.376535+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ca149a7-a7f4-42b6-9b8e-16b98156ce0d', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:03:11.396839+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b97d7601-8e33-4eae-b92c-04b8be2ef270', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:03:46.414277+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b14fa03-47ff-43eb-9ffa-d1fafc68d332', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:03:46.42837+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a04f10d-2ad3-40f4-ad80-2764c275044e', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:03:46.445758+00', ''),
	('00000000-0000-0000-0000-000000000000', '182e4d40-e18f-44f4-985a-6f8c05bd3025', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:04:48.95712+00', ''),
	('00000000-0000-0000-0000-000000000000', '30dd917c-ff51-446f-a5ec-54f757e9864c', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:04:48.974363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc77342a-00ec-48bd-a084-a593a4c973a7', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:06:01.580145+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b8ae94c-30b4-471d-8214-9c790d3d9b48', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 12:06:08.928812+00', ''),
	('00000000-0000-0000-0000-000000000000', '99a86fd7-7884-435b-934d-54ff3c965972', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 12:06:08.942544+00', ''),
	('00000000-0000-0000-0000-000000000000', '02743e5c-0351-41f2-8a42-5d531d6538a9', '{"action":"identity_unlinked","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"","traits":{"identity_id":"150aee63-9fcd-4c53-984a-17feeb414744","provider":"google","provider_id":"117310600137025621076"}}', '2024-10-15 12:06:08.955279+00', ''),
	('00000000-0000-0000-0000-000000000000', '886953f6-b358-4603-8fd2-a3e48840ff52', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:06:08.96434+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0a83c72-caf1-4f01-b84e-b013fdfb5b91', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 12:06:14.313359+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b46d2de-0680-425d-8d02-e327d3c8b9cf', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 12:06:14.339513+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c87bd575-8c07-4c7e-ae79-d74bf300b60a', '{"action":"identity_unlinked","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"","traits":{"identity_id":"3f8976df-d6aa-4725-916c-1a95ce2d2978","provider":"google","provider_id":"117310600137025621076"}}', '2024-10-15 12:06:14.353291+00', ''),
	('00000000-0000-0000-0000-000000000000', '65abe6f3-a099-4b2f-b4a0-556e6f4d1406', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:06:14.361424+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e934b04-bda0-4398-9297-8050fc5399fd', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:06:17.55699+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f7af015-4b77-45f0-b419-c2c3101514bc', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:06:17.567969+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df7e4e97-f905-49e6-aaae-2ae8f085fd39', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:06:18.861514+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb9298c1-d68c-48ab-aa12-0fa0cf66262c', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-10-15 12:09:21.819313+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eaf61ff1-d52c-4f55-9304-5b5709b25a35', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 12:09:21.839406+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a0514607-1aee-4222-a9c3-8ddd85d9b612', '{"action":"identity_unlinked","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"","traits":{"identity_id":"57f4a478-7bf0-44c8-86bc-0564050d8a03","provider":"google","provider_id":"117310600137025621076"}}', '2024-10-15 12:09:21.857658+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e963891-b060-4291-9ab6-834cbcb2ae58', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:09:21.868186+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a101458-f7dc-4587-98c2-324d4f65a889', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:12:03.225503+00', ''),
	('00000000-0000-0000-0000-000000000000', '5bb97b38-741c-4859-8d57-a14114ad0a1b', '{"action":"login","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:12:03.239261+00', ''),
	('00000000-0000-0000-0000-000000000000', '0122f998-e2d4-4ce8-9e1d-675b0325b668', '{"action":"logout","actor_id":"eece1a05-2f86-4d0e-844e-f8693fce1993","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:12:11.145879+00', ''),
	('00000000-0000-0000-0000-000000000000', '92ee381f-0897-4c1b-b666-4e12cb8cafb0', '{"action":"user_signedup","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}', '2024-10-15 12:12:27.841392+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfdfd6d8-736f-4950-91a4-aa31156d79f7', '{"action":"login","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}', '2024-10-15 12:12:27.860457+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5484ffb-131f-45bb-b20a-1c1536d1b7fa', '{"action":"logout","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:12:29.457461+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd7417402-27b7-48ef-adaf-bde6aac922ec', '{"action":"login","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"github"}}', '2024-10-15 12:12:32.190378+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d89a1c0-4f3a-455f-bc60-24e0b6342079', '{"action":"login","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"github"}}', '2024-10-15 12:12:32.20114+00', ''),
	('00000000-0000-0000-0000-000000000000', '9fce4a95-40cd-4f6b-b577-3cdaee9edb6c', '{"action":"identity_unlinked","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"","traits":{"identity_id":"1a5b0648-0cd2-4442-90d4-8054822ec6c2","provider":"github","provider_id":"80466376"}}', '2024-10-15 12:12:32.214759+00', ''),
	('00000000-0000-0000-0000-000000000000', '691d6914-94fc-43a6-928e-d265e3ac7759', '{"action":"logout","actor_id":"6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5","actor_name":"Alexis Ken Alvarez","actor_username":"alexisken1432@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-15 12:12:32.222084+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('0bbf8a90-707e-4a07-8b54-37c94256c68a', NULL, '017475a9-4296-4398-8645-8ed6ed4e2787', 's256', 'Jyrz6BATlH9SVRbdZhzUu6bT-8RDCkOeag2JymfriJI', 'github', '', '', '2024-10-14 08:13:55.997957+00', '2024-10-14 08:13:55.997957+00', 'oauth', NULL),
	('08fb1619-bf15-4863-b19b-17d8878061ec', NULL, '75ba67ca-1e7e-4c46-b4ae-ed9042be4a56', 's256', 'wD7Rrw-pBnD8FfeZIvJrj1qmKIjFmod_G1JtZRhn_QQ', 'github', '', '', '2024-10-14 08:14:01.786739+00', '2024-10-14 08:14:01.786739+00', 'oauth', NULL),
	('ad6bafe0-733d-4df2-8d6f-f06ed0afd9c9', NULL, '7c85152b-7929-4009-b08e-bd10bbd10793', 's256', 'PoEeHEwiPEvx866tTRzAjvZZRM-dsxchqmtKpTmsVvA', 'github', '', '', '2024-10-14 08:23:25.613724+00', '2024-10-14 08:23:25.613724+00', 'oauth', NULL),
	('502e9aff-ffe8-4fac-a906-500abe6e1ab0', NULL, '1ec211a5-3d8e-43c3-9dba-5f02c8b4a84f', 's256', 'Zz_avgdWvmy5Q8jF95TCMAXXh-ZCQvMFQdscxgXAo5o', 'github', '', '', '2024-10-14 08:50:27.424926+00', '2024-10-14 08:50:27.424926+00', 'oauth', NULL),
	('0366350a-78ab-4306-9f9b-28f608476370', NULL, '8a7a4a15-c47c-438a-b879-38debad1ebcf', 's256', 'hJ87aDXskHjEj_WcuvG6PrKOwt8_KX4yIs7KvR__onE', 'github', '', '', '2024-10-14 08:50:47.08408+00', '2024-10-14 08:50:47.08408+00', 'oauth', NULL),
	('43046e06-1b2b-4523-a6dd-da5679989def', '5f7a5acf-a2c4-44ec-9151-36aaf453769e', '190b692a-6ec6-46b5-b08f-e3f00f1ad7a1', 's256', 'Zw3zaXglIp8yeO4CgGbHkWJEO6z0Jps0nCTcP4RQKDo', 'github', 'ghu_hxWCfnVo1c0GyLkx6Ua7SDdCJ5f1d71MOVyr', 'ghr_5Tk5Qbr6U1d2y2E03VcidD97qF974StxBgS99fgBaJFCd2j1rGpWmCYGH57cq1wjc1ZSh304Ei2H', '2024-10-14 09:01:43.126683+00', '2024-10-14 09:01:50.322139+00', 'oauth', '2024-10-14 09:01:50.322114+00'),
	('85e7e7d4-82ae-4a1f-87ec-91ca4a9ef8f5', '5f7a5acf-a2c4-44ec-9151-36aaf453769e', '268fc456-093c-4d4d-8e91-cc046adb191f', 's256', 'sKlxL6JfxIP2LrkeeYfos7iQiQt1Ph81oebsiLd4Ky8', 'github', 'ghu_s5t1Uo9cqlKZlzKTs8YUKZRw4DnXKo1DkCGa', 'ghr_N4bilN3lwjV7Nt7Zl0pzwm9CU38iMtUhAg7OJc8qKg6jf1YQ1SODw6K8b4GJt1VeYFPLAY06B9iH', '2024-10-14 09:03:04.05486+00', '2024-10-14 09:03:06.052386+00', 'oauth', '2024-10-14 09:03:06.052362+00'),
	('de17ec92-c28e-4e53-aaa3-5f656cfda2a6', NULL, '89fa83f3-7f8d-4270-ac08-1eb49b89fca2', 's256', 'XkXmFrr2OyGfv_dMr08a5heAmi1H7bzs_xb_G39L4bM', 'google', '', '', '2024-10-15 09:27:46.935776+00', '2024-10-15 09:27:46.935776+00', 'oauth', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5', 'authenticated', 'authenticated', 'alexisken1432@gmail.com', NULL, '2024-10-15 12:12:27.842145+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-10-15 12:12:32.201832+00', '{"provider": "google", "providers": ["google"]}', '{"iss": "https://api.github.com", "sub": "80466376", "name": "Alexis Ken Alvarez", "email": "alexisken1432@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJQcdlimCqv79FzYzzcHKXVw7jMNdJAZ1s5GLIQPmDmvQi3dlCn=s96-c", "full_name": "Alexis Ken Alvarez", "user_name": "AlexisKenAlvarez", "avatar_url": "https://avatars.githubusercontent.com/u/80466376?v=4", "provider_id": "80466376", "email_verified": true, "phone_verified": false, "preferred_username": "AlexisKenAlvarez"}', NULL, '2024-10-15 12:12:27.837559+00', '2024-10-15 12:12:32.216143+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('117310600137025621076', '6e4d60b6-8c6e-4f65-878c-3aa6f8c0e9f5', '{"iss": "https://accounts.google.com", "sub": "117310600137025621076", "name": "Alexis Ken Alvarez", "email": "alexisken1432@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJQcdlimCqv79FzYzzcHKXVw7jMNdJAZ1s5GLIQPmDmvQi3dlCn=s96-c", "full_name": "Alexis Ken Alvarez", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJQcdlimCqv79FzYzzcHKXVw7jMNdJAZ1s5GLIQPmDmvQi3dlCn=s96-c", "provider_id": "117310600137025621076", "email_verified": true, "phone_verified": false}', 'google', '2024-10-15 12:12:27.839239+00', '2024-10-15 12:12:27.839266+00', '2024-10-15 12:12:27.839266+00', '012be1c4-ae2e-4a0b-bb87-4ee24d4e09ad');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: products_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products_category" ("id", "created_at", "label", "isActive") VALUES
	(1, '2024-10-16 06:47:35.148966+00', 'Espresso (Hot)', true),
	(2, '2024-10-16 06:48:13.18377+00', 'Espresso (Cold)', true),
	(3, '2024-10-16 06:48:31.374969+00', 'Non Coffee', true),
	(4, '2024-10-16 06:48:36.057179+00', 'Croffles', true),
	(5, '2024-10-16 06:48:42.044256+00', 'Rice meals', true);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "created_at", "email", "username", "isVerified", "isActive", "id_url", "image_url", "isAdmin") VALUES
	(1, '2024-10-13 11:23:03.397141+00', 'alexisken1432@gmail.com', 'AlexisKenAlvarez', true, true, NULL, NULL, true);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 33, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: products_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."products_category_id_seq"', 5, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."products_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 1, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
