export class user {
    idUser :  number;
    name:  string;
    description : string;

    /**
     *
     */
    constructor(infoUser:{
        idUser :  number;
        name:  string;
        description : string;
    }) {
        this.idUser = infoUser.idUser
        this.name = infoUser.name
        this.description = infoUser.description    
    }
}
