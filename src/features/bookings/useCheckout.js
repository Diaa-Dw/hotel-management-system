import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (booking) => {
      toast.success(`Booking #${booking.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (error) => {
      toast.error(`There was an error while checking out `);
    },
  });
  return { checkout, isCheckingOut };
};
