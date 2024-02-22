import { ApplicationException } from '@core/shared/exception/ApplicationException'
import { EntityNotFoundException } from '@core/shared/exception/EntityNotFoundException'
import { ValidationException } from '@core/shared/exception/ValidationException'
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common'
import { Response, Request } from 'express'

@Catch(
    ApplicationException, //
    ValidationException,
    EntityNotFoundException,
)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        Logger.error(
            `Shopy API (${request.method}) at {${request.path}} error: ${exception.message}`,
        )

        response.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: exception.message,
        })
    }
}
