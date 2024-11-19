import  Express  from "express";
import { UserCtrl } from "../../../application/user.controller";

export const userRoutes = () => {
    const router = Express.Router();
    
    const userCrontroller = new UserCtrl();
   
    router.post("/users", (req,res) => {
        const payload = req.body
        userCrontroller.create(payload).then((result) => {
            const status = result  ? 200 : 400; 
            res.status(status).send(result);
     
        })

        .catch((error) => {
            res.status(500).send(error)
        });

    })

    router.put("/users",(req,res) => {
        const payload = req.body;

        userCrontroller.update(payload).then((result) =>{
            const status = result !== null ? 200: 400;
            res.status(status).send(result)
        })

        .catch((error) => {
            res.status(500).send(error);
          });
    })

    router.get("/users", async ( _, res) => {
        try {
            const result = await userCrontroller.read();
            const status = result? 200:400;
            res.status(status).send(result)
        
        } catch (error) {
            res.status(500).send(error)
         
        }

    })
    return router;
}