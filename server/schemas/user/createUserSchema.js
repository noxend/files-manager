module.exports = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    passConfirm: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
  },
};
