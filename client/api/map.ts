import { requestWithCookie } from "@/utils/Axios-utils";

interface FetchAddressesParams {
  query: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const fetchAddresses = async (params: FetchAddressesParams) => {
  const { query, latitude, longitude, distance } = params;
  return await requestWithCookie({
    method: "get",
    url: `/service/map/circle?latitude=${latitude}&longitude=${longitude}&distance=${distance}&query=${query}`,
  });
};
