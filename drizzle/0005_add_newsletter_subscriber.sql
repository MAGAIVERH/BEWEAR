CREATE TABLE "newsletter_subscriber" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscriber_email_unique" UNIQUE("email")
);
