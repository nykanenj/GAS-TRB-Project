const createPublicVersionNoSuppliers = () => {
  createPublicVersion(showSuppliers = false);
}

const createPublicVersion = (showSuppliers = true) => {
  
  startLog('createPublicVersion');
  const {
    spreadSheet,
    sourceSheet,
    publicVersionsFolderId,
    publicFolder,
  } = fetchPublicVersionConsts();
  
  const fileNameText = showSuppliers ? 'Julkinen-Versio-Päämiehet' : 'Julkinen-Versio';
  const fileName = createFileName(fileNameText);
  Logger.log('Creating file: ' + fileName);
  
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
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
  const headingHashmap = headingRowToHashmap(newSheet);
  Logger.log('Deleting columns...');
  const firstDeleteCol = headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja];
  const rowsToDelete = lastColumn - firstDeleteCol + 1;
  newSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  if (!showSuppliers) {
    newSheet.deleteColumn(headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja]);
  }

  showPopup("Makro 'Luo Julkinen Versio' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());

};

const createPublicVersionByCategories = () => {
  
  startLog('createPublicVersionByCategories');
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = spreadSheet.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sourceSheet) throwError('Välilehti ' + enums.SHEETS.KALUSTESUUNNITELMA + ' puuttuu');
  
  const publicVersionsFolderID = spreadSheet.getRangeByName(enums.NAMEDRANGES.publicVersionsFolderID).getValue();
  if (!publicVersionsFolderID || publicVersionsFolderID == '') throwError(errors.publicVersions.folderIdMissing);
  let publicFolder;
  try {
    publicFolder = DriveApp.getFolderById(publicVersionsFolderID);
  } catch(e) {
    throwError(errors.publicVersions.folderIdRef);
  }
  
  let lastColumn = sourceSheet.getLastColumn();
  const lastRow = sourceSheet.getLastRow();
  
  const fileName = createFileName('Julkinen-Versio-Kategorioittain');
  Logger.log('Creating and moving file ' + fileName + ' to folderName: ' + publicFolder.getName() + ', folderID:' + publicVersionsFolderID);
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
  newFile.moveTo(publicFolder);
  
  Logger.log('Copying KALUSTESUUNNITELMA sheet...');
  const kalusteSuunnitelmaSheet = sourceSheet.copyTo(newSpreadsheet);
  kalusteSuunnitelmaSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const sheet1 = newSpreadsheet.getSheetByName('Sheet1');
  newSpreadsheet.deleteSheet(sheet1);
  
  Logger.log('Deleting extra columns');
  kalusteSuunnitelmaSheet.getDataRange().copyTo(kalusteSuunnitelmaSheet.getRange('A1'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  let headingRowArray = kalusteSuunnitelmaSheet.getRange(1, 1, 1, lastColumn).getValues().join().split(',');
  let headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  Logger.log('Deleting columns...');
  const firstDeleteCol = headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja];
  const lastDeleteCol = headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.TRB] - 1;
  const rowsToDelete = lastDeleteCol - firstDeleteCol + 1;
  kalusteSuunnitelmaSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  SpreadsheetApp.flush();
 
  Logger.log('Creating needed data structures...');
  lastColumn = kalusteSuunnitelmaSheet.getLastColumn();
  const headingRow = kalusteSuunnitelmaSheet.getRange(1, 1, 1, lastColumn);
  headingRowArray = headingRow.getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  
  Logger.log('Sorting data by TRB...');
  const newDataRange = kalusteSuunnitelmaSheet.getRange(2, 1, lastRow, lastColumn);
  const TRBcolIndex = headingHashmap.TRB;
  newDataRange.sort(TRBcolIndex)
  
  Logger.log('Reading TRB column to HashMap...');
  const rawTrbArray = kalusteSuunnitelmaSheet.getRange(2, TRBcolIndex, lastRow - 1).getValues();
  const trbHashMap = trbArrayToHashMap(rawTrbArray);
  
  for (let key in trbHashMap) {
      let newSheet = newSpreadsheet.insertSheet(key);
      headingRow.copyTo(newSheet.getRange(1, 1, 1, lastColumn));
      const sourceRange = kalusteSuunnitelmaSheet.getRange(trbHashMap[key].start,1, trbHashMap[key].count, lastColumn);
      sourceRange.copyTo(newSheet.getRange(2, 1, trbHashMap[key].count, lastColumn));
  }
  showPopup("Makro 'Luo Julkinen Versio Kategorioittain' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());
  
};
