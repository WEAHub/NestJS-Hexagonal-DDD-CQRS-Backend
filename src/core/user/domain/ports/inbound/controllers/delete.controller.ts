export interface DeleteUserControllerPort<R, B> {
    delete(id: R): Promise<B>
}
