import { Router } from "express";
import { PatientController } from "../../../application/patient.controller";

export const patientRoutes = () => {
  const router = Router();
  const patientController = new PatientController();

  router.post("/patient", (req,res) => {
    const payload = req.body
    console.log(payload);
    
    patientController.create(payload).then((result) => {
        const status = result  ? 200 : 400; 
        res.status(status).send(result);
 
    })

    .catch((error) => {
        res.status(500).send(error)
    });

})


router.get("/patient", async (_, response) => {
    try {
        const result = await patientController.read();
        response.send(result);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.put("/patient",(req,res) => {
    const payload = req.body;

    patientController.update(payload).then((result) =>{
        const status = result !== null ? 200: 400;
        res.status(status).send(result)
    })

    .catch((error) => {
        res.status(500).send(error);
      });
})

router.delete("/patient/:id", async (req,res) =>{
    try{
        const idString = req.params.id;
        const id = parseInt(idString)
        const result = await patientController.remove(id);
        const status = result? 200:400;
        res.status(status).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
   
});

router.get("/patient/:id", async (req,res) => {
    try {
        const isdString = req.params.id;
        const id = parseInt(isdString)
        const result = await patientController.searchById(id);
        const status = result? 200:404;
        res.status(status).send(result);
  
    }catch(error){
        res.status(500).send(error)
    }
})

  return router;
};