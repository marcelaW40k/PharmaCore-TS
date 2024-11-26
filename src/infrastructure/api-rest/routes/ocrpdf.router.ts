import { ctrPdf } from "../controllers/pdf.controllers";
import express from "express";
import multer from "multer";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../../docs/swagget";


const router = express.Router();
const upload = multer({ dest: 'pdfs/' });

router.use(`/docs`,swaggerUi.serve, swaggerUi.setup(swaggerOptions))
router.post('/pdf', upload.single('pdf'), ctrPdf);

export {router as roterPdf}