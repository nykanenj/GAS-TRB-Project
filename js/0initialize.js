const initialize = () => {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const finder = spreadSheet.createDeveloperMetadataFinder();
  metaData = finder.withKey('initializeDone').find();
  const initializeDone = metaData[0].getValue();
  
  //if (initializeDone) return;
  if (initializeDone) {
    metaData[0].remove();   
  
  }
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

Logger.log('Year: ' + year);
Logger.log('Month: ' + month);
Logger.log('Day: ' + day);


  //202011220000
  const initialID = year * 100000000 + month * 1000000 + day * 10000 + 100
  spreadSheet.getSheetByName('config').getRange('B2').setValue(initialID);
  Logger.log(initialID);
  //spreadSheet.addDeveloperMetadata("ID", initialID, SpreadSheetApp.DeveloperMetadataVisibility.DOCUMENT);
  
  //Logger.log(metaData[1]);
  //let metaData3 = spreadSheet.getDeveloperMetadata();
  //metaData[0].remove()
  //Logger.log('Metadata3: ' + metaData3[0]);
  //Logger.log('Metadata3: ' + metaData3[0].getKey());
  
  //spreadSheet.addDeveloperMetadata("initializeDone", "true", SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
  //SpreadsheetApp.flush();
  
  //const metaData2 = spreadSheet.getDeveloperMetadata().find(e => e.getKey() = 'initializeDone');
  //Logger.log('Metadata2: ' + metaData2 );
  //Logger.log('Metadata2 key: ' + metaData2[0].getKey());
  //Logger.log('Metadata2 value: ' + metaData2[0].getValue());
  
}
