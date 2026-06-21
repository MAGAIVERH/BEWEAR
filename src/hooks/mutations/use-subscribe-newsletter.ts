import { useMutation } from "@tanstack/react-query";

import { subscribeNewsletter } from "@/actions/subscribe-newsletter";

export const getSubscribeNewsletterMutationKey = () =>
  ["subscribe-newsletter"] as const;

export const useSubscribeNewsletter = () =>
  useMutation({
    mutationKey: getSubscribeNewsletterMutationKey(),
    mutationFn: subscribeNewsletter,
  });
