export const userDoctor = {
  get: {
    tags: ["Usuario"],
    summary: " lista de Usuarios",
    description: "Obtiene una lista de todos los Usuarios disponibles",
    responses: {
      "200": {
        description: "Usuarios obtenidos correctamente",
        content: {
          "application/json": {
            schema: {
              type: "array",
              properties: {
                id:{
                  type: "string",
                },
              }, 
              items: {
                $ref: "#/components/schemas/user",
              },
            },
          },
        },
      },
      "500": {
        description: "Error interno del servidor",
      },
    },
  },
  post: {
    tags: ["User"],
    summary: "Crear un nuevo User",
    description: "Crea un nuevo User en la base de datos",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
            type: "object",
            
          },
        },
      },
    },
    responses: {
      "201": {
        description: "User creado correctamente",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      "400": {
        description: "Error al validar los datos",
      },
      "500": {
        description: "Error interno del servidor",
      },
    },
  },
  put: {
    tags: ["Users"],
    summary: "Actualizar un User",
    description: "Actualiza un User en la base de datos",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
  },

  "/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Actualizar un User",
      description: "Actualiza un User en la base de datos",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  },
};
