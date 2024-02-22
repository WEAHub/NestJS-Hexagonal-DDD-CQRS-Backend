export interface CreateUserControllerPort<R, B> {
    createUser(user: R): Promise<B>
}
