
import { Doctor } from "../domain/models/doctor";
import { doctorRepository } from "../infrastructure/repositories/config/doctor.repository";
import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { updateDtoDoctor } from "../infrastructure/dto/doctor.dto";


export class doctorController implements Imanageable<Doctor> {
  // agregar la interface
  private repository: doctorRepository;

  constructor() {
    this.repository = new doctorRepository();
  }

  async create(body: Doctor): Promise<Doctor | null> {
    try {
      const doctor = new Doctor(body);
      const result = await this.repository.create(doctor);
      if (result && result.id_doctor == 1) {
        console.log(`se agregó con exito`);
        return result;
      } else {
        console.log(` no se agregó con exito`);
        return null;
      }
    } catch (error: any) {
      console.log("ha ocurrido un erro al agregar.", error.message);
    }
    return body;
  }

  async read(): Promise<Doctor[]> {
    const result: Doctor[] = await this.repository.read();
    if (result.length == 1) {
      console.log(" obtenidos");
    } else {
      console.log("no se encontró");
    }

    return result;
  }

  async searchById(id: number): Promise<Doctor | null> {
    try {
      const resultado = await this.repository.searchById(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log("Ha ocurrido un error inesperado", error.message);
      return null;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const resultado: any = await this.repository.remove(id);

      if (resultado === true) {
        console.log(` eliminado`);
        return true;
      } else {
        console.log(`no se pudo eliminar el ${id}`);
        return false;
      }
    } catch (error) {
      console.log(`Ocurrio un error inesperado con ${id}`);
      return false;
    }
  }
   
  async update(body: {
    id_doctor: number;
    name: string;
    last_name: string;
  
  }): Promise<Doctor | null> {
    try {
      const update = new updateDtoDoctor(body);
      const errores = await update.validateDto();

      if (errores.length > 0) {
        console.log(" actualizado");
        throw new Error("Hubo un eror al validar los datos ");
      }

      const user = new Doctor(body);
      const result = await this.repository.update(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
