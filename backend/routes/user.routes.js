import { getUserForSideBars } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import express from "express";

const router = express.Router();

router.get("/",protectRoute,getUserForSideBars)

export default router;
