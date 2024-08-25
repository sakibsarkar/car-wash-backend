import { Router } from "express";
import { getAllAvailableSlots, getSlotById } from "./slot.controller";
// "/slot/{pathname}"
const router = Router();
router.get("/availability", getAllAvailableSlots);
router.get("/availability/:id", getSlotById);
const slotRoutes2 = router;
export default slotRoutes2;
