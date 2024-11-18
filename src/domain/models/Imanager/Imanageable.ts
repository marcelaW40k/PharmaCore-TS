
export interface Imanageable<T> {
    create(body: T): Promise<T | null>;
    read(): Promise<T[]>;
    searchById(id: number): Promise<T | null>; // searchById cambiar nombre
    remove(id: number): Promise<boolean>;
    update(body: T): Promise<T | null>;
}



