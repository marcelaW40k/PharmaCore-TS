export interface Imanageable {
    create(body:object):Array<any>;
    read():Array<any>;
    searcheById(id:number):Array<any>;
    delet(id:number):Array<any>;
    update(body:object):Array<any>;

}
