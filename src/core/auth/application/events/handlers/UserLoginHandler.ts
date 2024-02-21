import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserLoginEvent } from '../UserLoginEvent'
import { Log } from '@infrastructure/shared/Log'

@EventsHandler(UserLoginEvent)
export class UserLoginEventHandler implements IEventHandler<UserLoginEvent> {
    constructor() {}

    async handle(event: UserLoginEvent) {
        Log.info('User logged in', event)
    }
}
