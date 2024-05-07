import { useState, useEffect } from "react";

const useLatLng = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  };

  const handleError = (error: { message: string }) => {
    setError(error.message);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저는 지원하지 않습니다.");
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  return { position, setPosition, error, isLoading };
};

export default useLatLng;
