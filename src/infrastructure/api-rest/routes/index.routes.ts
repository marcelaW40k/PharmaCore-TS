import Express from "express";
import { userRoutes } from "./doctor.routes";

export const routes = () => {
    const router = Express.Router();

    router.get("/", (req, res) => {
        res.send("Hello world");
    })
    router.use(d())
    return router;
}