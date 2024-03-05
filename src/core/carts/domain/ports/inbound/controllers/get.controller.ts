export interface GetCartControllerPort<R, B> {
    get(user: R): Promise<B>
    //getById(id: number): Promise<B>
}
