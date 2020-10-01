const createPublicVersionNoSuppliers = () => {
  createPublicVersion(showSuppliers = false);
}

const createPublicVersion = (showSuppliers = true) => {
  
  startLog('createPublicVersion');
  const {
    spreadSheet,
    kalustesuunnitelmaObj,
    publicVersionsFolderID,
    publicFolder,
  } = fetchAllConsts();
  
  const sourceSheet = kalustesuunnitelmaObj.sheet;
  
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
  newSheet.getRange(1, 7, 7, 2).clearContent(); // Remove internal information
  newSheet.getDataRange().copyTo(newSheet.getRange('A1'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  const lastColumn = newSheet.getLastColumn();
  const headingHashmap = headingRowToHashmap(enums.SHEETS.KALUSTESUUNNITELMA, newSheet, enums.KALUSTESUUNNITELMA.META.STARTROW);
  Logger.log('Deleting columns...');
  const firstDeleteCol = headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja];
  const colsToDelete = lastColumn - firstDeleteCol + 1;
  newSheet.deleteColumns(firstDeleteCol, colsToDelete);
  if (!showSuppliers) {
    newSheet.deleteColumn(headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja]);
  }

  showPopup("Makro 'Luo Julkinen Versio' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());

};

const createPublicVersionByCategories = () => {
  
  startLog('createPublicVersionByCategories');
  
  const {
    spreadSheet,
    kalustesuunnitelmaObj,
    publicVersionsFolderID,
    publicFolder,
  } = fetchAllConsts();
  
  const fileName = createFileName('Julkinen-Versio-Kategorioittain');
  Logger.log('Creating and moving file ' + fileName + ' to folderName: ' + publicFolder.getName() + ', folderID:' + publicVersionsFolderID);
  const newSpreadsheet = SpreadsheetApp.create(fileName); 
  const newFile = DriveApp.getFileById(newSpreadsheet.getId()); 
  newFile.moveTo(publicFolder);
  
  Logger.log('Copying KALUSTESUUNNITELMA sheet...');
  const kalusteSuunnitelmaSheet = kalustesuunnitelmaObj.sheet.copyTo(newSpreadsheet);
  kalusteSuunnitelmaSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const sheet1 = newSpreadsheet.getSheetByName('Sheet1');
  newSpreadsheet.deleteSheet(sheet1);
  
  Logger.log('Deleting extra columns');
  kalusteSuunnitelmaSheet.getRange(1, 7, 7, 2).clearContent(); // Remove internal information
  kalusteSuunnitelmaSheet.getDataRange().copyTo(kalusteSuunnitelmaSheet.getRange('A1'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  Logger.log('Deleting columns...');
  const firstDeleteCol = kalustesuunnitelmaObj.headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja];
  const lastDeleteCol = kalustesuunnitelmaObj.headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.TRB] - 1;
  const rowsToDelete = lastDeleteCol - firstDeleteCol + 1;
  kalusteSuunnitelmaSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  SpreadsheetApp.flush();
 
  Logger.log('Creating needed data structures...');
  const lastColumn = kalusteSuunnitelmaSheet.getLastColumn();
  const headingRow = kalusteSuunnitelmaSheet.getRange(enums.KALUSTESUUNNITELMA.META.STARTROW, 1, 1, lastColumn);
  const headingRowArray = headingRow.getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashmap: ' + JSON.stringify(headingHashmap));
  
  Logger.log('Sorting data by TRB...');
  const newDataRange = kalusteSuunnitelmaSheet.getRange(enums.KALUSTESUUNNITELMA.META.STARTROW + 1, 1, kalustesuunnitelmaObj.lastRow, lastColumn);
  const TRBcolIndex = headingHashmap.TRB;
  newDataRange.sort(TRBcolIndex)
  
  Logger.log('Reading TRB column to HashMap...');
  const rawTrbArray = kalusteSuunnitelmaSheet.getRange(enums.KALUSTESUUNNITELMA.META.STARTROW + 1, TRBcolIndex, kalustesuunnitelmaObj.lastRow).getValues();
  const trbHashMap = trbArrayToHashMap(rawTrbArray);
  
  for (let key in trbHashMap) {
      let newSheet = newSpreadsheet.insertSheet(key);
      newSheet.getRange('A1').setValue(key);
      headingRow.copyTo(newSheet.getRange(enums.KALUSTESUUNNITELMA.META.STARTROW, 1, 1, lastColumn));
      const sourceRange = kalusteSuunnitelmaSheet.getRange(trbHashMap[key].start, 1, trbHashMap[key].count, lastColumn);
      sourceRange.copyTo(newSheet.getRange(enums.KALUSTESUUNNITELMA.META.STARTROW + 1, 1, trbHashMap[key].count, lastColumn));
  }
  showPopup("Makro 'Luo Julkinen Versio Kategorioittain' ajettu", fileName, newSpreadsheet.getUrl(), publicFolder.getName(), publicFolder.getUrl());
  
};
  
const trbArrayToHashMap = (rawTrbArray) => {

  trbArray = [].concat(...rawTrbArray).map(e => (!e || e === '') ? 'Kategorisoimaton' : e ); 
  Logger.log('TRB column: ' + trbArray);
 
  let previousVal = trbArray[0].toString();
  Logger.log(previousVal);
  let trbHashMap = {
    [previousVal]: { 
      'start': enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
    },
  };
  let i = 0
  for (; i < trbArray.length; i++) {
    currentVal = trbArray[i].toString();
    if (currentVal !== previousVal) {
      trbHashMap[previousVal]['end'] = i + enums.KALUSTESUUNNITELMA.META.STARTROW;
      trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
      trbHashMap[currentVal] = {
        'start': i + enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
      };
      previousVal = currentVal;
    }
  }
  trbHashMap[previousVal]['end'] = i + enums.KALUSTESUUNNITELMA.META.STARTROW;
  trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
  Logger.log('trbHashMap' + JSON.stringify(trbHashMap));  

  return trbHashMap;
}
