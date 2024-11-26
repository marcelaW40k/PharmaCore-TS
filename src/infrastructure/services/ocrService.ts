import axios from 'axios'
import config from 'config'

export class OcrService {

    async createImage(texto:string) {
        let urlImage = config.get<string>('REPORT_SERVICE.URL_OCR_IMAGE')
        const response = await axios.post(urlImage, texto)
        const data = response.data
        return data
    }

    async createP(texto:string) {
        let urlPdf = config.get<string>('REPORT_SERVICE.URL_OCR_PDF')
        const response = await axios.post(urlPdf, texto)
        const data = response.data
        return data
    }

}