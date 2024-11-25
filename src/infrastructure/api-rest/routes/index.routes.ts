import Express from "express";
import { userRoutes } from "./user.routes";
import { saleRoutes } from "./sale.routes";
import { saleItemRoutes } from "./saleItem.routes";
import { doctorRoutes } from "./doctor.routes";
import { patientRoutes } from "./patient.routes";
import { prescriptionItemRoutes } from "./prescriptionItem.routes";
import { prescriptionRoutes } from "./prescription.routes";
import { MedicineRoutes } from "./medicine.routes";
import swaggerIU from "swagger-ui-express"
import { swaggerOptions } from "../../../../docs/swagger";

export const routes = () => {
    const router = Express.Router();


    router.get("/", (req, res) => {
        res.send("Hello world");
    })

    router.use("/medicine/docs",swaggerIU.serve, swaggerIU.setup(swaggerOptions))


    router.use(MedicineRoutes())
    router.use(userRoutes())
    router.use(prescriptionRoutes())
    router.use(prescriptionItemRoutes())
    router.use(saleRoutes())
    router.use(saleItemRoutes())
    router.use(doctorRoutes())
    router.use(patientRoutes())

    return router;



}