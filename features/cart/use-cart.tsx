import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import { CartDTO, cartSchema } from "./cart-schema";
  import { useToast } from "@/components/ui/use-toast";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  import { ToastAction } from "@/components/ui/toast";
  
  export function useGetCart() {
    const { toast } = useToast();
    const {
      data: cart,
      isLoading,
      isError,
    } = useQuery<CartDTO | undefined>({
      queryKey: ["cart"],
      queryFn: () => {
        return fetch("/api/cart")
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
            return cartSchema.parse(data);
          })
          .catch((error) => {
            if (error.message !== "Unauthorized")
              toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
              });
            return undefined;
          });
      },
    });
    return { cart: cart?.cart, isLoading, isError };
  }
  
  export function useAddToCart() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
      mutationFn: async (body: {
        productId: number;
        quantity: number;
      }) => {
        const response = await fetch("/api/cart", {
          method: "POST",
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
        return response.json();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        if (window.location.pathname !== "/cart")
          toast({
            title: "Success",
            description: "Item added to cart",
            action: (
              <ToastAction
                onClick={() => router.push("/cart")}
                altText="View cart"
              >
                View cart
              </ToastAction>
            ),
          });
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  }
  
  export function useRemoveFromCart() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({
        productId,
      }: {
        productId?: number;
      }) => {
        const response = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });
        if (!response.ok) {
          return Promise.reject(
            new Error("Network response was not ok")
          );
        }
        return response.json();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: (data, productId) => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
        if (productId)
          toast({
            title: "Success",
            description: "Item removed from cart",
          });
        else
          toast({
            title: "Success",
            description: "Cart cleared",
          });
      },
    });
  }
  
  export function useUpdateCart() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (body: {
        productId: number;
        quantity: number;
      }) => {
        const response = await fetch("/api/cart", {
          method: "PATCH",
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
        return response.json();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  }