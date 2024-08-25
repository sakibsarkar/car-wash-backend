import express from "express";
import authRoute from "../modules/auth/auth.route";
import bookingRoutes from "../modules/booking/booking.route";
import bookingRoutes2 from "../modules/booking/booking.route2";
import paymentRoute from "../modules/payment/payment.route";
import reviewRoutes from "../modules/review/review.route";
import serviceRoutes from "../modules/service/service.route";
import slotRoutes from "../modules/slot/slot.route";
import slotRoutes2 from "../modules/slot/slot.route2";
// import userRoutes from "../modules/user/user.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/services",
    route: slotRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes2,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },

  {
    path: "/",
    route: bookingRoutes2,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
