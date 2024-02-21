export interface RefreshTokenControllerPort<R, B> {
    refresh(user: R): Promise<B>
}
