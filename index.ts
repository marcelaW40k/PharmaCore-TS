

// Crear servicio web - API
// En otras palabras levantar en express

import express from 'express'
import { routes } from './src/infrastructure/api-rest/routes/index.routes';


const main = () => {

    const app = express()

    // Importante: Middleware para aceptar los json en los request
    app.use(express.json())
     app.get("/", (req, res) => {
      res.send({ message: "Bienvenido a la API " });
    });

    app.use("/api/v1/",routes())

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    })
}

main()