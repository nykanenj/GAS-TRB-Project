// Error resources https://stackoverflow.com/questions/15582256/for-loop-iteration-and-replacetext/17092883#17092883
// https://developers.google.com/apps-script/api/reference/rest/v1/ExecutionError

const errors = {
  maaraTila1Missing: 'Ei löydetty saraketta "Määrä tila 1" KALUSTESUUNNITELMA:sta!',
  maaraYhtMissing: 'Ei löydetty saraketta "Määrä yht." KALUSTESUUNNITELMA:sta!',
  publicVersions: {
    folderIdMissing: 'Julkisen version kansio id puuttuu config -välilehdeltä!',
    folderIdRef: 'Julkisen version kansio id viittaus on virheellinen config -välilehdellä!',
  },
  spaceQuantity: {
    namedRangeMissing: 'Nimetty kenttä puuttuu. Tarkista että kaikki nimetyt kentät (Named Ranges) löytyy tiedostosta:\n ' + 
      enums.NAMEDRANGES.spaceQuantityColumnCount + '\n' +
      enums.NAMEDRANGES.spaceQuantityColumnNames + '\n' +
      enums.NAMEDRANGES.KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex + '\n' +
      enums.NAMEDRANGES.ASENNUSLISTA.spaceQuantityLastColumnIndex + '\n' +
      enums.NAMEDRANGES.spaceQuantityFirstColumnName + '\n' +
      enums.NAMEDRANGES.spaceQuantityLastColumnName + '\n',
    namedRangeEmpty: 'Nimetyn kentän arvo on tyhjä. Tarkista että kaikilla nimetyillä kentillä (Named Ranges) on arvo:\n ' + 
      enums.NAMEDRANGES.spaceQuantityColumnCount + '\n' +
      enums.NAMEDRANGES.spaceQuantityColumnNames + '\n' +
      enums.NAMEDRANGES.KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex + '\n' +
      enums.NAMEDRANGES.ASENNUSLISTA.spaceQuantityLastColumnIndex + '\n' +
      enums.NAMEDRANGES.spaceQuantityFirstColumnName + '\n' +
      enums.NAMEDRANGES.spaceQuantityLastColumnName + '\n',
    countMismatch: 'Määrä-tila sarakelaskuri ei täsmää otsikkonimien määrään. Tarkista config välilehden arvot.',
    nameAlreadyExists: 'Tämä määrä-tila sarakenimi on jo käytössä!: ',
    onlyOneLeft: 'Vain yksi määrä-tila sarake jäljellä. Kaikkia määrä-tila sarakkeita ei voi poistaa!',
    columnNamesMissing: 'Luettelo määrä-tila sarakkeiden otsikoista puuttuu config välilehdeltä',
  },
};

const throwError = (message) => {
  detailedErrorLog(message);
  throw new Error(message);
}

//Deprecate this function, use throwError function instead.
const showError = (title, message) => {
  detailedErrorLog(message);
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     title,
     message,
     ui.ButtonSet.OK);
}

const checkSheetExists = (sheetName) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    const message = 'Virhe: Välilehti ' + sheetName +  ' puuttuu';
    detailedErrorLog(message);
    Browser.msgBox(message);
    return undefined;
  }
  return sheet;
}

const startLog = (functionName) => {
  Logger.log('User ' + Session.getActiveUser().getEmail() + ' running ' + functionName + ' in sheet ID: ' + SpreadsheetApp.getActiveSpreadsheet().getId());
}

//Helper function should usually be called only within WarningsErrorsLogs
const detailedErrorLog = (message) => {
  spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Error in fileID ' + spreadSheet.getId() + ' fileName ' + spreadSheet.getName() + '\n' + 
  'ErrorMessage: ' + message + '\n' + 
  'RanByUser ' + Session.getActiveUser().getEmail());
}