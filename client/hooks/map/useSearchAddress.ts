import { fetchAddresses } from "@/api/map";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useSearchAddress = (
  query: string,
  latitude: number | null,
  longitude: number | null,
  distance: number
): UseQueryResult<any[], Error> => {
  return useQuery({
    queryKey: ["searchAddress", query, latitude, longitude, distance],
    queryFn: () => fetchAddresses({ query, latitude, longitude, distance }),
  });
};

export default useSearchAddress;
