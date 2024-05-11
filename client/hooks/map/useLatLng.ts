import { useState, useEffect } from "react";

const useLatLng = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const handleSuccess = (position: {
    coords: { latitude: number | null; longitude: number | null };
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
