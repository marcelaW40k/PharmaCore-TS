
import { ReportOptions } from "../domain/models/ReportOptions";
import { SaleReceiptRepository } from "../infrastructure/repositories/saleReceipt.repository";
import { CreateSalePdf } from "../infrastructure/services/createPdf";
import { NotificacionesService } from "../infrastructure/services/notificaciones";
import {  readFileSync } from "fs";


export class saleReceiptController {

    private repository: SaleReceiptRepository;
    
    constructor() {
        this.repository = new SaleReceiptRepository();
    }

    async createReciptById(id: number, options: ReportOptions) {

        const result = await this.repository.createReceipt(id);
        const pathPdf = await CreateSalePdf(result);
        if (options.to) {
            const emailService = new NotificacionesService();
           const bufferPdf = readFileSync(pathPdf);

           await emailService.sendReportByEmail({
            to: options.to ,
            subject: "Reporte de venta",
            body: "Reporte de venta nueva prueba" ,
            pdf: bufferPdf.toString('base64')
           })
        }
        return {ok: true, info: pathPdf,result, message: "Reporte generado"}
    }

}