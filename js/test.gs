const test = () => {
  
  //SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TILANNE').getRange('A1').setValue('Hei!');
  //const newFile = SpreadsheetApp.create('temp'); 
  //Logger.log(DriveApp.getFolderById('1FGI6aRxobAblI5ImClJf2Ilf1fWptXm2'));
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('KALUSTESUUNNITELMA');
  
  const temp = sheet.getRange('E1:I4').getValues();
  
  
  Logger.log('Array: ' + temp);
  
  //sheet.getRange('E26').setValues(temp); // Error rows and columns does not match
  
  sheet.getRange('E26:I29').setValues(temp);
  
};
