import { createRoot } from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";

import useLatLng from "@/hooks/map/useLatLng";
import useSearchAddress from "@/hooks/map/useSearchAddress";

import * as S from "./styles";
import FilterButton from "@/components/service/map/FilterButton";
import { FullPageLoadingIndicator } from "@/components/common/LoadingIndicator";
import Modal from "@/components/common/Modal";
import CenterMarkerBattleButton from "@/components/service/map/CenterMarkerBattleButton"; // 수정된 부분
import StyledTextButton from "@/components/common/StyledTextButton";
import InfoWindowContent from "@/components/service/map/InfoWindowContainer";

import { colors } from "@/styles/assets";
import { FilterInfo } from "@/types/map";

const Maps: React.FC = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const currentCircleRef = useRef<naver.maps.Circle | null>(null);
  const centerMarkerRef = useRef<naver.maps.Marker | null>(null);
  const markersRef = useRef<Array<naver.maps.Marker>>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null); // 추가된 부분

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInfo, setFilterInfo] = useState<FilterInfo>({
    query: "",
    category: "",
    radius: 500,
  });

  const { position, setPosition, isLoading: isLatLngLoading } = useLatLng();
  const { data: searchData, refetch } = useSearchAddress(
    filterInfo,
    position.latitude,
    position.longitude
  );
  const closeInfoWindow = () => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
  };

  const drawRadiusBoundary = (
    map: any,
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    if (currentCircleRef.current) {
      try {
        currentCircleRef.current.setMap(null);
      } catch (e) {
        console.error("Failed to remove circle:", e);
      }
    }

    const circle = new naver.maps.Circle({
      map: map,
      center: new naver.maps.LatLng(latitude, longitude),
      radius: radius,
      strokeColor: "transparent",
      strokeWeight: 2,
      fillColor: colors.pointColor,
      fillOpacity: 0.3,
    });

    currentCircleRef.current = circle;
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

      const centerMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(position.latitude, position.longitude),
        map: mapRef.current,
        icon: {
          url: "https://w7.pngwing.com/pngs/96/889/png-transparent-marker-map-interesting-places-the-location-on-the-map-the-location-of-the-thumbnail.png",
          size: new naver.maps.Size(24, 24),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 24),
        },
      });
      centerMarkerRef.current = centerMarker;

      naver.maps.Event.addListener(mapRef.current, "click", (e: any) => {
        if (infoWindowRef.current) {
          closeInfoWindow();
        }
        const newLat = e.coord.lat();
        const newLng = e.coord.lng();

        if (newLat !== position.latitude || newLng !== position.longitude) {
          setPosition({ latitude: newLat, longitude: newLng });
          centerMarker.setPosition(e.coord);
        }
      });

      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        filterInfo.radius
      );
    }
  }, [
    isLatLngLoading,
    position.latitude,
    position.longitude,
    filterInfo.radius,
    setPosition,
  ]);

  useEffect(() => {
    if (mapRef.current && position.latitude && position.longitude) {
      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        filterInfo.radius
      );
      refetch();
    }
  }, [position.latitude, position.longitude, filterInfo.radius, refetch]);

  useEffect(() => {
    const addMarkersToMap = (map: naver.maps.Map, places: any[]) => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      places.forEach(place => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.y, place.x),
          map: map,
          title: place.place_name,
        });

        const infoWindowContent = (
          <InfoWindowContent
            place_name={place.place_name}
            road_address_name={place.road_address_name}
            phone={place.phone}
            place_url={place.place_url}
            closeInfoIndow={closeInfoWindow}
          />
        );

        naver.maps.Event.addListener(marker, "click", async () => {
          if (infoWindowRef.current) {
            closeInfoWindow();
          }
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
    };

    if (mapRef.current && searchData) {
      addMarkersToMap(mapRef.current, searchData);
    }
  }, [searchData]);

  useEffect(() => {
    if (mapRef.current) {
      const handleResize = () => {
        mapRef.current?.setSize(
          new naver.maps.Size(window.innerWidth, window.innerHeight)
        );
      };

      handleResize(); // 초기 사이즈 설정
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isModalOpen]);

  const handleHide = () => {
    setIsModalOpen(false);
    if (mapRef.current) {
      mapRef.current.setSize(
        new naver.maps.Size(window.innerWidth, window.innerHeight)
      );
    }
  };

  return (
    <>
      {isLatLngLoading ? (
        <FullPageLoadingIndicator />
      ) : (
        <S.MapContainer id="map" />
      )}
      <Modal isShowing={isModalOpen} hide={handleHide}>
        <>Modal</>
      </Modal>

      {searchData && mapRef.current && centerMarkerRef.current && (
        <CenterMarkerBattleButton
          map={mapRef.current}
          position={centerMarkerRef.current.getPosition()}
          onClick={() => setIsModalOpen(true)}
        >
          <StyledTextButton
            buttonType="button"
            styleProps={{
              text: "대진표 만들기",
              fontColor: "pointColor",
              fontSize: "sm",
            }}
            handleClick={() => setIsModalOpen(true)}
          />
        </CenterMarkerBattleButton>
      )}

      <FilterButton
        filterInfo={filterInfo}
        setFilterInfo={setFilterInfo}
        fetchData={refetch}
      />
    </>
  );
};

export default Maps;
