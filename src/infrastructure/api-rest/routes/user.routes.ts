import  Express  from "express";
import { UserCtrl } from "../../../application/user.controller";
import { User } from "../../../domain/models/user";
export const userRoutes = () => {
    const router = Express.Router();
    
    const userCrontroller = new UserCtrl();
   
    router.post("/users", (req,res) => {
        const payload = req.body
        userCrontroller.create(payload).then((result) => {
            // verifico que result no sea nulo ya que create recibe un body | null
            const status = result === true ? 200 : 400; // revisar con gpt por que esta mal
            res.status(status).send(result);
           

        })

        .catch((error) => {
            res.status(500).send(error)
        });

    })

    router.put("users/",(req,res) => {
        const payload = req.body;

        userCrontroller.update(payload).then((result) =>{
            const status = result !== null ? 200: 400;
            res.status(status).send(result)


        })

        .catch((error) => {
            res.status(500).send(error);
          });
    })

    router.get("/users", async ( _, response) => {
        try {
            const result = await userCrontroller.read();
        
          
            
        } catch (error) {
            response.status(500).send(error)
        
            
        }

    })
    return router;
}