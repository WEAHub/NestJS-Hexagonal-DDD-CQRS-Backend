import { Token } from '@core/domain/interfaces/Token'

export class RefreshTokenCommand {
    constructor(public readonly user: Token) {}
}
