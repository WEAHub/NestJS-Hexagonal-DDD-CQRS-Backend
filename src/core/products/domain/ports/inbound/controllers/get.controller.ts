export interface GetProductControllerPort<A, B, C> {
    findAll(productOptions: A): Promise<C>
    findByName(name: string): Promise<B>
    findById(id: number): Promise<B>
}
