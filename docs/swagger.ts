import { medicineDoc } from "./medicine.docs";

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
        url: "http://localhost:3000/api",
        description: "Local development server"
    },
    {
        url: "https://api.pharmacore.com/api",
        description: "Production server"
    }],
    paths:{
        "/api/v1/medicine":medicineDoc
    }
    

}