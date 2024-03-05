export interface UpdateCartControllerPort<R, B> {
    update(id: number, user: R): Promise<B>
}
