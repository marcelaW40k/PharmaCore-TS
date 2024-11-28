
import { EmailOptions } from "../../domain/models/EmailOptions";
import axios from 'axios'
import config from 'config'

export class NotificacionesService {

    async sendReportByEmail(id: number, payload: EmailOptions) {
        let url = config.get<string>('REPORT_SERVICE.URL')
        const response = await axios.post(`${url}/${id}`, payload)
        const data = response.data
        return data
    }

}