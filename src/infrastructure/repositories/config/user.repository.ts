import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Imanageable } from "../../../domain/models/Imanager/interface";
import { user } from "../../../domain/models/user";
import { getPoolConnection } from "../../../infrastructure/repositories/config/data.source";

export class UserRepository implements Imanageable<user> {
  async create(user: user): Promise<ResultSetHeader> {
    const connection = getPoolConnection();
    const querySql: string = `insert  into users (idUser,name,description) values (?,?,?)`;
    const values: Array<string | number> = [
      user.idUser,
      user.name,
      user.description,
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );

    return result[0];
  }

  async read(): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySql = `select * from users`;
    const result = await connection.query<RowDataPacket[]>(querySql);
    return result[0];
  }

  async searcheById(id: number): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySql = `select  * from users where id = ?`;
    const values = [id];
    const queryResult = await connection.query<RowDataPacket[]>(
      querySql,
      values
    );
    return queryResult[0];
  }

  async delete(id: number): Promise<ResultSetHeader> {
    const connection = getPoolConnection();
    const querySql = `delete from users where id = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );

    return result[0];
  }

  async update(user: user): Promise<ResultSetHeader> {
    const connection = getPoolConnection();
    const querySql = `update users set idUser = , name = ? , description = ?`;
    const values = [user.idUser, user.name, user.description];
    const result = await connection.query<ResultSetHeader>(querySql, values);

    return result[0];
  }
}

