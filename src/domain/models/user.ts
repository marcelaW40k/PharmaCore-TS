export class user {
  idUser: number;
  email: string;
  password: string;
  id_role: number;

  /**
   *
   */
  constructor(infoUser: {
    idUser: number;
    email: string;
    password: string;
    id_role: number;
  }) {
    this.idUser = infoUser.idUser;
    this.email = infoUser.email;
    this.password= infoUser.password;
    this.id_role = infoUser.id_role
  }
}
