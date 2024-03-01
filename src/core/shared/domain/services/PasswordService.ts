import { compare, hash } from 'bcrypt'
import { PasswordServicePort } from '../ports/inbound/services/PasswordService.port'

export class PasswordService implements PasswordServicePort {
    private rounds = 10

    async encrypt(password: string): Promise<string> {
        return await hash(password, this.rounds)
    }

    async verify(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash)
    }
}
