import { doctorDoc, doctorIdDoc } from "./doctor.docs";
import { medicineDoc } from "./medicine.docs";
import { saleDoc, saleIdDoc } from "./sale.docs";
import { saleItemDoc, saleItemIdDoc } from "./saleItem.docs";

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
    servers: [{
        url: "http://localhost:3000",
        description: "Local development server"
    },
    {
        url: "https://api.pharmacore.com",
        description: "Production server"
    }],
    paths: {
        "/api/v1/medicine": medicineDoc,
        "/api/v1/sales/": saleDoc,
        "/api/v1/sales/{id}": saleIdDoc,
        "/api/v1/sale_items/": saleItemDoc,
        "/api/v1/sale_items/{id}": saleItemIdDoc,
        "/api/v1/doctors/": doctorDoc,
        "/api/v1/doctors/{id}": doctorIdDoc
    }


}