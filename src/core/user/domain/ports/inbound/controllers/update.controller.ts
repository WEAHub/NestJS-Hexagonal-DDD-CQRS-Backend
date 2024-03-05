import { User } from '@core/user/domain/interfaces/User'

export interface UpdateUserControllerPort<R, B> {
    update(user: User, userProps: R): Promise<B>
    updateById(id: number, user: R): Promise<B>
}
