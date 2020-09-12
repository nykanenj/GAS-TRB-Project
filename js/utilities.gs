const addRow = () => {
  var sh = ss.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sh) {
    Browser.msgBox('Virhe: Välilehti ' + enums.SHEETS.KALUSTESUUNNITELMA +  ' puuttuu');
    return;
  }
  sh.activate();
  lRow = sh.getLastRow(); 
  var lCol = sh.getLastColumn()
  var range = sh.getRange(lRow,1,1,lCol);
  sh.insertRowsAfter(lRow, 1);
  range.copyTo(sh.getRange(lRow+1, 1, 1, lCol), {contentsOnly:false});
  var dateCell = sh.getRange(lRow+1, 1);
  dateCell.setValue(new Date());
  sh.getRange(lRow+1, 2).activate();
}

const createFileName = (text) => {
  Logger.log('Creating filename');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const now = new Date();
  const fileName = Utilities.formatDate(now, timeZone, 'yyyy-MM-dd-HH-mm') + '-' + text;
  Logger.log('Filename: ' + fileName);
  return fileName;
}

const arrayToHashmap = array =>
  array.reduce((acc, val, index) => {
    acc[val] = index + 1
    return acc;
}, {});

/* Function not needed
const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
}, {});
*/

/*
Function not needed. Remove
const cloneGoogleSheet = (sourceSheetID, targetSheetID) => {

  const sourceSpreadsheet = SpreadsheetApp.openById(sourceSheetID);
  const sourceSheet = sourceSpreadsheet.getSheetByName('KALUSTESUUNNITELMA');

  const SRange = sourceSheet.getDataRange();
  const A1Range = SRange.getA1Notation();
  const SData = SRange.getValues();

  const targetSpreadsheet = SpreadsheetApp.openById(targetSheetID);
  const targetSheet = targetSpreadsheet.getSheetByName('KALUSTESUUNNITELMA');

  // Clear the Google Sheet before copy
  targetSheet.clear({contentsOnly: true});

  // set the target range to the values of the source data
  targetSheet.getRange(A1Range).setValues(SData);

};
*/
