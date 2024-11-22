import PdfDocument from "pdfkit";
import fs from "fs";
import { SaleReceipt } from "../../domain/models/saleReceipt";
import { generate as random } from "randomstring";

//envolver en promesa
export const CreateSalePdf = (sale: SaleReceipt) => {

    return new Promise<string>((resolve, reject) => {

        try {


            const pdf = new PdfDocument({ margin: 50 });
            const pathPdf = `./static/Factura de venta ${random(10)} - ${sale.id_sale}.pdf`


            const stream = fs.createWriteStream(pathPdf);
            pdf.pipe(stream);


            pdf.image('./static/images/quickpharmalogo.png', pdf.page.width - pdf.page.margins.right - 100, pdf.page.margins.top, {
                width: 50,
                height: 50,
            });


            pdf.fontSize(16).font("Helvetica-Bold").text("Factura de compra Quickpharma", { align: "center" }).moveDown();


            pdf.fontSize(12).font("Helvetica");
            pdf.text(`Número de la venta: ${sale.id_sale}`).moveDown(0.5);
            pdf.text(`Identificación del paciente: ${sale.id_patient}`).moveDown(0.5);
            pdf.text(`Fecha y hora de la venta: ${sale.date_time}`).moveDown(0.5);
            pdf.text(`Valor total de la venta: $${sale.sale_total_cost.toFixed(2)}`).moveDown(1);


            pdf.text("Desglose de artículos de la compra:").moveDown(0.5);


            const tableHeaders = ["Id del medicamento", "Unidades", "Costo unidad", "Costo total del artículo"];
            const columnWidths = [150, 100, 100, 150];
            const startX = pdf.page.margins.left;
            let currentY = pdf.y;

            pdf.font("Helvetica-Bold");
            tableHeaders.forEach((header, index) => {
                const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
                pdf.text(header, startX + x, currentY, {
                    width: columnWidths[index],
                    align: "left",
                });
            });

            currentY += 20;
            pdf.font("Helvetica");


            sale.items.forEach(item => {
                const rowValues = [
                    item.id_medicine,
                    item.quantity.toString(),
                    `$${item.unit_cost.toFixed(2)}`,
                    `$${item.total_cost_item.toFixed(2)}`
                ];

                rowValues.forEach((value, index) => {
                    const x = columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
                    pdf.text(value, startX + x, currentY, {
                        width: columnWidths[index],
                        align: "left",
                    });
                });

                currentY += 20;


                if (currentY > pdf.page.height - pdf.page.margins.bottom - 30) {
                    pdf.addPage();
                    currentY = pdf.page.margins.top;
                }
            });


            pdf.end();


            stream.on("finish", () => {
                console.log(`PDF generado: ${`./static/Factura de venta ${sale.id_sale}.pdf`}`);
                resolve(pathPdf);
            });
        }
        catch (error) {
            console.error("Error al generar el PDF:", error);
            reject(error);
        }
    })
}
