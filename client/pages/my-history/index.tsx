import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import useUserPlaces from "@/hooks/map/useUserPlaces";
import { useAppSelector } from "@/hooks/reduxHook";

import Gap from "@/components/common/Gap";
import { FullPageLoadingIndicator } from "@/components/common/LoadingIndicator";
import Text from "@/components/common/Text";

import { selectAuthState } from "@/store/authSlice";
import { PlaceInfo } from "@/types/map";
import { getLastCategory } from "@/utils/string";

import * as S from "../../styles/my-history/my-history";

const MyHistory = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { isLogin, userInfo } = useAppSelector(selectAuthState);

  useEffect(() => {
    if (!isLogin) {
      router.push("/account/login");
    }
  }, [isLogin, router]);

  const { data, isLoading, isError } = useUserPlaces(userInfo.id, page);

  const groupPlacesByDate = (places: PlaceInfo[]) => {
    return places.reduce(
      (acc, place) => {
        const date = format(new Date(place.created_at), "yyyy-MM-dd", {
          locale: ko,
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(place);
        return acc;
      },
      {} as { [key: string]: PlaceInfo[] },
    );
  };

  if (isLoading || isError) return <FullPageLoadingIndicator />;

  const groupedPlaces = groupPlacesByDate(data.data);

  return (
    <S.Wrapper>
      <S.PlacesContainer>
        {Object.keys(groupedPlaces).map((date) => (
          <S.DateGroup key={date}>
            <Text className="text-black-47 text-lg font-bold">{date}</Text>
            <Gap side={10} />
            {groupedPlaces[date].map((place, index) => (
              <S.PlaceCard key={index}>
                <Text className="text-black-47 text-lg font-bold text-center">
                  {place.place_name}
                </Text>
                <Gap side={5} />
                <Text className="text-black-47 text-xs font-normal truncate text-center">
                  {getLastCategory(place.category_name)}
                </Text>
                <Gap side={5} />
                <Text className="text-gray130 text-xs font-normal truncate text-center">
                  {place.road_address_name}
                </Text>
                <Text className="text-gray130 text-xs font-normal truncate text-center">
                  {place.phone ? place.phone : "-"}
                </Text>
                <Gap side={5} />
                {place.place_url && (
                  <S.Link
                    href={place.place_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text className="text-pointColor text-xs font-bold truncate text-center">
                      카카오 맵에서 자세히 보기
                    </Text>
                  </S.Link>
                )}
                <Text className="text-xs font-normal text-center">
                  {format(new Date(place.created_at), "yyyy-MM-dd HH:mm:ss", {
                    locale: ko,
                  })}
                </Text>
              </S.PlaceCard>
            ))}
          </S.DateGroup>
        ))}
      </S.PlacesContainer>

      <S.Pagination>
        <S.Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          이전
        </S.Button>
        <Text className="font-bold">{`${page} of ${data.meta.totalPages}`}</Text>
        <S.Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= data.meta.totalPages}
        >
          다음
        </S.Button>
      </S.Pagination>
    </S.Wrapper>
  );
};

export default MyHistory;
