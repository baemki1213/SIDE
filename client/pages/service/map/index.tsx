import { useEffect, useRef, useState } from "react";

import useLatLng from "@/hooks/map/useLatLng";

import * as S from "./styles";
import { colors } from "@/styles/assets";

const Maps = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const currentCircleRef = useRef<naver.maps.Circle | null>(null);
  const [radius, setRadius] = useState(500);
  const { position } = useLatLng();

  const drawRadiusBoundary = (
    map: any,
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    // 이전에 그려진 원이 있다면 지도에서 제거
    if (currentCircleRef.current) {
      currentCircleRef.current.setMap(null);
    }

    // 새 원을 그림
    const circle = new window.naver.maps.Circle({
      map: map,
      center: new window.naver.maps.LatLng(latitude, longitude),
      radius: radius,
      strokeColor: "transparent",
      strokeWeight: 2,
      fillColor: colors.pointColor,
      fillOpacity: 0.3,
    });

    // 현재 그려진 원을 추적
    currentCircleRef.current = circle;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          position.latitude,
          position.longitude
        ),
        zoom: 18,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      mapRef.current = new window.naver.maps.Map("map", mapOptions);

      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          position.latitude,
          position.longitude
        ),
        map: mapRef.current,
      });

      naver.maps.Event.addListener(mapRef.current, "click", function (e) {
        marker.setPosition(e.latlng);
        drawRadiusBoundary(
          mapRef.current,
          e.latlng.lat(),
          e.latlng.lng(),
          radius
        );
      });

      drawRadiusBoundary(
        mapRef.current,
        position.latitude,
        position.longitude,
        radius
      );
    }
  }, [position.latitude, position.longitude, radius]);

  return <S.MapContainer id="map"></S.MapContainer>;
};

export default Maps;
