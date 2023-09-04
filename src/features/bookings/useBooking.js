import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabase";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  if (error) throw new Error("something went wrong while get booking");
  return { isLoading, booking };
};
