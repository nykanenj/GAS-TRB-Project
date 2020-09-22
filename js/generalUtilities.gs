const addRow = () => {
  const sh = checkSheetExists(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sh) return;
  
  sh.activate();
  lRow = sh.getLastRow(); 
  var lCol = sh.getLastColumn()
  var range = sh.getRange(lRow,1,1,lCol);
  sh.insertRowsAfter(lRow, 1);
  range.copyTo(sh.getRange(lRow+1, 1, 1, lCol), {contentsOnly:false});
  var dateCell = sh.getRange(lRow+1, 1);
  dateCell.setValue(new Date());
  sh.getRange(lRow+1, 2).activate();
};

const createFileName = (text) => {
  Logger.log('Creating filename');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const now = new Date();
  const fileName = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd-HH-mm') + '-' + text;
  Logger.log('Filename: ' + fileName);
  return fileName;
};

const uiTextPrompt = (message) => {
  const ui = SpreadsheetApp.getUi();
  const input = ui.prompt(message, ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    //TODO: regex test legal columnName?
    return input.getResponseText();
  } else {
    return '';
  } 
};
  
const headingRowToHashmap = (sheet, rowNum = 1) => {
  const headingRow = sheet.getRange(rowNum, 1, 1, sheet.getLastColumn());
  const headingRowArray = headingRow.getValues().join().split(',');
  Logger.log('headingRowArray for sheet ' + sheet.getName() +  ': ' + headingRowArray);
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap for sheet ' + sheet.getName() +  ': ' + JSON.stringify(headingHashmap));
  if (!headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_tila_1]) throwError(errors.maaraTila1Missing);
  if (!headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_yht]) throwError(errors.maaraYhtMissing);  
  return headingHashmap;
};
  
const arrayToHashmap = array =>
  array.reduce((acc, val, index) => {
    acc[val] = index + 1
    return acc;
}, {});

const showPopup = (title, fileName, fileUrl, folderName, folderUrl) => {
  const html = '<html><body><div>' + 'Tiedosto: ' + '</div><a href="' + fileUrl + '" target="blank">'+fileName+'</a><br><br>' + 
  '<div>' + 'Kansio: ' + '</div><a href="' + folderUrl + '" target="blank">'+folderName+'</a></body></html>';
  Logger.log('html: '+ html);
  var ui = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(ui, title);
};
  
