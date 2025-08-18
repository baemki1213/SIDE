// context/RouteContext.js
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/router";

interface RouteContextType {
  previousPath: string;
  setPreviousPath: (path: string) => void;
}

const RouteContext = createContext<RouteContextType>({
  previousPath: "",
  setPreviousPath: (path: string) => {},
});

export const RouteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState<string>("");

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPreviousPath(url);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <RouteContext.Provider value={{ previousPath, setPreviousPath }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
