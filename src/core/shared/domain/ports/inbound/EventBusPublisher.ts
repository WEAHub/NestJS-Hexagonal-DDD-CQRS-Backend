import { EventBase } from '@core/shared/ddd/DomainEvent'

export interface EventBusPublisher {
    publish(event: EventBase): void
}
