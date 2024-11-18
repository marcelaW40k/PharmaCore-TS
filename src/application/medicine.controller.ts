import {  ResultSetHeader } from "mysql2";
import { Medicine } from "../domain/models/medicine";
import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { MedicineRepository } from "../infrastructure/repositories/config/medicines.repository";

export class MedicineController implements Imanageable<Medicine>{
  private repository: MedicineRepository;
  constructor() {
    this.repository = new MedicineRepository();
  }

  async create(body: {
    name_medicine: string;
    form: string;
    prescription: boolean;
    quantity_stock: number;
    unit_cost: number;
  }) {
    try {
      const medicine = new Medicine({
        name_medicine: body.name_medicine,
        form: body.form,
        prescription: body.prescription,
        quantity_stock: body.quantity_stock,
        unit_cost: body.unit_cost,
      });
      const resultMedicine = await this.repository.create(medicine);
      return resultMedicine
    } catch (error: any) {
      console.log("Ha ocurrido un error al guardar medicamento.", error?.message);
      return error;
    }
  }

  async update(body: {
    name_medicine: string;
    form: string;
    prescription: boolean;
    quantity_stock: number;
    unit_cost: number;
  }) {
    try {
      const medicine = new Medicine({
        name_medicine: body.name_medicine,
        form: body.form,
        prescription: body.prescription,
        quantity_stock: body.quantity_stock,
        unit_cost: body.unit_cost,
      });
      const resultMedicine = await this.repository.update(medicine);
      return resultMedicine
    } catch (error: any) {
      console.log("Ha ocurrido un error al actualizar medicamento.", error?.message);
      return error;
    }
  }


  async read() {
    try {
      const resultado = await this.repository.read();
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultar.");
      return error;
    }
  }

  async searcheById(id: number) {
    try {
      const resultado = await this.repository.searcheById(id);
      if (resultado.length == 1) {
        console.log("Categoría consultada");
        console.log(resultado[0]);
      } else {
        console.log("No se encontro la categoría");
      }
      return resultado;
    } catch (error) {
      console.log("Ha ocurrido un error al consultando.");
      return error;
    }
  }

  remove(id: string) {
    this.repository
      .remove(id)
      .then((resultado: ResultSetHeader) => {
        if (resultado.affectedRows == 1) {
          console.log(`Categoría eliminada`);
        } else {
          console.log("No se pudo eliminar la categoría");
        }
      })
      .catch((error) => {
        console.log("Ha ocurrido un error eliminando.");
        console.log(error);
      });
  }
}