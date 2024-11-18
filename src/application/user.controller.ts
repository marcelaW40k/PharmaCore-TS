

import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { User } from "../domain/models/user";
import { updateDto } from "../infrastructure/dto/user.dto";
import { UserRepository } from "../infrastructure/repositories/config/user.repository";


export class UserController implements Imanageable<User>  {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(body: User): Promise<User | null> {

    try {
      const result:any = await this.repository.create(body)
      if (result.affectedRows == 1){
        console.log(`el usuario  se agregó con exito`)
        return result;
      }else{
        console.log (`el usuario  no se agregó con exito`)
        return null;
      }
      
    }catch(error:any){
      console.log("ha ocurrido un erro al agregar." , error.message)
    }
    return body;
 
  }

  async read(): Promise<User[]> {

    const result:User[] = await this.repository.read()
     if(result.length == 0) {
      console.log("usuarios obtenidos")
     
      
     }else{
      console.log("no se encontró")
     }
  
     return result ;
   
  }

  async searchById(id: number): Promise<User | null> {
      try {
        const resultado:any = await this.repository.searchById(id)
        if(resultado.length == 1) {
          return resultado[0]
        }else{
          return null;
        }
          
      }catch(error:any){
        console.log("Ha ocurrido un error inesperado", error.message)
        return null;
      }
  }

  async remove(id: number): Promise<boolean> {

    try {
      const resultado:any = await this.repository.remove(id)

        if (resultado.affectedRows == 1) {
          console.log(`usuario eliminado`)
          return true;
        }else {
          console.log(`no se pudo eliminar el usuario ${id}`)
          return false;
        }
    }

    catch(error)  {
      console.log(`Ocurrio un error inesperado con ${id}`)
      return false;

    };

  }
  
  async update(body: User): Promise<User | null> {

    try {

      if (body.id_user == null) { console.log("El campo 'id_user' es necesario y no puede ser null o undefined"); return null; }

      const dto = new updateDto({
        id_user: body.id_user, email: body.email, password: body.password, id_role: body.id_role

      })
      const result:any = await this.repository.update(body)

      if(result.affectedRows == 1){
        console.log("usuario actualizado")
        return body;
      }else {
        console.log("no se pudo actualizar el usuario")
        return null;
      }
    }catch(error:any){
      console.log("Ha ocurrido un error inesperado", error.message)
      return null;
    }
      
  }  


  }

 

  


