export const userDoctor = {
  get: {
    tags: ["User"],
    summary: "Obtener lista de todos los usuarios",
    description: "Obtiene una lista de todos los usuarios disponibles",
    responses: {
      default: {
        description: "Respuesta por defecto",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/users",
              },
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["User"],
    summary: "Crear un nuevo usuario",
    description: "Crea un nuevo usuario en la base de datos",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/users",
          },
        },
      },
    },
    responses: {
      default: {
        description: "respuesta por defecto",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/users",
            },
          },
        },
      },
    },
  },
  put: {
    tags: ["User"],
    summary: "Actualizar un usuario",
    description: "Actualiza un usuario en la base de datos",
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
            $ref: "#/components/schemas/users",
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
              $ref: "#/components/schemas/users",
            },
          },
        },
      },
    },
  },
};
