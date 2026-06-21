"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@/hooks/mutations/use-subscribe-newsletter";

const newsletterSchema = z.object({
  email: z.email("Invalid email."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

const NewsletterForm = () => {
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const subscribeMutation = useSubscribeNewsletter();

  const onSubmit = async (values: NewsletterValues) => {
    try {
      const { alreadySubscribed } = await subscribeMutation.mutateAsync(values);
      if (alreadySubscribed) {
        toast.info("You're already subscribed.");
      } else {
        toast.success("Thanks for subscribing!");
      }
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled={subscribeMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
};

export default NewsletterForm;
