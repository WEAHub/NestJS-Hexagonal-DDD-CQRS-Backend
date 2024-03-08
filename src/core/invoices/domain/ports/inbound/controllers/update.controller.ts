export interface UpdateCategoryControllerPort<A, B, C> {
    update(id: A, category: B): Promise<C>
}
