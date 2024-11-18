import  Express  from "express";
import { UserController } from "../../../application/user.controller";
export const userRoutes = () => {
    const router = Express.Router();
    
    const userCtrl = new UserController();
    router.get("/users", async ( _, response) => {
        try {
            const result = await userCtrl.read();
            response.send(result);
            
        } catch (error) {
            response.status(500).send(error)
            
        }

    })

    return router;
}