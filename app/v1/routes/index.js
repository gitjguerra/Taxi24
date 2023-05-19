import { Router } from "express";
import driverRoutes from "./driverRoutes";
import riderRoutes from "./riderRoutes";
import tripRoutes from "./tripRoutes";
import invoiceRoutes from "./invoiceRoutes";

const router = Router();

router.use(riderRoutes);
router.use(driverRoutes);
router.use(tripRoutes);
router.use(invoiceRoutes);

export default router;
