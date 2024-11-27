import axios from 'axios'
import config from 'config'
import FormData from "form-data";
import fs from "fs";

export class OcrService {

    async obteinImage(filePath: string) {
        let urlImage = config.get<string>('REPORT_SERVICE.URL_OCR_IMAGE')

        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath))

        const response = await axios.post(urlImage, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        })
        return response.data

            
      
    }

    async obteinPdf(filePath: string) {
        let urlPdf = config.get<string>('REPORT_SERVICE.URL_OCR_PDF')

        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath))

        const response = await axios.post(urlPdf,formData, {
            headers: {
               ...formData.getHeaders(),
            },
        })
        
        return response.data
    }

}