const createPublicVersionNoSuppliers = () => {
  createPublicVersion(showSuppliers = false);
}

const createPublicVersion = (showSuppliers = true) => {
  
  Logger.log('User ' + User.getEmail() + ' running createPublicVersion');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = checkSheetExists(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sourceSheet) return;
  
  
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
  Logger.log('User ' + Session.getActiveUser().getEmail() + ' running createPublicVersionByCategories');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = checkSheetExists(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sourceSheet) return;
  
  const publicVersionsFolderID = activeSpreadSheet.getRangeByName(enums.NAMEDRANGES.publicVersionsFolderID).getValue();
  if (!publicVersionsFolderID || publicVersionsFolderID == '') {
    showError('Julkisen version kansio puuttuu','Julkisen version kansio määrittely puuttuu config -välilehdeltä!');
    return;
  }
  const publicFolder = DriveApp.getFolderById(publicVersionsFolderID);
  var lastColumn = sourceSheet.getLastColumn();
  const lastRow = sourceSheet.getLastRow();
  
  const fileName = createFileName('Julkinen-Versio-Kategorioittain');
  Logger.log('Creating and moving file ' + fileName + ' to folderName: ' + publicFolder.getName() + ', folderID:' + publicVersionsFolderID);
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
  newFile.moveTo(publicFolder);
  
  Logger.log('Copying KALUSTESUUNNITELMA sheet...');
  const kalustesuunnitelmaSheet = sourceSheet.copyTo(newSpreadsheet);
  kalustesuunnitelmaSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const sheet1 = newSpreadsheet.getSheetByName('Sheet1');
  newSpreadsheet.deleteSheet(sheet1);
  
  Logger.log('Deleting extra columns');
  kalustesuunnitelmaSheet.getDataRange().copyTo(kalustesuunnitelmaSheet.getRange('A1'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  var headingRowArray = kalustesuunnitelmaSheet.getRange(1, 1, 1, lastColumn).getValues().join().split(',');
  var headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  Logger.log('Deleting columns...');
  const firstDeleteCol = headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Toimittaja];
  const lastDeleteCol = headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.TRB] - 1;
  const rowsToDelete = lastDeleteCol - firstDeleteCol + 1;
  kalustesuunnitelmaSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  SpreadsheetApp.flush();
 
  Logger.log('Creating needed data structures...');
  lastColumn = kalustesuunnitelmaSheet.getLastColumn();
  const headingRow = kalustesuunnitelmaSheet.getRange(1, 1, 1, lastColumn);
  headingRowArray = headingRow.getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  
  Logger.log('Sorting data by TRB...');
  const newDataRange = kalustesuunnitelmaSheet.getRange(2, 1, lastRow, lastColumn);
  const TRBcolIndex = headingHashmap.TRB;
  newDataRange.sort(TRBcolIndex)
  
  Logger.log('Reading TRB column to HashMap...');
  const rawTrbArray = kalustesuunnitelmaSheet.getRange(2, TRBcolIndex, lastRow - 1).getValues();
  const trbHashMap = trbArrayToHashMap(rawTrbArray);
  
  for (var key in trbHashMap) {
      var newSheet = newSpreadsheet.insertSheet(key);
      headingRow.copyTo(newSheet.getRange(1, 1, 1, lastColumn));
      const sourceRange = kalustesuunnitelmaSheet.getRange(trbHashMap[key].start,1, trbHashMap[key].count, lastColumn);
      sourceRange.copyTo(newSheet.getRange(2, 1, trbHashMap[key].count, lastColumn));
  }
  showPopup("Makro 'Luo Julkinen Versio Kategorioittain' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());
  
}
