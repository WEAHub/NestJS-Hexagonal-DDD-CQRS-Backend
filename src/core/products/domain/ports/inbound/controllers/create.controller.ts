export interface CreateProductControllerPort<A, B> {
    create(category: A): Promise<B>
}
