export interface EditUserControllerPort<R, B> {
    editUser(user: R): Promise<B>
}
