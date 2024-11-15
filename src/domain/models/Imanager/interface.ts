import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
export interface Imanageable <T>  {
    create(body:T):Promise<T[]>;
    read():Promise<T[]>;
    searcheById(id:number):Promise<T[]>;
    delete(id:number):Promise<T[]>;
    update(body:T):Promise<T[]>;
}



