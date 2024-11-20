import Express from "express";
import { userRoutes } from "./user.routes";
import { saleRoutes } from "./sale.router";
import { saleItemRoutes } from "./saleItem.router";

export const routes = () => {
    const router = Express.Router();

    router.get("/api/v1", (req, res) => {
        res.send("Hello world");
    })
    router.use(userRoutes())


    router.use(saleRoutes())
    router.use(saleItemRoutes())
    return router;
}