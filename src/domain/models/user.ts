export class User {
  idUser?: number | null;
  email: string;
  password: string;
  idRole: number;

  /**
   *
   */
  constructor(infoUser: {
    idUser?: number|null;
    email: string;
    password: string;
    idRole: number;
  }) {
    this.idUser = infoUser.idUser;
    this.email = infoUser.email;
    this.password= infoUser.password;
    this.idRole = infoUser.idRole
  }
}
