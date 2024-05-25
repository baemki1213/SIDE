import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
import { Request } from "../types/Express";
import { Response } from "express";
import { randomInt } from "crypto";
import nodemailer from "nodemailer";
import {
  verifyEmailByCode,
  hashPassword,
  isEmailRegistered,
  isNicknameTaken,
  registerUser,
  saveVerificationCode,
  isCodeExpired,
  findCurrentEmail,
  findUserByEmail,
  findUserById,
  patchUserById,
} from "../models/user";
import { createAndSaveRefreshToken, removeRefreshToken } from "../models/auth";
import { compareHashedPassword, createAccessToken } from "../utils/auth";
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

const userController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, nickname } = req.body;

      const emailExists = await isEmailRegistered(email);
      if (emailExists)
        return res
          .status(409)
          .json({ message: "이메일이 이미 등록되었습니다." });

      const nicknameExists = await isNicknameTaken(nickname);
      if (nicknameExists)
        return res
          .status(409)
          .json({ message: "닉네임이 이미 사용 중입니다." });

      const hashedPassword = await hashPassword(password);

      const userId = await registerUser({
        email,
        hashed_password: hashedPassword,
        nickname,
      });
      return res.status(201).json({ message: "등록에 성공하였습니다", userId });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async sendVerificationEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const isRegistered = await isEmailRegistered(email);
      if (isRegistered) {
        return res.status(400).json({ message: "이미 등록된 이메일입니다." });
      }
      const code = randomInt(100000, 1000000);

      const codeSaved = await saveVerificationCode(email, code);
      if (!codeSaved)
        return res
          .status(500)
          .json({ message: "인증 코드 저장에 실패했습니다" });

      const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: email,
        subject: "이메일 인증",
        text: `코드를 복사하여 붙여넣으세요: ${code}`,
      };

      smtpTransport.sendMail(mailOptions, (error: any, info: any) => {
        if (error)
          return res.status(500).json({
            message: "이메일 전송에 실패했습니다",
            error: error.toString(),
          });
        return res
          .status(200)
          .json({ message: "이메일을 성공적으로 보냈습니다", info });
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async verifyEmail(req: Request, res: Response) {
    const { email, code } = req.body;

    try {
      const currentEmail = await findCurrentEmail(email, code);
      const isExpired = isCodeExpired(currentEmail?.expiry_at);
      if (isExpired) {
        return res.status(400).send("만료된 코드입니다.");
      }
      const isVerified = await verifyEmailByCode(email, code);

      if (!isVerified) {
        return res.status(400).send("잘못된 코드입니다.");
      }
      res.status(200).send("이메일이 성공적으로 인증되었습니다!");
    } catch (error) {
      res.status(500).send("Server error");
    }
  },

  async checkNickname(req: Request, res: Response) {
    const { nickname } = req.body;
    try {
      const nicknameExists = await isNicknameTaken(nickname);
      if (nicknameExists)
        return res
          .status(409)
          .json({ message: "닉네임이 이미 사용 중입니다." });
      return res.status(200).json({ message: "사용 가능한 닉네임입니다." });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password: inputPassword } = req.body;

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "없는 유저입니다." });
      }

      const isMatch = await compareHashedPassword(
        inputPassword,
        user.hashed_password
      );

      if (isMatch) {
        const { id, email, nickname, created_at, profile_image } = user;
        const accessToken = await createAccessToken(user.id);
        const refreshToken = await createAndSaveRefreshToken(user.id);

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development", // HTTPS 환경에서만 쿠키 전송
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
          path: "/",
        });
        return res.json({
          message: "Login successful",
          user: { id, email, nickname, profile_image, created_at },
          access_token: accessToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "아이디 혹은 비밀번호를 확인해주세요." });
      }
    } catch (err) {
      res.status(500).json({ message: "서버 에러, 잠시후 다시 시도해주세요." });
    }
  },
  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refresh_token"];

      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: "로그아웃 실패: Token missing" });
      }

      await removeRefreshToken(refreshToken);
      res.clearCookie("refresh_token");

      return res.status(200).json({ message: "로그아웃 성공" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "서버 에러, 잠시 후 다시 시도해주세요." });
    }
  },

  async getUserInfo(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: "사용자 ID가 없습니다." });
      }

      const user = await findUserById(userId);
      // 보낼 데이터

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
      const { id, nickname, created_at } = user;

      return res.json({ user: { id, nickname, created_at } });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.toString() });
    }
  },

  async requestResetPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "이메일이 필요합니다." });
    }

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_RESET_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const resetLink = `http://localhost:3000/account/reset-password?token=${token}`;
      const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: email,
        subject: "이메일 인증",
        text: `다음 링크를 클릭하여 비밀번호를 재설정하세요: ${resetLink}`,
        html: `<p>다음 링크를 클릭하여 비밀번호를 재설정하세요:</p><a href="${resetLink}">${resetLink}</a>`,
      };

      smtpTransport.sendMail(mailOptions, (error: any, info: any) => {
        if (error)
          return res.status(500).json({
            message: "이메일 전송에 실패했습니다",
            error: error.toString(),
          });
        return res
          .status(200)
          .json({ message: "비밀번호 재설정 이메일이 전송되었습니다." });
      });
    } catch (error: any) {
      res.status(500).json({ message: "서버 오류가 발생했습니다.", error });
    }
  },

  async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "토큰과 새 비밀번호가 필요합니다." });
    }

    try {
      const decoded: { userId: number } = jwt.verify(
        token,
        process.env.JWT_RESET_SECRET
      );
      const user = await findUserById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      patchUserById(decoded.userId, { hashed_password: hashedPassword });

      return res
        .status(200)
        .json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "서버 오류가 발생했습니다.", error });
    }
  },
};

export default userController;
