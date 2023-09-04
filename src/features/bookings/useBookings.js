import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export const useBookings = () => {
  const queryClint = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [filed, direction] = sort.split("-");

  //filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sort
  const sortBy = !sort
    ? null
    : {
        field: filed,
        method: direction,
      };

  //pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  console.log(page);
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  //PRE_FETCHING
  const pageCount = Math.ceil(data?.count / PAGE_SIZE);
  if (page < pageCount) {
    queryClint.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  return { isLoading, error, bookings: data?.data, count: data?.count, page };
};
