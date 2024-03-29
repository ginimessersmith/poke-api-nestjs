export const envConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongo_db: process.env.MONGO_DB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})