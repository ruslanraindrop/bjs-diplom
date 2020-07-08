'use strict';

const userForm = new UserForm();

const action = function ApiAction(response) {
  response.success ? location.reload() : alert(response.data);
};

userForm.loginFormCallback = function loginAction(data) {
  ApiConnector.login(data, action);
};

userForm.registerFormCallback = function registerAction(data) {
  ApiConnector.register(data, action);
};