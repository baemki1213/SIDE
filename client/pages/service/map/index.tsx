import { useEffect, useRef } from "react";

import useLatLng from "@/hooks/map/useLatLng";

import * as S from "./styles";
import { colors } from "@/styles/assets";

const Maps = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const { position } = useLatLng();
  const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
    const mapBounds: any = map.getBounds();

    for (let i = 0; i < markers.length; i++) {
      const position = markers[i].getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, markers[i]);
      } else {
        hideMarker(markers[i]);
      }
    }
  };
  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    marker.setMap(map);
  };

  const hideMarker = (marker: naver.maps.Marker) => {
    marker.setMap(null);
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
      });
    }
  }, [position.latitude, position.longitude]);

  return <S.MapContainer id="map"></S.MapContainer>;
};

export default Maps;
