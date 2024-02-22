import { UseGuards } from '@nestjs/common'
import { IsAdminGuard } from '../guards/is-admin.guard'

export function IsAdmin(): MethodDecorator & ClassDecorator {
    return UseGuards(new IsAdminGuard())
}
