import { refreshToken } from "@/api/auth";
import { useAppSelector } from "@/hooks/reduxHook";
import { selectAuthState } from "@/store/authSlice";

export default function Main() {
  const handleRefreshAccessToken = () => {
    const result = refreshToken({});
    console.log(result);
    return result;
  };

  return (
    <div>
      main
      <button onClick={handleRefreshAccessToken}>refresh access token</button>
    </div>
  );
}
