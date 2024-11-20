import Express from "express";
import { userRoutes } from "./user.routes";
import { patientRoutes } from "./patient.routes";

export const routes = () => {
    const router = Express.Router();
// endpoint o URL: http://localhost:3000/api/v1
    router.get("/api/v1", (req, res) => {
        res.send("Hello world");
    })
    router.use(userRoutes())
    router.use(patientRoutes())
    return router;


    
}