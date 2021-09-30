process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT) || 3001,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
