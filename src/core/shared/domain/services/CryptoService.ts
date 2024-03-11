import { AESConfig } from '@config/aes.config'
import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

export class CryptoService {
    private aesConfig = this.configService.get<AESConfig>('aes')
    private iv: string
    private key: string

    constructor(private configService: ConfigService) {
        const key = crypto
            .createHash('sha512')
            .update(this.aesConfig.key)
            .digest('hex')
            .substring(0, 64)

        const iv = crypto
            .createHash('sha512')
            .update(this.aesConfig.iv)
            .digest('hex')
            .substring(0, 32)

        this.key = key
        this.iv = iv
    }

    decrypt(data: string): string {
        const buffer = Buffer.from(data, 'base64')
        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            Buffer.from(this.key, 'hex'),
            Buffer.from(this.iv, 'hex'),
        )
        let decrypted = decipher.update(buffer)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    }
}

export const CryptoServiceProvider: Provider = {
    provide: CryptoService,
    useFactory: (configService: ConfigService) =>
        new CryptoService(configService),
    inject: [ConfigService],
}
