export interface DeleteProductControllerPort<A, B> {
    delete(id: A): Promise<B>
}
