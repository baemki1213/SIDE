import axios from "axios";
import { Response } from "express";

import { createAddressString } from "../utils/service/createAddressString";

import { Request } from "../types/Express";

interface SearchQuery {
  query: string;
  latitude: number;
  longitude: number;
  distance: number;
}

const serviceController = {
  async fetchStoresInCircle(req: Request, res: Response) {
    const { query, latitude, longitude, distance } = req.query;
    const distanceNumber = Number(distance) as number;

    try {
      const geoResponse = await axios.get(
        "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc",
        {
          params: {
            request: "coordsToaddr",
            coords: `${longitude},${latitude}`,
            sourcecrs: "epsg:4326",
            output: "json",
            orders: "legalcode",
          },
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_CLIENT_KEY,
            "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NAVER_SECRET_KEY,
          },
        }
      );
      console.log(geoResponse.data.results[0], "results!!");
      const addressString = createAddressString(geoResponse.data);
      const completeQuery = `${addressString} ${query}`;

      const searchResponse = await axios.get(
        "https://openapi.naver.com/v1/search/local.json",
        {
          params: {
            query: completeQuery,
            display: 5, // 한 번에 표시할 검색 결과 개수
            start: 1, // 검색 시작 위치
            sort: "random", // 검색 결과 정렬 방법
          },
          headers: {
            "X-Naver-Client-Id":
              process.env.NEXT_PUBLIC_NAVER_SEARCH_CLIENT_KEY,
            "X-Naver-Client-Secret":
              process.env.NEXT_PUBLIC_NAVER_SEARCH_SECRET_KEY,
          },
        }
      );
      const searchResults = searchResponse.data.items;
      const katechBaseX = Number(longitude) * 10000000;
      const katechBaseY = Number(latitude) * 10000000;

      const filteredResults = searchResults.filter((item: any) => {
        const itemX = Number(item.mapx);
        const itemY = Number(item.mapy);
        const itemDistance =
          Math.sqrt(
            Math.pow(itemX - katechBaseX, 2) + Math.pow(itemY - katechBaseY, 2)
          ) / 100;
        return itemDistance <= distanceNumber;
      });
      res.status(200).json(filteredResults);
    } catch (error) {
      res.status(500).json({ message: "서버 내부 오류" });
    }
  },
};

export default serviceController;
