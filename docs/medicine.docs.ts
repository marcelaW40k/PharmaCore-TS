export const medicineDoc = {
    get:{
        tags:["Medicamentos"],
        summary: "Obtener lista de medicamentos",
        description: "Obtiene una lista de todos los medicamentos disponibles",
        responses:{
            "200":{
                description: "Medicamentos obtenidos correctamente",
                content:{
                    "application/json":{
                        schema:{
                            type:"array",
                            items:{
                                $ref: "#/components/schemas/Medicine"
                            }
                        }
                    }
                }
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },
    post:{
        tags:["Medicamentos"],
        summary: "Crear un nuevo medicamento",
        description: "Crea un nuevo medicamento en la base de datos",
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        $ref: "#/components/schemas/Medicine"
                    }
                }
            }
        },
        responses:{
            "201":{
                description: "Medicamento creado correctamente",
                content:{
                    "application/json":{
                        schema:{
                            $ref: "#/components/schemas/Medicine"
                        }
                    }
                }
            },
            "400":{
                description: "Error al validar los datos"
            },
            "500":{
                description: "Error interno del servidor"
            }
        }
    },
    put:{
        tags:["Medicamentos"],
        summary: "Actualizar un medicamento",
        description: "Actualiza un medicamento en la base de datos",
        parameters:[
            {
                name: "id",
                in: "path",
                required: true,
                schema:{
                    type:"string"
                }
            }
        ],
        requestBody:{
            content:{
                "application/json":{
                    schema:{
                        $ref: "#/components/schemas/Medicine"
                    }
                }
            }
        },
    },
    
}