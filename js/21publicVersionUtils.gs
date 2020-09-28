// Deprecate, replace by fetchAllConsts
const fetchPublicVersionConsts = () => {
  
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
 
  consts = {
    spreadSheet,
    sourceSheet,
    publicVersionsFolderId,
    publicFolder,
  };
  
  return consts;
}


const trbArrayToHashMap = (rawTrbArray) => {

  trbArray = [].concat(...rawTrbArray).map(e => (!e || e === '') ? 'Kategorisoimaton' : e ); 
  Logger.log('TRB column: ' + trbArray);
 
  let previousVal = trbArray[0].toString();
  Logger.log(previousVal);
  let trbHashMap = {
    [previousVal]: { 
      'start': 2,
    },
  };
  let i = 0
  for (; i < trbArray.length; i++) {
    currentVal = trbArray[i].toString();
    if (currentVal !== previousVal) {
      trbHashMap[previousVal]['end'] = i + 1;
      trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
      trbHashMap[currentVal] = {
        'start': i + 2,
      };
      previousVal = currentVal;
    }
  }
  trbHashMap[previousVal]['end'] = i + 1;
  trbHashMap[previousVal]['count'] = trbHashMap[previousVal]['end'] - trbHashMap[previousVal]['start'] + 1
  Logger.log('trbHashMap' + JSON.stringify(trbHashMap));  

  return trbHashMap;
}
