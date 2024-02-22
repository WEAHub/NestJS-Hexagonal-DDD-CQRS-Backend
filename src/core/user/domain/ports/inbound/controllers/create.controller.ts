export interface CreateUserControllerPort<R, B> {
    create(user: R): Promise<B>
}
