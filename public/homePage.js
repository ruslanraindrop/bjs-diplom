'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout((response) => {
  if (response.success) {
    location.reload();
  }
});

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

const getCurrency = () => ApiConnector.getStocks((response) => {
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
});

getCurrency();
setInterval(getCurrency, 60000);

const moneyManager = new MoneyManager();

const checking = response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(!response.success, 'Операция выполнена успешно');
  } else {
    moneyManager.setMessage(response.success, response.data);
  }
}

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, checking);

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, checking);

moneyManager.sendMoneyCallback  = data => ApiConnector.transferMoney(data, checking);


const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(!response.success, 'Пользователь успешно добавлен');
  } else {
    favoritesWidget.setMessage(response.success, response.data);
  }
})

favoritesWidget.removeUserCallback = id => ApiConnector.removeUserFromFavorites(id, response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(!response.success, 'Пользователь успешно удален');
  } else {
    favoritesWidget.setMessage(response.success, response.data);
  }
})

