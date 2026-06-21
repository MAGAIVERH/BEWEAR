CREATE TYPE "public"."coupon_discount_type" AS ENUM('percent', 'fixed');--> statement-breakpoint
CREATE TABLE "coupon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"discount_type" "coupon_discount_type" NOT NULL,
	"value" integer NOT NULL,
	"min_order_in_cents" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp,
	"max_redemptions" integer,
	"times_redeemed" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupon_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "coupon_code" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "discount_in_cents" integer DEFAULT 0 NOT NULL;