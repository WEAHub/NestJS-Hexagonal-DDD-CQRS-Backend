import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserInfrastructureModule } from './infrastructure/infrastructure.module'

import UseCases from './application/use-cases'
import Events from './application/events'
import CommandHandlers from './application/commands'
import Queries from './application/queries'
import { UserFactory } from './domain/UserFactory'
import { PasswordService } from '@core/shared/domain/services/PasswordService'

const Services = [PasswordService]

const providers = [
    UserFactory,
    ...CommandHandlers,
    ...Queries,
    ...Events,
    ...UseCases,
    ...Services,
]

@Module({
    imports: [CqrsModule, UserInfrastructureModule],
    providers,
    exports: providers,
})
export class UserModule {}
