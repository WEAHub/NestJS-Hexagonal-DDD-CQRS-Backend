export interface AESConfig {
    key: string
    iv: string
}

export default () => ({
    aes: {
        key: process.env.AES_KEY,
        iv: process.env.AES_IV,
    },
})
