import { User } from '@core/user/domain/interfaces/User'
import { UserRoles } from '@core/user/shared/enums/user-roles.enum'
import { CanActivate, ExecutionContext } from '@nestjs/common'

export class IsAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const user: User = request.user
        return user.role === UserRoles.ADMIN
    }
}
