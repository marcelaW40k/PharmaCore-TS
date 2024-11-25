export const userDoctor = {
    get:{
        tags:["User"],
        summary: "Obtener lista de todos los usuarios",
        description: "Obtiene una lista de todos los usuarios disponibles",
        responses:{
            "200":{
                description: "usuarios  obtenidos correctamente",
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
        tags:["usuario"],
        summary: "Crear un nuevo usuario",
        description: "Crea un nuevo usuario en la base de datos",
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
                description: "usuario creado correctamente",
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