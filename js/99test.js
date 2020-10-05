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

const runAutomatedTests = () => {
  spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  if (spreadSheet.getId() !== "1YbKPcAaacycPX178I3hZIcXNusoL_vl9e-keuuZrsfo") {
    throwError(
      "Automated tests can only be run on the Automated Tests google sheet with ID: 1YbKPcAaacycPX178I3hZIcXNusoL_vl9e-keuuZrsfo"
    );
  }

  testFolderNesting();

  // const publicVersionFile = createPublicVersion();

  // const publicVersionNoSuppliers = createPublicVersionNoSuppliers();
};

const testFolderNesting = () => {
  const { folders } = fetchAllConsts();

  const { parentFolderID, parentFolder } = folders;

  Object.Values(enums.NAMEDRANGES.FOLDERS).filter((folderName) => {
    if (folderName + "ID" === enums.NAMEDRANGES.FOLDERS.parentFolderID)
      return false; // skip the parentfolder itself
    const folder = folders[folderName];
    const parents = folder.getParents();
    let parentFound = false;
    while (parents.hasNext() && !parentFound) {
      let parent = parents.next();
      if (parent.getId() === parentFolderID) parentFound = true;
    }
    if (!parentFound) {
      throwError(
        folder.getName() + errors.wrongFolder + parentFolder.getName()
      );
    } else {
      Logger.log("Folder nesting test ok!");
    }
  });

  let foldersBelowParent = parentFolder.getFolders();
  while (foldersBelowParent.hasNext()) {
    var folder = folders.next();
    Logger.log(folder.getName());
  }
};
