import Express from "express";
import { doctorRoutes } from "./doctor.routes";

export const routes = () => {
    const router = Express.Router();

    router.get("/", (req, res) => {
        res.send("Hello world");
    })
    router.use(doctorRoutes())
    return router;
}