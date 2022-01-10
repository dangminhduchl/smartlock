export default {
    POSTGRES_INFO: {
        user: 'postgres',
        host: 'localhost',
        database: 'smartLock',
        password: '3101',
        port: 5432,
    },
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
}