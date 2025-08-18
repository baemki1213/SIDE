import { getUserInfo } from "@/api/user";
import { setUserInfo } from "@/store/authSlice";

// getUserInfo 함수를 사용하여 데이터를 가져와서 Redux 스토어에 저장하는 액션 크리에이터
export const fetchUserInfoAndUpdateRedux = (
  data: {},
  token: string,
  dispatch: any,
) => {
  getUserInfo(data, token, dispatch).then((data) => {
    dispatch(setUserInfo(data.user));
  });
};
