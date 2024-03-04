export interface UpdateUserControllerPort<R, B> {
    update(id: number, user: R): Promise<B>
}
