'use strict';

const userForm = new UserForm();
const action = response => response.success ? location.reload() : alert(response.data);
userForm.loginFormCallback = data => ApiConnector.login(data, action);
userForm.registerFormCallback = data => ApiConnector.register(data, action);