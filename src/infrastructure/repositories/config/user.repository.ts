
import { Imanageable } from "../../../domain/models/Imanager/Imanageable";
import { User } from "../../../domain/models/user";
import { getPoolConnection } from "../../../infrastructure/repositories/config/data.source";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export class UserRepository implements Imanageable<User> {

  async create(body: User): Promise<User|null> {
    const connection = getPoolConnection();
    const querySql: string = `INSERT  INTO users (email,password,idRole) values (?,?,?)`;
    const values: Array<string | number> = [
      body.email,
      body.password,
      body.id_role
    ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );
    body.id_user = result[0].insertId;
    return result[0].affectedRows == 1? body:null;
  }

  async read(): Promise<User[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM users`;
    const result = await connection.query(querySql);
    return result[0] as User[]
  }


  async searcheById(id: number): Promise<User | null> {
    const connection = getPoolConnection();
    const querySql: string = `SELECT   * FROM users WHERE id = ?`;
    const values = [id];
    const result: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);
    return result[0].length > 0 ? result[0][0] as User : null; 
  }

  

  async remove(id: number): Promise<boolean> {
    const connection = getPoolConnection();
    const querySql = ` DELETE FROM users WHERE id = ?`;
    const values = [id];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
      querySql,
      values
    );

    return result[0].affectedRows == 1? true:false;
  }

  async update(body: User): Promise<User|null> {
    const connection = getPoolConnection();
    const querySql = `UPDATE users SET idUser = , email = ? , password = ?, idRole = ?`;
    const values = [body.id_user, body.email, body.password, body.id_role];
    const result = await connection.query<ResultSetHeader>(querySql, values);

    body.id_user = result[0].insertId;
    return result[0].affectedRows == 1? body:null;

    
  }
}

