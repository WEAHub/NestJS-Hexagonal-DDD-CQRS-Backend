import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserLoginEvent } from '../UserLoginEvent'
import { Log } from '@core/shared/utils/Log'

@EventsHandler(UserLoginEvent)
export class UserLoginEventHandler implements IEventHandler<UserLoginEvent> {
    constructor() {}

    async handle(event: UserLoginEvent) {
        Log.info(`User(id=${event.getData().id}) logged in`)
    }
}
