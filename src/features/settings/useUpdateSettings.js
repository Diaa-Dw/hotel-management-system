import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export const useUpdateSettings = (newSettings) => {
  const queryClient = useQueryClient();
  const { mutate: editSettings, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("setting updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editSettings, isEditing };
};
