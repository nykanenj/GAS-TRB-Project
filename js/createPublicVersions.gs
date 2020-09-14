const createPublicVersionNoSuppliers = () => {
  createPublicVersion(showSuppliers = false);
}

const createPublicVersion = (showSuppliers = true) => {
  
  Logger.log('User ' + User.getEmail() + 'running createPublicVersion');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = activeSpreadSheet.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
if (!sourceSheet) {
  showError('Virhe', 'KALUSTESUUNNITELMA -välilehti puuttuu!');
  return;
}
  
  
  const publicVersionsFolderID = activeSpreadSheet.getRangeByName(enums.NAMEDRANGES.publicVersionsFolderID).getValue();
if (!publicVersionsFolderID || publicVersionsFolderID == '') {
  showError('Julkisen version kansio puuttuu','Julkisen version kansio määrittely puuttuu config -välilehdeltä!');
  return;
}
  
  const fileNameText = showSuppliers ? 'Julkinen-Versio-Päämiehet' : 'Julkinen-Versio';
  const fileName = createFileName(fileNameText);
  Logger.log('Creating file: ' + fileName);
  
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
  const publicFolder = DriveApp.getFolderById(publicVersionsFolderID);
  Logger.log('Moving file ' + fileName + ' to folderName: ' + publicFolder.getName() + ', folderID:' + publicVersionsFolderID);
  newFile.moveTo(publicFolder);
  
  Logger.log('Moving values...');
  const newSheet = sourceSheet.copyTo(newSpreadsheet);
  newSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const sheet1 = newSpreadsheet.getSheetByName('Sheet1');
  newSpreadsheet.deleteSheet(sheet1);
  
  SpreadsheetApp.flush();
  newSheet.getDataRange().copyTo(newSheet.getRange('A1'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  const lastColumn = newSheet.getLastColumn();
  const headingRowArray = newSheet.getRange(1, 1, 1, lastColumn).getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  Logger.log('Deleting columns...');
  const firstDeleteCol = headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Toimittaja];
  const rowsToDelete = lastColumn - firstDeleteCol + 1;
  newSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  if (!showSuppliers) {
    newSheet.deleteColumn(headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Valmistaja]);
  }

  showPopup("Makro 'Luo Julkinen Versio' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());

}





const createPublicVersionByCategories = () => {
  Logger.log('User ' + User.getEmail() + 'running createPublicVersionByCategories');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = activeSpreadSheet.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
if (!sourceSheet) {
  showError('Virhe', 'KALUSTESUUNNITELMA -välilehti puuttuu!');
  return;
}
  const publicVersionsFolderID = activeSpreadSheet.getRangeByName(enums.NAMEDRANGES.publicVersionsFolderID).getValue();
if (!publicVersionsFolderID || publicVersionsFolderID == '') {
  showError('Julkisen version kansio puuttuu','Julkisen version kansio määrittely puuttuu config -välilehdeltä!');
  return;
}
  
  const fileName = createFileName('Julkinen-Versio-Kategorioittain');
  Logger.log('Creating file: ' + fileName);
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
  const publicFolder = DriveApp.getFolderById(publicVersionsFolderID);
  Logger.log('Moving file ' + fileName + ' to folderName: ' + publicFolder.getName() + ', folderID:' + publicVersionsFolderID);
  newFile.moveTo(publicFolder);
 
  const headingRowArray = sourceSheet.getRange(1, 1, 1, lastColumn).getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  
  Logger.log('Moving values...');
  
}

