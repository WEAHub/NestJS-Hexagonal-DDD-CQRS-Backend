export interface GetUserControllerPort<R, B> {
    getUser(user: R): Promise<B>
}
