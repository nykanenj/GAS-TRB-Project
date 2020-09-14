const test = () => {
  
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TILANNE').getRange('A1').setValue('Hei!');
  //const newFile = SpreadsheetApp.create('temp'); 
  //Logger.log(DriveApp.getFolderById('1FGI6aRxobAblI5ImClJf2Ilf1fWptXm2'));
  Logger.log('Storage used' + DriveApp.getStorageUsed());
  
  
}

