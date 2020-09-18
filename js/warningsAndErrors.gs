const showError = (title, message) => {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     title,
     message,
     ui.ButtonSet.OK);
}

const checkSheetExists = (sheetName) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    Browser.msgBox('Virhe: Välilehti ' + sheetName +  ' puuttuu');
    return undefined;
  }
  return sheet;
}
