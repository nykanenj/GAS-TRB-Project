const createPublicVersionNoSuppliers = () => {
  createPublicVersion(false);
}

const createPublicVersion = (showSuppliers = true) => {
  
  Logger.log('Running createPublicVersion');
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = activeSpreadSheet.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
if (!sourceSheet) {
  showError('Virhe', 'KALUSTESUUNNITELMA -välilehti puuttuu!')
  return;
}
  
  
  const publicVersionsFolderID = activeSpreadSheet.getRangeByName(enums.NAMEDRANGES.publicVersionsFolderID).getValue();
if (!publicVersionsFolderID || publicVersionsFolderID == '') {
  showError('Julkisen version kansio puuttuu','Julkisen version kansio määrittely puuttuu config -välilehdeltä!')
  return;
}
  
  const fileNameText = showSuppliers ? 'Julkinen-Versio-Päämiehet' : 'Julkinen-Versio';
  const fileName = createFileName(fileNameText);
  
  const newFile = SpreadsheetApp.create(fileName) 
  const newFileID = newFile.getId();
  
  // ----
  //Place newFile in correct folder. Not working
  Logger.log('folderId ' + publicVersionsFolderID);
  const folderName = DriveApp.getFolderById(publicVersionsFolderID).getName();
  Logger.log('folderName: ' + folderName);
  DriveApp.getFolderById(publicVersionsFolderID).addFile(newFile); // <- This line or next line is probably causing the error. Is it an error because 'DriveApp' is being used, does app scope need to be larger?
  //DriveApp.getRootFolder().removeFile(newFile); //Removes reference from root
  
  /*
  //if (templateFolderID != '') DriveApp.getFolderById(templateFolderID).removeFile(newFile); // Remove file from template folder
  const newSpreadSheet = SpreadsheetApp.openById(newFileID);
  */
  // ----
  
  const newSheet = sourceSheet.copyTo(newFile);
  newSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const lastColumn = newSheet.getLastColumn();
  
  //TODO: Copy paste all sheet contents as values.
  
  const headingRowArray = newSheet.getRange(1, 1, 1, lastColumn).getValues().join().split(',');
  Logger.log('headingRowArray: ' + headingRowArray);
  Logger.log('lastColumn: '+ lastColumn);
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log('headingHashMap: ' + JSON.stringify(headingHashMap));
  const firstDeleteCol = headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Toimittaja];
  const rowsToDelete = lastColumn - firstDeleteCol + 1;
  newSheet.deleteColumns(firstDeleteCol, rowsToDelete);
  if (!showSuppliers) {
    newSheet.deleteColumn(headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Valmistaja]);
  }
}

