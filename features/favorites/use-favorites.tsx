import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import { FavoritesDTO, favoritesSchema } from "./favorites-shema";
  import { useToast } from "@/components/ui/use-toast";
  import { useRouter } from "next/navigation";
  import { ToastAction } from "@/components/ui/toast";



export function useGetFavorites() {
    const { toast } = useToast();
    const {
      data: favorites,
      isLoading,
      isError,
    } = useQuery<FavoritesDTO | undefined>({
      queryKey: ["favorites"],
      queryFn: () => {
        return fetch("/api/favorites")
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
            return favoritesSchema.parse(data);
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
    return { favorites: favorites?.favorites, isLoading, isError };
  }
  
  export function useAddToFavorites() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
      mutationFn: async (body: {
        productId: number;
      }) => {
        const response = await fetch("/api/favorites", {
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
        if (window.location.pathname !== "/favorites") 
          toast({
            title: "Success",
            description: "Item added to favorites list",
            action: (
              <ToastAction
                onClick={() => router.push("/favorites")}
                altText="View favorites list"
              >
                View favorites list
              </ToastAction>
            ),
          });
        queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });
      },
    });
  }
  
  export function useRemoveFromFavorites() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({
        productId,
      }: {
        productId?: number;
      }) => {
        const response = await fetch("/api/favorites", {
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
          queryKey: ["favorites"],
        });
        if (productId)
          toast({
            title: "Success",
            description: "Item removed from favorites",
          });
        else
          toast({
            title: "Success",
            description: "Cart cleared",
          });
      },
    });
  }