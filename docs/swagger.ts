import { medicineDoc, medicineIdDoc, medicineNameDoc } from "./medicine.docs";

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
        "/v1/medicine":medicineDoc,
        "/v1/medicine/{id}":medicineIdDoc,
        "/v1/medicine/name/{name}":medicineNameDoc,
    },
    components:{
        schemas:{
            Medicine:{
                type: "object",
                properties: {
                    id_medicine: { type: "number" },
                    name_medicine: { type: "string" },
                    form: { type: "string" },
                    prescription: { type: "boolean" },
                    quantity_stock: { type: "number" },
                    unit_cost: { type: "number" }
                },
                required: ["id_medicine", "name_medicine", "form", "prescription", "quantity_stock", "unit_cost"]
            }
        }
    }
    

}