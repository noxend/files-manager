const { assert } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

const { Emails } = require('../service/emails');
const createFolderService = require('../service/createFolder');
const {
  userController: { userConfirmation }
} = require('../controllers');

const {
  User: UserModel,
  UserRole: UserRoleModel,
  UserConfirmationLink: UserConfirmModel
} = require('../models');

const userController = (User, UserRole) =>
  proxyquire('../controllers/userController', {
    '../models': {
      User,
      UserRole
    }
  });

describe('controllers/userController.js', () => {
  describe('registration()', () => {
    it('should return the status code 200 and user data in object', async () => {
      const selectByKeyMock = sinon
        .stub(UserModel, 'selectByKey')
        .returns(false);
      const saveMock = sinon.stub(UserModel.prototype, 'save').returns(true);
      const getIdByKeyMock = sinon.stub(UserRoleModel, 'getIdByKey').returns(3);
      const genSaltMock = sinon
        .stub(bcrypt, 'genSalt')
        .returns(Promise.resolve('some salt'));
      const hashMock = sinon
        .stub(bcrypt, 'hash')
        .returns(Promise.resolve('some hash'));

      const sendEmailMock = sinon
        .stub(Emails.prototype, 'sendWelcomeEmail')
        .returns(true);

      const createFolderServiceMock = sinon.stub(
        createFolderService,
        'createFolder'
      );

      const userControllerMock = userController(UserModel, UserRoleModel);

      const req = {
        body: {
          username: 'sasha',
          email: 'noxend@gmail.com',
          password: '123123'
        }
      };
      const jsonMock = sinon.spy();
      const res = {
        status: sinon.stub().returns({
          json: jsonMock
        })
      };
      const next = sinon.spy();

      await userControllerMock.registration(req, res, next);

      assert(selectByKeyMock.calledOnce);
      assert(saveMock.calledOnce);
      assert(getIdByKeyMock.calledOnce);
      assert(selectByKeyMock.calledOnce);
      assert(genSaltMock.calledOnce);
      assert(hashMock.calledOnce);
      assert(createFolderServiceMock.calledOnce);
      assert(sendEmailMock.calledOnce);
      assert.typeOf(jsonMock.args[0][0], 'object');
      assert.containsAllKeys(jsonMock.args[0][0], ['username', 'email']);
      assert.equal(res.status.args[0][0], 200);

      selectByKeyMock.restore();
      saveMock.restore();
      getIdByKeyMock.restore();
      genSaltMock.restore();
      hashMock.restore();
      sendEmailMock.restore();
    });

    it('should return the status code 409', async () => {
      const selectByKeyMock = sinon
        .stub(UserModel, 'selectByKey')
        .returns(true);

      const userControllerMock = userController(UserModel, UserRoleModel);

      const req = {
        body: {
          username: 'sasha',
          email: 'noxend@gmail.com',
          password: '123123'
        }
      };

      const jsonMock = sinon.spy();
      const res = {
        status: sinon.stub().returns({
          json: jsonMock
        })
      };
      const next = sinon.spy();

      await userControllerMock.registration(req, res, next);

      assert(selectByKeyMock.calledOnce);
      assert.typeOf(jsonMock.args[0][0], 'object');
      assert.containsAllKeys(jsonMock.args[0][0], 'message');
      assert.equal(res.status.args[0][0], 409);

      selectByKeyMock.restore();
    });
  });

  describe('auth()', () => {
    it('Should return status code 200 and token in object', async () => {
      const compareMock = sinon
        .stub(bcrypt, 'compare')
        .returns(Promise.resolve(true));

      process.env.JWT_KEY = 'key';

      const selectByKeyMock = sinon.stub(UserModel, 'selectByKey').returns({
        id: 2,
        email: 'noxend@gmail.com',
        created_at: null,
        updated_at: null
      });

      const req = {
        body: {
          username: 'sasha',
          email: 'noxend@gmail.com',
          password: '123123'
        }
      };

      const jsonMock = sinon.spy();
      const res = {
        status: sinon.stub().returns({
          json: jsonMock
        })
      };
      const next = sinon.spy();

      const userControllerMock = userController(UserModel, UserRoleModel);
      await userControllerMock.auth(req, res, next);

      assert(compareMock.calledOnce);
      assert(selectByKeyMock.calledOnce);
      assert.typeOf(jsonMock.args[0][0], 'object');
      assert.containsAllKeys(jsonMock.args[0][0], ['token']);
      assert.equal(res.status.args[0][0], 200);

      compareMock.restore();
      selectByKeyMock.restore();
    });

    it('Should return status code 404', async () => {
      const selectByKeyMock = sinon
        .stub(UserModel, 'selectByKey')
        .returns(false);

      const req = {
        body: {
          username: 'sasha',
          email: 'noxend@gmail.com',
          password: '123123'
        }
      };

      const jsonMock = sinon.spy();
      const res = {
        status: sinon.stub().returns({
          json: jsonMock
        })
      };
      const next = sinon.spy();

      const userControllerMock = userController(UserModel, UserRoleModel);
      await userControllerMock.auth(req, res, next);

      assert(selectByKeyMock.calledOnce);
      assert.typeOf(jsonMock.args[0][0], 'object');
      assert.containsAllKeys(jsonMock.args[0][0], ['message']);
      assert.equal(res.status.args[0][0], 404);

      selectByKeyMock.restore();
    });
  });

  describe('userConfirmation()', () => {
    it('Should return status code 200 and message', async () => {
      const updateMock = sinon.stub(UserConfirmModel, 'update').returns(true);

      const req = {
        params: {
          hash: 'hash'
        }
      };

      const jsonMock = sinon.spy();
      const res = {
        status: sinon.stub().returns({
          json: jsonMock
        })
      };
      const next = sinon.spy();

      await userConfirmation(req, res, next);

      assert.typeOf(jsonMock.args[0][0], 'object');
      assert.containsAllKeys(jsonMock.args[0][0], ['message', 'type']);
      assert.equal(jsonMock.args[0][0].type, 'confirmed');
      assert(updateMock.calledOnce);

      updateMock.restore();
    });
  });
});