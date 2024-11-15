import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export interface Imanageable<T> {
    create(body: T): Promise<any>;
    read(): Promise<any>;
    searcheById(id: number): Promise<any>;
    delete(id: number): Promise<any>;
    update(body: T): Promise<any>;
}



