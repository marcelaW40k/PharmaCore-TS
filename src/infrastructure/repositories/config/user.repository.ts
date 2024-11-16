
import { Imanageable } from "../../../domain/models/Imanager/Imanageable";
import { User } from "../../../domain/models/user";
import { getPoolConnection } from "../../../infrastructure/repositories/config/data.source";

export class UserRepository implements Imanageable<User> {

  // async create(user: User): Promise<any> {
  //   const connection = getPoolConnection();
  //   const querySql: string = `INSERT  INTO users (idUser,email,password,idRole) values (?,?,?,?)`;
  //   const values: Array<string | number> = [
  //     user.idUser,
  //     user.email,
  //     user.password,
  //     user.idRole
  //   ];
  //   const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
  //     querySql,
  //     values
  //   );

  //   return result[0] ;
  // }

  async read(): Promise<User[]> {
    const connection = getPoolConnection();
    const querySql = `SELECT * FROM users`;
    const result = await connection.query(querySql);
    return result[0] as User[]
  }

  // async searcheById(id: number): Promise<any> {
  //   const connection = getPoolConnection();
  //   const querySql = `SELECT   * FROM users WHERE id = ?`;
  //   const values = [id];
  //   const queryResult = await connection.query<RowDataPacket[]>(
  //     querySql,
  //     values
  //   );
  //   return queryResult[0] ;
  // }

  // async delete(id: number): Promise<any> {
  //   const connection = getPoolConnection();
  //   const querySql = ` DELETE FROM users WHERE id = ?`;
  //   const values = [id];
  //   const result: [ResultSetHeader, FieldPacket[]] = await connection.query(
  //     querySql,
  //     values
  //   );

  //   return result[0];
  // }

  // async update(user: User): Promise<any> {
  //   const connection = getPoolConnection();
  //   const querySql = `UPDATE users SET idUser = , email = ? , password = ?, idRole = ?`;
  //   const values = [user.idUser, user.email, user.password, user.idRole];
  //   const result = await connection.query<ResultSetHeader>(querySql, values);

  //   return result[0];
  // }
}

