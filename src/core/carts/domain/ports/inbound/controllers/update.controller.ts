export interface UpdateCartControllerPort<R, B> {
    update(id: number, cart: R): Promise<B>
}
