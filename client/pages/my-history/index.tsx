import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useUserPlaces from "@/hooks/map/useUserPlaces";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

import Gap from "@/components/common/Gap";
import { FullPageLoadingIndicator } from "@/components/common/LoadingIndicator";
import StyledText from "@/components/common/StyledText";

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
            <StyledText text={date} fontColor="black47" fontWeight="bold" />
            <Gap side={10} />
            {groupedPlaces[date].map((place, index) => (
              <S.PlaceCard key={index}>
                <StyledText
                  text={place.place_name}
                  fontColor="black47"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                />
                <Gap side={5} />
                <StyledText
                  text={getLastCategory(place.category_name)}
                  fontSize="xs"
                  fontColor="black47"
                  fontWeight="regular"
                  numberOfLines={1}
                  textAlign="center"
                />
                <Gap side={5} />
                <StyledText
                  text={place.road_address_name}
                  fontSize="xs"
                  fontColor="gray130"
                  fontWeight="regular"
                  numberOfLines={1}
                  textAlign="center"
                />
                <StyledText
                  text={place.phone ? place.phone : "-"}
                  fontSize="xs"
                  fontColor="gray130"
                  numberOfLines={1}
                  textAlign="center"
                />
                <Gap side={5} />
                {place.place_url && (
                  <S.Link
                    href={place.place_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StyledText
                      text="카카오 맵에서 자세히 보기"
                      fontSize="xs"
                      fontColor="pointColor"
                      fontWeight="bold"
                      numberOfLines={1}
                      textAlign="center"
                    />
                  </S.Link>
                )}
                <StyledText
                  text={format(
                    new Date(place.created_at),
                    "yyyy-MM-dd HH:mm:ss",
                    {
                      locale: ko,
                    },
                  )}
                  fontSize="xs"
                  fontWeight="regular"
                  textAlign="center"
                />
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
        <StyledText
          text={`${page} of ${data.meta.totalPages}`}
          fontWeight="bold"
        />
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
