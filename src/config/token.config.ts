export interface TokenConfig {
    accessKey: string
    accessExpiration: string
    refreshKey: string
    refreshExpiration: string
}

export default () => ({
    token: {
        accessKey: process.env.TOKEN_ACCESS_KEY,
        accessExpiration: process.env.TOKEN_ACCESS_EXPIRATION,
        refreshKey: process.env.TOKEN_REFRESH_KEY,
        refreshExpiration: process.env.TOKEN_REFRESH_EXPIRATION,
    },
})
