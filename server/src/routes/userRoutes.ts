import {
  register,
  sendVerificationEmail,
  verifyEmail,
} from "../controllers/userController";

router.post("/register", register);
router.post("/send-verification-email", sendVerificationEmail);
router.get("/verify-email", verifyEmail);

module.exports = router;
