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
    },


    components: {

        schemas: {
            Sale: {
                type: "object",
                properties: {
                    id_sale: {
                        "type": "integer"
                    },
                    "id_patient": {
                        "type": "string"
                    },
                    "date_time": {
                        "type": "string",
                        "format": "date"
                    },
                    "sale_total_cost": {
                        "type": "number",
                        "format": "float"
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/SaleItem"
                        }
                    }
                },
                "required": ["id_sale", "id_patient", "date_time", "sale_total_cost", "items"]
            },
            "SaleItem": {
                "type": "object",
                "properties": {
                    "id_item": {
                        "type": "integer"
                    },
                    "id_sale": {
                        "type": "number"
                    },
                    "id_medicine": {
                        "type": "integer"
                    },
                    "quantity": {
                        "type": "integer"
                    },
                    "item_total_cost": {
                        "type": "number",
                        "format": "float"
                    }
                },
                "required": ["id_item", "id_sale", "id_medicine", "quantity", "item_total_cost"]
            }
        }
    },


    schemas: {
        SaleItem: {
            "type": "object",
            "properties": {
                "id_item": {
                    "type": "integer"
                },
                "id_sale": {
                    "type": "number"
                },
                "id_medicine": {
                    "type": "integer"
                },
                "quantity": {
                    "type": "integer"
                },
                "item_total_cost": {
                    "type": "number",
                    "format": "float"
                }
            },
            "required": ["id_item", "id_sale", "id_medicine", "quantity", "item_total_cost"]
        }
    }
}


