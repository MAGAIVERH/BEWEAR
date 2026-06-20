"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "@/actions/create-shipping-address/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { US_STATES } from "@/helpers/us-states";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { cn } from "@/lib/utils";

type ShippingAddressFormProps = {
  onCreated?: () => void;
};

const ShippingAddressForm = ({ onCreated }: ShippingAddressFormProps) => {
  const createShippingAddressMutation = useCreateShippingAddress();

  const form = useForm<CreateShippingAddressSchema>({
    resolver: zodResolver(createShippingAddressSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      zipCode: "",
      street: "",
      complement: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: CreateShippingAddressSchema) => {
    try {
      await createShippingAddressMutation.mutateAsync(values);
      toast.success("Address saved.");
      form.reset();
      onCreated?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(###) ###-####"
                    placeholder="(555) 123-4567"
                    customInput={Input}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP code</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="#####"
                    placeholder="10001"
                    customInput={Input}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input placeholder="1842 Pearl St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Apt, suite, etc. (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apt 4B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <select
                    className={cn(
                      "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                      !field.value && "text-muted-foreground",
                    )}
                    {...field}
                  >
                    <option value="" disabled>
                      Select a state
                    </option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="rounded-full"
          disabled={createShippingAddressMutation.isPending}
        >
          {createShippingAddressMutation.isPending ? "Saving..." : "Save address"}
        </Button>
      </form>
    </Form>
  );
};

export default ShippingAddressForm;
