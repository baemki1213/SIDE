import { fetchUserPlaces } from "@/api/map";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useUserPlaces = (
  userId: number,
  page: number,
  token: string,
  dispatch: any
): UseQueryResult<any, Error> => {
  return useQuery<any, Error>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["userPlaces", userId, page],
    queryFn: () => fetchUserPlaces({ userId, page }, token, dispatch),
    keepPreviousData: true,
  });
};

export default useUserPlaces;
