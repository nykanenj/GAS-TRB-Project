const test = () => {
  //SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TILANNE').getRange('A1').setValue('Hei!');
  //const newFile = SpreadsheetApp.create('temp');
  //Logger.log(DriveApp.getFolderById('1FGI6aRxobAblI5ImClJf2Ilf1fWptXm2'));

  //const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('KALUSTESUUNNITELMA');

  //let tempArray = 'Määrä tila 1;Määrä tila 2;Määrä tila 3;newColumn'.split(';');
  //Logger.log('Array: ' + tempArray);
  //Logger.log('pop ' + tempArray.pop());
  //Logger.log('Array: ' + tempArray);

  //sheet.getRange('E26').setValues(temp); // Error rows and columns does not match

  //sheet.getRange('E26:I29').setValues(temp);
  Logger.log(
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("KALUSTESUUNNITELMA")
      .getLastRow()
  );
  /*
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('moi');
  throw new Error('Virhe: Välilehti puuttuu');
  if (!sheet) {
    const message = 'Virhe: Välilehti puuttuu';
    detailedErrorLog(message);
    Browser.msgBox(message);
    return undefined;
  }
  return sheet;
   */
};
