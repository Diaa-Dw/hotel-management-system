import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (booking) => {
      toast.success(`Booking #${booking.id} successfully checked in`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(`There was an error while checking in `);
    },
  });
  return { checkin, isCheckingIn };
};
