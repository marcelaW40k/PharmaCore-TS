import Express from "express";
import { userRoutes } from "./user.routes";
import { UserCtrl } from "../../../application/user.controller";
import { User } from "../../../domain/models/user";


export const routes = () => {
    const router = Express.Router();

    const ctrl = new UserCtrl();

    router.post("/users", (req,res) => {
        const payload = req.body
        ctrl.create(payload).then((result) => {
            // verifico que result no sea nulo ya que create recibe un body | null
            const status = result !== null ? 200: 400;
            res.status(status).send(result)

        })

        .catch((error) => {
            res.status(500).send(error)
        });

    })

    router.put("users/",(req,res) => {
        const payload = req.body;

        ctrl.update(payload).then((result) =>{
            const status = result !== null ? 200: 400;
            res.status(status).send(result)


        })

        .catch((error) => {
            res.status(500).send(error);
          });
    })

    router.get("/users",async (req, res) => {
        try {
            const result = await ctrl.read();

            res.send("Hello world");

        }
        
    })
    router.use(userRoutes())
    return router;


}