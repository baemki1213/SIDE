import { PlaceInfo } from "@/types/map";
import { requestWithAuth, requestWithCookie } from "@/utils/Axios-utils";

interface FetchAddressesParams {
  query: string;
  latitude: number | null;
  longitude: number | null;
  distance: number;
  category: string;
}

interface SaveSelectionParams {
  userId: number;
  place: PlaceInfo;
}

interface FetchUserPlacesParams {
  userId: number;
  page: number;
}

export const fetchAddresses = async (params: FetchAddressesParams) => {
  const { query, latitude, longitude, distance, category } = params;
  if (!latitude || !longitude || !category) return null;
  return await requestWithCookie({
    method: "get",
    url: `/service/map/circle?latitude=${latitude}&longitude=${longitude}&distance=${distance}&query=${query}&category=${category}&max_page=4`,
  });
};

export const saveSelection = async (data: SaveSelectionParams) => {
  if (!data) return null;
  return await requestWithAuth({
    method: "post",
    url: `/service/map/save-place-and-user`,
    data,
  });
};

export const fetchUserPlaces = async ({
  userId,
  page,
}: FetchUserPlacesParams) => {
  return await requestWithAuth({
    method: "get",
    url: `/service/map/userPlaces/${userId}?page=${page}`,
    data: {},
  });
};
