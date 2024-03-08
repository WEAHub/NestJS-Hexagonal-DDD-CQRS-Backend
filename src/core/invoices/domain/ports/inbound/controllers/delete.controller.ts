export interface DeleteCategoryControllerPort<A, B> {
    delete(id: A): Promise<B>
}
