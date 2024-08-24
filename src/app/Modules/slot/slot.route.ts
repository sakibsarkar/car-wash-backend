import { Router } from "express";
import { createSlotsIntoDB } from "./slot.controller";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";

const router = Router();
router.post(
  "/slots",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createSlotsIntoDB
);
const slotRoutes = router;
export default slotRoutes;
