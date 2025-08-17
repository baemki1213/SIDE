import { fetchUserPlaces } from "@/api/map";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useUserPlaces = (
  userId: number,
  page: number
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    queryKey: ["userPlaces", userId, page],
    queryFn: () => fetchUserPlaces({ userId, page }),
  });
};

export default useUserPlaces;
