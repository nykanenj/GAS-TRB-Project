const showError = (title, message) => {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     title,
     message,
     ui.ButtonSet.OK);
}

