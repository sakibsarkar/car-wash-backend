import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth";
import { getAllUser } from "./user.controller";

const router = Router();
router.get("/all", isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
const userRoute = router;
export default userRoute