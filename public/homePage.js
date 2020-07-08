'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = function() {
  ApiConnector.logout(function(response) {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current(function(response) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function getCurrency() {
  ApiConnector.getStocks(function(response) {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};

getCurrency();
setInterval(getCurrency, 60000);

const moneyManager = new MoneyManager();

const checking = function isTrue(response) {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(false, 'Операция выполнена успешно');
  } else {
    moneyManager.setMessage(true, response.data);
  }
}

moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, checking);
};

moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, checking)
};

moneyManager.sendMoneyCallback  = function(data) {
  ApiConnector.transferMoney(data, checking);
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(function(response) {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, function(response) {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, 'Пользователь успешно добавлен');
    } else {
      favoritesWidget.setMessage(true, response.data);
    }
  })
};

favoritesWidget.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, function(response) {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(false, 'Пользователь успешно удален');
    } else {
      favoritesWidget.setMessage(true, response.data);
    }
  })
};

