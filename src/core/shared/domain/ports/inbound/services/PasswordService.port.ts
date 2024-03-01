export interface PasswordServicePort {
    encrypt(password: string): Promise<string>
    verify(password: string, hash: string): Promise<boolean>
}
