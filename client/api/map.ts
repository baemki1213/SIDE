import { requestWithCookie } from "@/utils/Axios-utils";

interface FetchAddressesParams {
  query: string;
  latitude: number | null;
  longitude: number | null;
  distance: number;
  category: string;
}

export const fetchAddresses = async (params: FetchAddressesParams) => {
  const { query, latitude, longitude, distance, category } = params;
  if (!latitude || !longitude) return null;
  return await requestWithCookie({
    method: "get",
    url: `/service/map/circle?latitude=${latitude}&longitude=${longitude}&distance=${distance}&query=${query}&category=${category}&max_page=4`,
  });
};
