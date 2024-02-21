import { Token } from "@core/auth/domain/interfaces/Token";

export class RefreshTokenCommand {
    constructor(public readonly user: Token) {}
}
