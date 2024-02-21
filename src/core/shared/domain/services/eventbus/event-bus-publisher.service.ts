import { Injectable } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { EventBase } from '@core/shared/ddd/DomainEvent'
import { EventBusPublisher } from '@core/shared/domain/ports/inbound/EventBusPublisher'

@Injectable()
export class EventBusPublisherService implements EventBusPublisher {
    constructor(private eventbus: EventBus) {}

    async publish(event: EventBase): Promise<void> {
        await this.eventbus.publish(event)
    }
}
