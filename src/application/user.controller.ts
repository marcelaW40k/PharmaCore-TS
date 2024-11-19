

import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { User } from "../domain/models/user";
import { updateDto } from "../infrastructure/dto/user.dto";
import { UserRepository } from "../infrastructure/repositories/config/user.repository";


export class UserCtrl implements Imanageable<User>  {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(body: User): Promise<User | null> {

    try {
      const user = new User(body)
      const result = await this.repository.create(user)
      if (result && result.id_user == 1){
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
     if(result.length == 1) {
      console.log("usuarios obtenidos")
     
      
     }else{
      console.log("no se encontró")
     }
  
     return result ;
   
  }

  async searchById(id: number): Promise<User | null> {
      try {
        const resultado = await this.repository.searchById(id)
        if(resultado) {
          return resultado
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

        if (resultado === true) {
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
  
  async update(body:{id_user:number, email:string, password:string, id_role:number}): Promise<User | null> {
    

   

    try {
      const update = new updateDto(body);
      const  errores = await update.validateDto();

      if(errores.length > 0){
        console.log("usuario actualizado")
        throw new Error("Hubo un eror al validar los datos ")
      }

      const user = new User(body)
      const result = await this.repository.update(user)
      return result;

    }catch(error){
      throw error;
    }
      
  }  


  }



  
 

  


