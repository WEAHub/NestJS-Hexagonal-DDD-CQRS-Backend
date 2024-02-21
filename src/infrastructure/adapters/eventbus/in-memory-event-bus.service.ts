import { Injectable, Logger } from '@nestjs/common'
import { EventBase } from '../../../core/shared/ddd/DomainEvent'
import { EventSubscriber } from '../../../core/shared/ddd/DomainEventSubscriber'
import { DomainEventBus } from '../../../core/shared/ddd/DomainEventBus'

@Injectable()
export class InMemoryEventBus implements DomainEventBus {
    private subscribers: EventSubscriber[] = []

    subscribe(subscriber: EventSubscriber): void {
        this.subscribers.push(subscriber)
    }

    publish(event: EventBase): void {
        Logger.log(`Publishing Event(name="${event.getName()}")`)

        this.subscribers
            .filter((subscriber) => subscriber.suscribeTo() === event.getName())
            .forEach((subscriber) => {
                try {
                    subscriber.onEvent(event)
                } catch (error) {
                    Logger.warn('Error subscriber', error)
                }
            })
    }
}
