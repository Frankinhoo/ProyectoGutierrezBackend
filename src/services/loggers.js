const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        fileAppenderWarn: { type: 'file', filename: './logs/warn.log' },
        fileAppenderError: { type: 'file', filename: './logs/error.log' },
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        myLoggerWarn: { appenders: ['fileAppenderWarn'], level: 'warn' },
        myLoggerError: { appenders: ['fileAppenderError'], level: 'error' },
    },
});

const logger = log4js.getLogger();

module.exports = {
    logger
}