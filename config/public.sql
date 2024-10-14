/*
 Navicat Premium Data Transfer

 Source Server         : Postgre Local 52
 Source Server Type    : PostgreSQL
 Source Server Version : 130013 (130013)
 Source Host           : 127.0.0.1:5432
 Source Catalog        : ppob
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130013 (130013)
 File Encoding         : 65001

 Date: 14/10/2024 12:44:29
*/


-- ----------------------------
-- Sequence structure for balances_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."balances_id_seq";
CREATE SEQUENCE "public"."balances_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for banners_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."banners_id_seq";
CREATE SEQUENCE "public"."banners_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for services_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."services_id_seq";
CREATE SEQUENCE "public"."services_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for transactions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."transactions_id_seq";
CREATE SEQUENCE "public"."transactions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for balances
-- ----------------------------
DROP TABLE IF EXISTS "public"."balances";
CREATE TABLE "public"."balances" (
  "id" int4 NOT NULL DEFAULT nextval('balances_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "balance" int4
)
;

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS "public"."banners";
CREATE TABLE "public"."banners" (
  "id" int4 NOT NULL DEFAULT nextval('banners_id_seq'::regclass),
  "banner_name" varchar(255) COLLATE "pg_catalog"."default",
  "banner_image" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS "public"."services";
CREATE TABLE "public"."services" (
  "id" int4 NOT NULL DEFAULT nextval('services_id_seq'::regclass),
  "service_code" varchar(255) COLLATE "pg_catalog"."default",
  "service_name" varchar(255) COLLATE "pg_catalog"."default",
  "service_icon" varchar(255) COLLATE "pg_catalog"."default",
  "service_tarif" int4
)
;

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS "public"."transactions";
CREATE TABLE "public"."transactions" (
  "id" int4 NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "invoice_number" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "service_code" varchar(50) COLLATE "pg_catalog"."default",
  "service_name" varchar(255) COLLATE "pg_catalog"."default",
  "transaction_type" varchar(50) COLLATE "pg_catalog"."default",
  "total_amount" int4 NOT NULL,
  "created_on" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "email" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "profile_image" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."balances_id_seq"
OWNED BY "public"."balances"."id";
SELECT setval('"public"."balances_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."banners_id_seq"
OWNED BY "public"."banners"."id";
SELECT setval('"public"."banners_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."services_id_seq"
OWNED BY "public"."services"."id";
SELECT setval('"public"."services_id_seq"', 12, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."transactions_id_seq"
OWNED BY "public"."transactions"."id";
SELECT setval('"public"."transactions_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table balances
-- ----------------------------
ALTER TABLE "public"."balances" ADD CONSTRAINT "balances_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table services
-- ----------------------------
ALTER TABLE "public"."services" ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table transactions
-- ----------------------------
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table balances
-- ----------------------------
ALTER TABLE "public"."balances" ADD CONSTRAINT "fk_user" FOREIGN KEY ("email") REFERENCES "public"."users" ("email") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table transactions
-- ----------------------------
ALTER TABLE "public"."transactions" ADD CONSTRAINT "fk_user" FOREIGN KEY ("email") REFERENCES "public"."users" ("email") ON DELETE CASCADE ON UPDATE NO ACTION;
