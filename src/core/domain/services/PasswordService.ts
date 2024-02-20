import { compare, hash } from 'bcrypt'

export class PasswordService {
    private rounds = 10

    async encrypt(password: string): Promise<string> {
        return await hash(password, this.rounds)
    }

    async verify(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash)
    }
}
