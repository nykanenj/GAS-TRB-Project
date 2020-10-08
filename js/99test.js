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
  /*Logger.log(
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("KALUSTESUUNNITELMA")
      .getLastRow()
  );*/
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

  // TODO: Create a copy of the Automated Test spreadsheet and somehow set that as the active spreadsheet?
  // Another option is to populate the sheet with data every time. E.g. "Hidden" data sheet for each source sheet.
  // E.g. KALUSTESUUNNITELMA is first created from a Hidden data sheet first before any macros are run on the sheet. This may be the best option.
  // Bottom line: Need to ensure that every time Automated tests are run the starting point is the same regardless if a test is broken.

  // TODO: test that the parent folder is set correctly for this spreadsheet. Find all parent folders and make sure it is found in one of them.
  testParentFolder();

  testFolderNesting();

  testPublicVersion();

  // TODO: Test that publicVersion file is good.

  // const publicVersionNoSuppliers = createPublicVersionNoSuppliers();
  // TODO: Test that publicVersion file is good.

  // TODO: testUpdateInstallationList();

  // TODO: testUpdateFreight();

  // TODO: testCreateSupplierLists();
};

const testParentFolder = () => {
  const { file, folders } = fetchAllConsts();
  const parents = file.getParents();
  while (parents.hasNext()) {
    const folder = parents.next();
    if (folder.getId() === folders.parentFolder.getId()) {
      Logger.log(
        `Test ok. Parentfolder set correctly for file ${file.getName()}`
      );
      return true;
    }
  }
  throwError(errors.wrongParent(file));
};

const testFolderNesting = () => {
  const { folders } = fetchAllConsts();

  const { parentFolderID, parentFolder } = folders;

  Object.values(enums.NAMEDRANGES.FOLDERS).filter((folderName) => {
    if (folderName === enums.NAMEDRANGES.FOLDERS.parentFolder) return false; // skip the parentfolder itself
    const folder = folders[folderName];
    const parents = folder.getParents();

    while (parents.hasNext()) {
      let parent = parents.next();
      if (parent.getId() == parentFolderID) {
        Logger.log(`Testok. Folder ${folderName} correctly under parent`);
        return true;
      }
    }
    throwError(errors.wrongFolder(folder, parentFolder));
  });
  Logger.log("Folder nesting test ok!");
};

const testPublicVersion = () => {
  const publicVersionSpreadSheet = createPublicVersion();

  const sheets = publicVersionSpreadSheet.getSheets();

  if (sheets.length == 1) {
    Logger.log(`Test ok. Spreadsheet has one sheet`);
  } else {
    throwError(errors.moreThanOneSheet(publicVersionSpreadSheet));
  }

  const sheet = sheets[0];

  if (sheet.getName() === enums.SHEETS.KALUSTESUUNNITELMA) {
    Logger.log(`Test ok. Found sheet ${enums.SHEETS.KALUSTESUUNNITELMA}`);
  } else {
    throwError(errors.wrongSheetName(publicVersionSpreadSheet, sheet));
  }

  const testObj = {
    spreadSheet: publicVersionSpreadSheet,
    sheet,
    testees: [
      {
        row: 1,
        column: 1,
        text: "Kalustesuunnitelma",
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: 1,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.ID,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: publicVersionSpreadSheet.getLastColumn(),
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Myyntihinta_yhteensa,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: publicVersionSpreadSheet.getLastColumn() - 2,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: 8,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja,
      },
      // TODO: Add more tests. Also test some tests that test data has been transferred, not just headings
    ],
  };

  testTexts(testObj);
  DriveApp.getFileById(publicVersionSpreadSheet.getId()).setTrashed(true);
};

const testPublicVersionNoSuppliers = () => {
  const publicVersionSpreadSheet = createPublicVersion();

  const sheets = publicVersionSpreadSheet.getSheets();

  if (sheets.length == 1) {
    Logger.log(`Test ok. Spreadsheet has one sheet`);
  } else {
    throwError(errors.moreThanOneSheet(publicVersionSpreadSheet));
  }

  const sheet = sheets[0];

  if (sheet.getName() === enums.SHEETS.KALUSTESUUNNITELMA) {
    Logger.log(`Test ok. Found sheet ${enums.SHEETS.KALUSTESUUNNITELMA}`);
  } else {
    throwError(errors.wrongSheetName(publicVersionSpreadSheet, sheet));
  }

  const testObj = {
    spreadSheet: publicVersionSpreadSheet,
    sheet,
    testees: [
      {
        row: 1,
        column: 1,
        text: "Kalustesuunnitelma",
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: 1,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.ID,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: publicVersionSpreadSheet.getLastColumn(),
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Myyntihinta_yhteensa,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: publicVersionSpreadSheet.getLastColumn() - 2,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus,
      },
      {
        row: enums.KALUSTESUUNNITELMA.META.STARTROW,
        column: 7,
        text: enums.KALUSTESUUNNITELMA.HEADINGS.Maara_yht,
      },
      // TODO: Add more tests. Also test some tests that test data has been transferred, not just headings
    ],
  };

  testTexts(testObj);

  DriveApp.getFileById(publicVersionSpreadSheet.getId()).setTrashed(true);
};

const testTexts = (testObj) => {
  Logger.log(`Executing testTexts...`);
  testObj.testees.filter((e) => {
    const cell = testObj.sheet.getRange(e.row, e.column);
    if (cell.getValue() === e.text) {
      Logger.log(`Test ok. ${e.text} text found in ${cell.getA1Notation()}`);
    } else {
      throwError(
        errors.textNotFound(
          testObj.spreadSheet,
          testObj.sheet,
          cell.getA1Notation(),
          e.text
        )
      );
    }
  });
};
