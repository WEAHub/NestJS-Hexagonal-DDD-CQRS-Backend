export interface LoginControllerPort<R, B> {
    login(user: R): Promise<B>
}
