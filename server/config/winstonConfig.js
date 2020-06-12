module.exports = {
  file: {
    maxsize: 5242880,
    maxFiles: 5,
    filename: 'logs/log.json',
    level: 'error',
    json: true,
  },
  console: {
    level: 'info',
    colorize: true,
    json: false,
  },
};
