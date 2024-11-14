import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
export interface Imanageable <T>  {
    create(body:T):Promise<ResultSetHeader>;
    read():Promise<RowDataPacket[]>;
    searcheById(id:number):Promise<RowDataPacket[]>;
    delete(id:number):Promise<ResultSetHeader>;
    update(body:T):Promise<ResultSetHeader>;
}



