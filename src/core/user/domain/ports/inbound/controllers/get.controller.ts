import { User } from '@core/user/domain/interfaces/User'

export interface GetUserControllerPort<R, B> {
    get(user: R): Promise<B>
    getByID(id: number): Promise<User>
}
