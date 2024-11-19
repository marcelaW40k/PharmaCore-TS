import Express from "express";
import { userRoutes } from "./user.routes";

 
export const routes = () => {
    const router = Express.Router();
 
    router.get("/", (req, res) => {
        res.send("Hello world");
    })
    router.use(userRoutes())
    
    
    return router;
}