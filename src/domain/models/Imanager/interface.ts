import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export interface Imanageable <T>  {
    create(body:T):Promise<ResultSetHeader>;
 
    read():Promise<RowDataPacket[]>;
    searcheById(id:number):Array<any>;
    delet(id:any):Promise<ResultSetHeader>;
    update(body:T):Promise<ResultSetHeader>;
    

}



