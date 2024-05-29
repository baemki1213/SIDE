import axios from "axios";
import { Response } from "express";

import { createAddressString } from "../utils/service/createAddressString";

import { Request } from "../types/Express";
import {
  getPlaceById,
  getUserPlacesByUserId,
  insertPlace,
  insertUserPlace,
  updatePlace,
} from "../models/map";

const serviceController = {
  async fetchStoresInCircle(req: Request, res: Response) {
    const { query, latitude, longitude, distance, max_page, category } =
      req.query;

    const distanceNumber = Number(distance) as number;
    const maxPage = parseInt(max_page as string, 10) || 1;
    const pageSize = 8;
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
        const kakaoResponse: any = await axios.get(
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
              ...(category !== "TOTAL" && { category_group_code: category }),
            },
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          }
        );
        const pageResults = kakaoResponse.data.documents;

        if (kakaoResponse.data.meta.is_end) {
          results.push(...pageResults);
          break;
        }

        results.push(...pageResults);
        currentPage++;
      }
      res.status(200).json(results.sort((a, b) => a.distance - b.distance));
    } catch (error) {
      res
        .status(500)
        .json({ message: "서버 에러, 잠시 후 다시 시도해주세요." });
    }
  },

  async saveSelection(req: Request, res: Response) {
    const { userId, place } = req.body;
    const { id: placeId } = place;

    try {
      const existingPlace = await getPlaceById(placeId);

      if (existingPlace.length === 0) {
        await insertPlace(place);
      } else {
        await updatePlace(place);
      }

      await insertUserPlace(userId, placeId);

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "서버 에러, 잠시 후 다시 시도해주세요." });
    }
  },
  async getUserPlaces(req: Request, res: Response) {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    try {
      const { places, totalCount } = await getUserPlacesByUserId(
        parseInt(userId, 10),
        limitNumber,
        offset
      );

      const totalPages = Math.ceil(totalCount / limitNumber);

      res.status(200).json({
        data: places,
        meta: {
          totalCount,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "서버 에러, 잠시 후 다시 시도해주세요.",
      });
    }
  },
};

export default serviceController;
