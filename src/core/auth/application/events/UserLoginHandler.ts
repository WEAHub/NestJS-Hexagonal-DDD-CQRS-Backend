import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserLoginEvent } from '../../domain/events/UserLoginEvent'
import { Logger } from '@nestjs/common'

@EventsHandler(UserLoginEvent)
export class UserLoginEventHandler implements IEventHandler<UserLoginEvent> {
    constructor() {}

    async handle(event: UserLoginEvent) {
        Logger.log(`User(email=${event.getData()}) logged in`)
    }
}
