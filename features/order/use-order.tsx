import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { Order } from "@prisma/client";
import { OrderDTO, orderSchema } from "./order-schema";


export function useCreateOrder() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: {
      address: string,
    }) => {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        return Promise.reject(
          new Error("Network response was not ok")
        );
      }
      const res: Order = await response.json();
      return res
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
        toast({
          title: "Success",
          description: "Successful order",
        });
      router.push('/orders')
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    }
  })
}

export function useGetOrder() {
  const { toast } = useToast();
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<OrderDTO | undefined>({
    queryKey: ["order"],
    queryFn: () => {
      return fetch("/api/order")
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Unauthorized");
            }
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          try {
            return orderSchema.parse(data);
          } catch (error) {
            console.error('Error parsing data:', error);
            throw error; 
          }
        })
        .catch((error) => {
          if (error.message !== "Unauthorized") {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
          return undefined;
        });
    },
  });
  return { order: order?.order, isLoading, isError };
}