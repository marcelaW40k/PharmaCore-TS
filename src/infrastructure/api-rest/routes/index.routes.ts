import Express from "express";
import { userRoutes } from "./user.routes";
import { saleRoutes } from "./sale.routes";
import { saleItemRoutes } from "./saleItem.routes";
import { doctorRoutes } from "./doctor.routes";
import { patientRoutes } from "./patient.routes";
import { prescriptionItemRoutes } from "./prescriptionItem.routes";
import { prescriptionRoutes } from "./prescription.routes";

export const routes = () => {
    const router = Express.Router();

    router.get("/", (req, res) => {
        res.send("Hello world");
    })
    router.use(userRoutes())
    router.use(prescriptionRoutes())
    router.use(prescriptionItemRoutes())
    router.use(saleRoutes())
    router.use(saleItemRoutes())
    router.use(doctorRoutes())
    router.use(patientRoutes())
    return router;



}