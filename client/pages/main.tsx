import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { selectAuthState } from "@/store/authSlice";
import { fetchUserInfoAndUpdateRedux } from "@/utils/functions/user/fetchUserInfoAndUpdateRedux";

export default function Main() {
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector(selectAuthState);
  console.log(access_token);
  return (
    <div>
      main
      <button
        onClick={() => fetchUserInfoAndUpdateRedux({}, access_token, dispatch)}
      >
        get user info
      </button>
    </div>
  );
}
