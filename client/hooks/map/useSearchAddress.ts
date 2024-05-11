import { fetchAddresses } from "@/api/map";
import { FilterInfo } from "@/types/map";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const useSearchAddress = (
  filterInfo: FilterInfo,
  latitude: number | null,
  longitude: number | null
): UseQueryResult<any[], Error> => {
  const { radius: distance, query, category } = filterInfo;
  return useQuery({
    queryKey: ["searchAddress", query, latitude, longitude, distance, category],
    queryFn: () =>
      fetchAddresses({ query, latitude, longitude, distance, category }),
    enabled: false,
  });
};

export default useSearchAddress;
