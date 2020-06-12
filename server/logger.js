const { createLogger, transports } = require('winston');
const { winstonConfig } = require('./config');

module.exports = createLogger({
  transports: [
    new transports.File(winstonConfig.file),
    new transports.Console(winstonConfig.console),
  ],
});
