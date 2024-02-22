import { User } from '@core/user/domain/interfaces/User'

export interface GetUserControllerPort<R, B> {
    getUser(user: R): Promise<B>
    getByID(id: number): Promise<User>
}
