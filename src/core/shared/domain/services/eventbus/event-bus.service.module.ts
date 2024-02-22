import { CqrsModule } from '@nestjs/cqrs'
import { EventBusPublisherService } from './event-bus-publisher.service'
import { Module } from '@nestjs/common'
export const EVENTBUS = 'EVENTBUS'

const providers = [
    EventBusPublisherService,
    {
        provide: EVENTBUS,
        useExisting: EventBusPublisherService,
    },
]

@Module({
    imports: [CqrsModule],
    providers,
    exports: [...providers],
})
export class EventBusProviderModule {}
