import { medicineDoc } from "./medicine.docs";
import { prescriptionDoc, prescriptionIdDoc } from "./prescription.docs";
import { prescriptionItemDoc, prescriptionItemIdDoc } from "./prescriptionItem.docs";

export const swaggerOptions = {
    openapi: "3.0.3",
    info: {
        title: "PharmaCore API",
        version: "1.0.0",
        description: "API para gestión de pacientes, médicos y ventas en farmacias.",
        contact: {
            name: "PharmaCore",
            email: "sebastianmejiasanchez1030@gmail.com",
            url: "https://github.com/marcelaW40k/PharmaCore-TS/tree/main",
        }
    },
    servers:[{
        url: "http://localhost:3000/",
        description: "Local development server"
    },
    {
        url: "https://api.pharmacore.com/api",
        description: "Production server"
    }],
    paths:{
        "/api/v1/medicine":medicineDoc,
       "/api/v1/prescriptions":prescriptionDoc,
      "/api/v1/prescriptions/{id}":prescriptionIdDoc,
      "/api/v1/prescriptionitems":prescriptionItemDoc,
      "/api/v1/prescriptionitems/{id}":prescriptionItemIdDoc
    }
    

}