export interface GetProductControllerPort<C> {
    findAll(): Promise<C[]> /* 
    findByName(name: A): Promise<C>
    findById(id: B): Promise<C> */
}
