import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabins } from "../../services/apiCabins";

export const useDeleteCabin = () => {
  const queryClint = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleteing } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClint.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleteing };
};
