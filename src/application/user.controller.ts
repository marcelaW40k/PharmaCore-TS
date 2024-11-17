
import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { User } from "../domain/models/user";
import { UserRepository } from "../infrastructure/repositories/config/user.repository";
import { error } from "console";

export class UserController implements Imanageable<User>  {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  const 

  async create(body: User): Promise<User | null> {
      
  }

  async read() {
    const result = await this.repository.read()
     // if(result.length == 0)
     console.log("usuarios obtenidos")
     console.log(result[0])
     return result ;
  }

  
  }

 

  


