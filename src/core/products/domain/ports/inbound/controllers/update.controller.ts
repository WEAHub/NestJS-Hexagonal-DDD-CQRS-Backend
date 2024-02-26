export interface UpdateProductControllerPort<A, B, C> {
    update(id: A, category: B): Promise<C>
}
