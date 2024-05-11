import { requestWithCookie } from "@/utils/Axios-utils";

interface FetchAddressesParams {
  query: string;
  latitude: number | null;
  longitude: number | null;
  distance: number;
}

export const fetchAddresses = async (params: FetchAddressesParams) => {
  const { query, latitude, longitude, distance } = params;
  if (!latitude || !longitude) return null;
  return await requestWithCookie({
    method: "get",
    url: `/service/map/circle?latitude=${latitude}&longitude=${longitude}&distance=${distance}&query=${query}&max_page=4`,
  });
};
