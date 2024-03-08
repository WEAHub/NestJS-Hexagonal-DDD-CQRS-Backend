export interface GetCategoryControllerPort<A, B, C> {
    findAll(): Promise<C[]>
    findByName(name: A): Promise<C>
    findById(id: B): Promise<C>
}
