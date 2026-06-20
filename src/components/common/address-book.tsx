"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { formatAddress } from "@/app/cart/helpers/address";
import { Button } from "@/components/ui/button";
import { shippingAddressTable } from "@/db/schema";
import { useDeleteShippingAddress } from "@/hooks/mutations/use-delete-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

import ShippingAddressForm from "./shipping-address-form";

type AddressBookProps = {
  initialAddresses: (typeof shippingAddressTable.$inferSelect)[];
};

const AddressBook = ({ initialAddresses }: AddressBookProps) => {
  const { data: addresses } = useUserAddresses({
    initialData: initialAddresses,
  });
  const deleteShippingAddressMutation = useDeleteShippingAddress();
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: string) => {
    deleteShippingAddressMutation.mutate(id, {
      onSuccess: () => toast.success("Address removed."),
      onError: () => toast.error("This address can't be removed."),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Addresses</h2>
        {!showForm && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add address
          </Button>
        )}
      </div>

      {addresses && addresses.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="flex items-start justify-between gap-3 rounded-xl border p-4"
            >
              <p className="text-sm">{formatAddress(address)}</p>
              <button
                type="button"
                aria-label="Remove address"
                onClick={() => handleDelete(address.id)}
                disabled={deleteShippingAddressMutation.isPending}
                className="text-muted-foreground hover:text-foreground shrink-0 transition-colors disabled:opacity-50"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !showForm && (
          <p className="text-muted-foreground text-sm">
            You don&apos;t have any saved addresses yet.
          </p>
        )
      )}

      {showForm && (
        <div className="rounded-xl border p-4">
          <ShippingAddressForm onCreated={() => setShowForm(false)} />
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
