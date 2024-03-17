import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import { RatingDTO, ratingSchema } from "./rating-shema";
  import { useToast } from "@/components/ui/use-toast";
  import { useRouter } from "next/navigation";
  


  export function useGetRating() {
    const { toast } = useToast();
    const {
      data: rating,
      isLoading,
      isError,
    } = useQuery<RatingDTO | undefined>({
      queryKey: ["rating"],
      queryFn: () => {
        return fetch("/api/rating")
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
            return ratingSchema.parse(data);
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
    return { rating: rating?.rating, isLoading, isError };
  }
  
  export function useAddToRating() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
      mutationFn: async (body: {
        rating: number;
        userId: number;
        productId: number;
      }) => {
        const response = await fetch("/api/rating", {
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
        queryClient.invalidateQueries({
          queryKey: ["rating"],
        });
      },
    });
  }