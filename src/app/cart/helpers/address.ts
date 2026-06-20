export const formatAddress = (address: {
  recipientName: string;
  street: string;
  complement: string | null;
  city: string;
  state: string;
  zipCode: string;
}) => {
  const complement = address.complement ? `, ${address.complement}` : "";
  return `${address.recipientName} • ${address.street}${complement}, ${address.city}, ${address.state} ${address.zipCode}`;
};
