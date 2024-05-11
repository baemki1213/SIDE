import axios from "axios";
import { Response } from "express";

import { createAddressString } from "../utils/service/createAddressString";

import { Request } from "../types/Express";

const serviceController = {
  async fetchStoresInCircle(req: Request, res: Response) {
    const { query, latitude, longitude, distance, max_page, category } =
      req.query;

    const distanceNumber = Number(distance) as number;
    const maxPage = parseInt(max_page as string, 10) || 1;
    const pageSize = 8; // 페이지 당 최대 결과 수
    const results = [];
    let currentPage = 1;

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

      const addressString = createAddressString(geoResponse.data);
      const completeQuery = `${addressString} ${query}`;
      while (currentPage <= maxPage) {
        const kakaoResponse = await axios.get(
          "https://dapi.kakao.com/v2/local/search/keyword.json",
          {
            params: {
              x: longitude, // 기준 경도
              y: latitude, // 기준 위도
              page: currentPage,
              size: pageSize,
              radius: Math.min(distanceNumber, 20000), // 최대 반경 20km
              sort: "accuracy",
              query: completeQuery,
              ...(category !== "RANDOM" && { category_group_code: category }),
            },
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          }
        );
        const pageResults = kakaoResponse.data.documents;

        if (pageResults.length === 0) {
          break;
        }

        results.push(...pageResults);
        currentPage++;
      }
      res.status(200).json(results.sort((a, b) => a.distance - b.distance));
    } catch (error) {
      res.status(500).json({ message: "서버 내부 오류" });
    }
  },
};

export default serviceController;
