export interface UpdateUserControllerPort<R, B> {
    update(user: R): Promise<B>
}
