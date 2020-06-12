const nodemailer = require('nodemailer');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const hbs = require('handlebars');
const fs = require('fs');
const uuid = require('uuid/v4');
const { promisify } = require('util');

const { emailServiceConfig } = require('../config');
const {
  UserConfirmationLink,
  User: UserModel,
  ResetPassword: ResetPasswordModel
} = require('../models');
const { generalConfig } = require('../config');

const readFilePromise = promisify(fs.readFile);
const tamplateDir = path.join(__dirname, '..', 'views', 'email');
const partialsDir = path.join(__dirname, '..', 'views', 'email', 'partials');

const filenames = fs.readdirSync(partialsDir);
filenames.forEach(item => {
  const file = fs.readFileSync(path.join(partialsDir, item), 'utf8');
  hbs.registerPartial(item.split('.')[0], file);
});

const renderHbsTemplate = async ({ template, data }) => {
  const index = await readFilePromise(
    path.join(tamplateDir, `${template}.hbs`),
    'utf8'
  );
  return hbs.compile(index)(data);
};

class Transports {
  // eslint-disable-next-line class-methods-use-this
  send() {
    throw new Error('this method should be overridden');
  }
}

class Nodemailer extends Transports {
  // eslint-disable-next-line class-methods-use-this
  async send({ to, template, data }) {
    const msg = {
      to,
      from: emailServiceConfig.nodemailer.user,
      subject: data.subject,
      html: await renderHbsTemplate({
        template,
        data
      })
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailServiceConfig.nodemailer.user,
        pass: emailServiceConfig.nodemailer.pass
      }
    });
    await transporter.sendMail(msg);
  }
}

class SgMail extends Transports {
  // eslint-disable-next-line class-methods-use-this
  async send({ to, template, data }) {
    const msg = {
      to,
      from: emailServiceConfig.nodemailer.user,
      subject: data.subject,
      html: await renderHbsTemplate({
        template,
        data
      })
    };

    sgMail.setApiKey(emailServiceConfig.sgMail.apiKey);
    await sgMail.send(msg);
  }
}

class Emails {
  // eslint-disable-next-line class-methods-use-this
  send({ to, template, data }) {
    switch (emailServiceConfig.provider) {
      case 'send_grid':
        return new SgMail().send({ to, template, data });
      case 'nodemailer':
        return new Nodemailer().send({ to, template, data });
      default:
        return new Nodemailer().send({ to, template, data });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sendResetPasswordEmail({ to, data }) {
    const hash = uuid();
    const result = await UserModel.selectByKey('email', to);
    const resetPasswordModel = new ResetPasswordModel({
      userId: result.id,
      hash,
      expiredAt: new Date(86400000 + Date.now())
    });
    await resetPasswordModel.save();

    const link = `${generalConfig.host}/change-password/${hash}`;

    return this.send({
      to,
      template: 'reset-password',
      data: {
        ...data,
        username: `${result.user_name[0].toUpperCase()}${result.user_name.slice(1)}`,
        subject: 'Reset Password Instructions',
        link
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async sendWelcomeEmail({ to, data }) {
    const hash = uuid();
    const result = await UserModel.selectFieldByKey('id', 'email', to);
    const userConfirmationLink = new UserConfirmationLink({
      userId: result.id,
      hash,
      expiredAt: new Date(86400000 + Date.now())
    });

    const link = `${generalConfig.host}/confirmation/${hash}`;

    await userConfirmationLink.save();

    return this.send({
      to,
      template: 'welcome',
      data: {
        ...data,
        username: `${data.username[0].toUpperCase()}${data.username.slice(1)}`,
        subject: 'Welcome to the Files Manager!',
        link
      }
    });
  }
}

module.exports = { Emails };
