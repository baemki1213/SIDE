import { useState, useEffect } from "react";

const useLatLng = () => {
  const [position, setPosition] = useState({
    latitude: 37.4116304,
    longitude: 127.1298606,
  });
  const [error, setError] = useState("");

  const handleSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const handleError = (error: { message: string }) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저는 지원하지 않습니다.");
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  return { position, error };
};

export default useLatLng;
