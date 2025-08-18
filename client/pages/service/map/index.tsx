import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { useRouter } from "next/router";

import useLatLng from "@/hooks/map/useLatLng";
import useSaveSelection from "@/hooks/map/useSaveSelection";
import useSearchAddress from "@/hooks/map/useSearchAddress";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";

import { FullPageLoadingIndicator } from "@/components/common/LoadingIndicator";
import StyledText from "@/components/common/StyledText";
import CenterMarkerButton from "@/components/service/map/CenterMarkerButton";
import BattleButton from "@/components/service/map/CenterMarkerButton/BattleButton";
import BattleModal from "@/components/service/map/CenterMarkerButton/BattleModal";
import RandomPickButton from "@/components/service/map/CenterMarkerButton/RandomPickButton";
import CurrentLocationButton from "@/components/service/map/CurrentLocationButton";
import FilterButton from "@/components/service/map/FilterButton";
import InfoWindowContent from "@/components/service/map/InfoWindowContainer";

import { selectAuthState } from "@/store/authSlice";
import { openModal } from "@/store/modalSlice";
import { showToast } from "@/store/toastSlice";
import { colors } from "@/styles/assets";
import { FilterInfo, PlaceInfo } from "@/types/map";

import * as S from "../../../styles/service/map";

const Maps: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const currentCircleRef = useRef<naver.maps.Circle | null>(null);
  const centerMarkerRef = useRef<naver.maps.Marker | null>(null);
  const markersRef = useRef<Array<naver.maps.Marker>>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const { userInfo, isLogin } = useAppSelector(selectAuthState);
  const userId = userInfo.id;

  const [filterInfo, setFilterInfo] = useState<FilterInfo>({
    query: "",
    category: "",
    radius: 500,
  });

  const { position, setPosition, isLoading: isLatLngLoading } = useLatLng();
  const { data: searchData, refetch } = useSearchAddress(
    filterInfo,
    position.latitude,
    position.longitude,
  );

  const closeInfoWindow = useCallback(() => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
  }, []);

  const handleSuccess = useCallback(() => {
    dispatch(
      openModal(
        <>
          <StyledText
            text="✅ 탁월한 선택입니다!"
            fontColor="black47"
            fontWeight="semiBold"
          />
          <StyledText
            text="선택한 장소들은 나의 기록에서 확인할 수 있어요!"
            fontColor="black47"
            fontWeight="semiBold"
          />
        </>,
      ),
    );
  }, [dispatch]);

  const handleError = useCallback(
    (error: any) => {
      dispatch(showToast(error.response.data.message));
    },
    [dispatch],
  );

  const { mutate: saveSelection } = useSaveSelection({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleSelectClick = useCallback(
    (e: React.MouseEvent, place: PlaceInfo) => {
      e.stopPropagation();
      if (isLogin) {
        saveSelection({ userId, place });
      } else {
        alert("로그인 해주세요!");
      }
    },
    [saveSelection, userId, isLogin],
  );

  const handleBattleClick = (places: PlaceInfo[]) => {
    if (isLogin) {
      dispatch(
        openModal(
          <BattleModal places={places} onFinalSelection={handleSelectClick} />,
        ),
      );
    } else {
      alert("로그인 해주세요!");
    }
  };

  const drawRadiusBoundary = useCallback(
    (
      map: naver.maps.Map,
      latitude: number,
      longitude: number,
      radius: number,
    ) => {
      if (currentCircleRef.current) {
        currentCircleRef.current.setMap(null);
      }

      currentCircleRef.current = new naver.maps.Circle({
        map,
        center: new naver.maps.LatLng(latitude, longitude),
        radius,
        strokeColor: "transparent",
        strokeWeight: 2,
        fillColor: colors.pointColor,
        fillOpacity: 0.3,
      });
    },
    [],
  );

  const addMarkersToMap = useCallback(
    (map: naver.maps.Map, places: PlaceInfo[]) => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      places.forEach((place) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(Number(place.y), Number(place.x)),
          map,
          title: place.place_name,
        });

        const infoWindowContent = (
          <InfoWindowContent
            place={place}
            closeInfoWindow={closeInfoWindow}
            handleSelectClick={(e: React.MouseEvent) =>
              handleSelectClick(e, place)
            }
          />
        );

        naver.maps.Event.addListener(marker, "click", () => {
          closeInfoWindow();

          const contentDiv = document.createElement("div");
          const root = createRoot(contentDiv);
          root.render(infoWindowContent);

          infoWindowRef.current = new naver.maps.InfoWindow({
            content: contentDiv,
            disableAnchor: true,
            borderWidth: 0,
          });

          infoWindowRef.current.open(map, marker);
        });

        markersRef.current.push(marker);
      });
    },
    [closeInfoWindow, handleSelectClick],
  );

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = new naver.maps.LatLng(latitude, longitude);

          if (mapRef.current) {
            mapRef.current.setCenter(newCenter);
            setPosition({ latitude, longitude });

            if (centerMarkerRef.current) {
              centerMarkerRef.current.setPosition(newCenter);
            } else {
              centerMarkerRef.current = new naver.maps.Marker({
                position: newCenter,
                map: mapRef.current,
                icon: {
                  url: "/marker.svg",
                  size: new naver.maps.Size(36, 36),
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(18, 36),
                },
              });
            }
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
        },
      );
    }
  };

  useEffect(() => {
    if (
      !isLatLngLoading &&
      typeof window !== "undefined" &&
      window.naver &&
      !mapRef.current &&
      position.latitude &&
      position.longitude
    ) {
      const mapOptions = {
        center: new naver.maps.LatLng(position.latitude, position.longitude),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapRef.current = new naver.maps.Map("map", mapOptions);

      centerMarkerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(position.latitude, position.longitude),
        map: mapRef.current,
        icon: {
          url: "/marker.svg",
          size: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 36),
        },
      });

      naver.maps.Event.addListener(mapRef.current, "click", (e: any) => {
        closeInfoWindow();

        const newLat = e.coord.lat();
        const newLng = e.coord.lng();

        if (newLat !== position.latitude || newLng !== position.longitude) {
          setPosition({ latitude: newLat, longitude: newLng });
          centerMarkerRef.current?.setPosition(e.coord);
        }
      });

      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        filterInfo.radius,
      );
    }
  }, [
    isLatLngLoading,
    position,
    filterInfo.radius,
    setPosition,
    drawRadiusBoundary,
    closeInfoWindow,
  ]);

  useEffect(() => {
    if (mapRef.current && position.latitude && position.longitude) {
      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        filterInfo.radius,
      );
      refetch();
    }
  }, [
    position.latitude,
    position.longitude,
    filterInfo.radius,
    refetch,
    drawRadiusBoundary,
  ]);

  useEffect(() => {
    if (mapRef.current && searchData) {
      addMarkersToMap(mapRef.current, searchData);
    }
  }, [addMarkersToMap, searchData]);

  useEffect(() => {
    if (mapRef.current) {
      const handleResize = () => {
        mapRef.current?.setSize(
          new naver.maps.Size(window.innerWidth, window.innerHeight),
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {isLatLngLoading ? (
        <FullPageLoadingIndicator />
      ) : (
        <S.MapContainer id="map" />
      )}

      {searchData && mapRef.current && centerMarkerRef.current && (
        <CenterMarkerButton
          map={mapRef.current}
          position={centerMarkerRef.current.getPosition()}
        >
          <BattleButton
            places={searchData}
            handleBattleClick={handleBattleClick}
          />
          <RandomPickButton
            isLogin={isLogin}
            dispatch={dispatch}
            items={searchData}
            router={router}
          />
        </CenterMarkerButton>
      )}

      <CurrentLocationButton
        handleCurrentLocationClick={handleCurrentLocationClick}
      />
      <FilterButton
        filterInfo={filterInfo}
        setFilterInfo={setFilterInfo}
        fetchData={refetch}
      />
    </>
  );
};

export default Maps;
