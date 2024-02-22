export interface EditUserControllerPort<R, B> {
    update(user: R): Promise<B>
}
