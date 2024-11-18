import { ResultSetHeader } from "mysql2";
import { User } from "../domain/models/doctor";
import { UserRepository } from "../infrastructure/repositories/config/doctor.repository";
import { error } from "console";

export class UserController  { // agregar la interface
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  // async create(body: {
  //   idUser: number;
  //   email: string;
  //   password: string;
  //   idRole: number;
  // }){
  //   // este body debe ser completamente string, por que son los valores que vienen de postman
  //   try {
  //     const dto = new userDto(body); // pendiente por hacer el dto
  //     const errores = await dto.validateDto();
  //     if (errores.Length > 0) {
  //           return {
  //           ok: false,
  //           message: "el request tiene errores",
  //           error: errores,
  //           };
  //       }

  //     const user = new User(body);
  //     const result = await this.repository.create(user);
  //     if (result.affectedRows == 1) {
  //       return { ok: false, message: "ha ocurrido un error inesperado", error };
  //     } else {
  //       return { ok: false, message: "el usuario no se agregó" };
  //     }
  //   } catch (error: any) {
  //     throw { ok: false, message: "ha ocurrido un error inesperado", error };
  //   }
  // }

  async read() {
       const result = await this.repository.read()
        // if(result.length == 0)
        console.log("usuarios obtenidos")
        console.log(result[0])
        return result ;
  }
}
