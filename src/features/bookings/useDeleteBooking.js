import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingFN } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClint = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleteing } = useMutation({
    mutationFn: deleteBookingFN,
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      queryClint.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeleteing };
};
