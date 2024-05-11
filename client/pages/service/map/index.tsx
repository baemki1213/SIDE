import React, { useEffect, useRef, useState } from "react";
import useLatLng from "@/hooks/map/useLatLng";
import useSearchAddress from "@/hooks/map/useSearchAddress";

import * as S from "./styles";
import FilterButton from "@/components/service/map/FilterButton";
import { FullPageLoadingIndicator } from "@/components/common/LoadingIndicator";

import { colors } from "@/styles/assets";

interface FilterInfo {
  query: string;
  radius: number;
}

const Maps: React.FC = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const currentCircleRef = useRef<naver.maps.Circle | null>(null);
  const markersRef = useRef<Array<naver.maps.Marker>>([]);
  const [filterInfo, setFilterInfo] = useState<FilterInfo>({
    query: "카페",
    radius: 500,
  });

  const { position, setPosition, isLoading: isLatLngLoading } = useLatLng();
  const { data } = useSearchAddress(
    filterInfo.query,
    position.latitude,
    position.longitude,
    filterInfo.radius
  );

  const addMarkersToMap = (map: naver.maps.Map, places: any[]) => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    places.forEach(place => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(place.y, place.x),
        map: map,
        title: place.place_name,
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px;">${place.place_name}</div>`,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      markersRef.current.push(marker);
    });
  };

  const drawRadiusBoundary = (
    map: any,
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    if (currentCircleRef.current) {
      currentCircleRef.current.setMap(null);
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
        zoom: 17,
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

      naver.maps.Event.addListener(mapRef.current, "click", (e: any) => {
        const newLat = e.coord.lat();
        const newLng = e.coord.lng();
        // Avoid unnecessary updates if the position has not changed
        if (newLat !== position.latitude || newLng !== position.longitude) {
          setPosition({ latitude: newLat, longitude: newLng });
          centerMarker.setPosition(e.coord);
        }
      });
    }
  }, [isLatLngLoading, filterInfo.radius, position, setPosition]);

  useEffect(() => {
    if (mapRef.current && position.latitude && position.longitude)
      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        filterInfo.radius
      );
  }, [position.latitude, position.longitude, filterInfo.radius]);

  useEffect(() => {
    if (mapRef.current && data) {
      addMarkersToMap(mapRef.current, data);
    }
  }, [data]);

  return (
    <>
      {isLatLngLoading ? (
        <FullPageLoadingIndicator />
      ) : (
        <S.MapContainer id="map" />
      )}
      <FilterButton filterInfo={filterInfo} setFilterInfo={setFilterInfo} />
    </>
  );
};

export default Maps;
