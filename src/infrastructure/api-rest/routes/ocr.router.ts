import Express from "express";
import { OcrService } from "../../services/ocrService";
export const ocrRoutes = () => {
    const router = Express.Router();
    const ocrService = new OcrService();
    
    router.post('/create-image', async (req, res) => {
        const { texto } = req.body;
        try {
            const data = await ocrService.createImage(texto);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error creating image:', error);
            res.status(500).json({ message: 'Error creating image' });
        }
    });
     
    router.post('/create-pdf', async (req, res) => {
        const { texto } = req.body;
        try {
            const data = await ocrService.createP(texto);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error creating PDF:', error);
            res.status(500).json({ message: 'Error creating PDF' });
        }
    });

}