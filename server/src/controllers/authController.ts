import { findRefreshToken } from "../models/auth";
import { createAccessToken } from "../utils/auth";

const authController = {
  async issueAccessToken(req: any, res: any) {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken == null)
      return res.status(401).send("리프레시 토큰이 없습니다.");
    try {
      const refreshTokenData = await findRefreshToken(refreshToken);
      if (!refreshTokenData)
        return res.status(403).send("일치하는 토큰이 없습니다.");
      const now = new Date();
      if (refreshTokenData.expiresAt < now) {
        return res
          .status(403)
          .json({ message: "리프레시 토큰이 만료되었습니다." });
      }
      const accessToken = await createAccessToken(refreshTokenData.userId);
      return res.json({ access_token: accessToken });
    } catch (err) {
      res
        .status(500)
        .json({ message: "서버 에러, 잠시 후 다시 시도해주세요. " });
    }
  },
};

export default authController;
