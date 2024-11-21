import Express from "express";
import { userRoutes } from "./user.routes";
import { saleRoutes } from "./sale.router";
import { saleItemRoutes } from "./saleItem.router";
import { doctorRoutes } from "./doctor.routes";
import { patientRoutes } from "./patient.routes";

export const routes = () => {
    const router = Express.Router();

    router.get("/", (req, res) => {
        res.send("Hello world");
    })
    router.use(userRoutes())


    router.use(saleRoutes())
    router.use(saleItemRoutes())
    router.use(doctorRoutes())
    router.use(patientRoutes())
    return router;



}