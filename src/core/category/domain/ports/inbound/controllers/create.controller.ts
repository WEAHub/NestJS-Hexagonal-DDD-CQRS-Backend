export interface CreateCategoryControllerPort<A, B> {
    create(category: A): Promise<B>
}
