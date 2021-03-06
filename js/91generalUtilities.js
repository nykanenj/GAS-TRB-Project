const fetchAllConsts = () => {
  //TODO: Finish and test this.
  //TODO: cache these consts to be saved between runs.
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const file = DriveApp.getFileById(spreadSheet.getId());

  const folders = Object.values(enums.NAMEDRANGES.FOLDERS).reduce(
    (acc, folderName) => {
      const folderNameID = folderName + "ID";
      const folderID = spreadSheet.getRangeByName(folderNameID).getValue();
      if (!folderID || folderID == "")
        throwError(errors.folderIdMissing + folderNameID);
      let folder;
      try {
        folder = DriveApp.getFolderById(folderID);
      } catch (e) {
        throwError(errors.folderIdRef + folderName);
      }

      acc[folderNameID] = folderID;
      acc[folderName] = folder;
      return acc;
    },
    {}
  );

  // Määrä-tila / Space Quantity
  const sqColumnCountRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityColumnCount
  );
  const sqColumnNamesRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityColumnNames
  );
  const sqFirstColumnNameRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityFirstColumnName
  );
  const sqLastColumnNameRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityLastColumnName
  );
  if (
    !sqColumnCountRange ||
    !sqColumnNamesRange ||
    !sqFirstColumnNameRange ||
    !sqLastColumnNameRange
  )
    throwError(errors.spaceQuantity.namedRangeMissing);

  const sqColCount = sqColumnCountRange.getValue();
  const sqColNames = sqColumnNamesRange.getValue();
  const sqFirstColName = sqFirstColumnNameRange.getValue();
  const sqLastColName = sqLastColumnNameRange.getValue();
  if (!sqColCount || !sqColNames || !sqFirstColName || !sqLastColName)
    throwError(errors.spaceQuantity.namedRangeEmpty);

  const sqColNamesArray = sqColNames.split(";");
  if (sqColNamesArray.length !== sqColCount)
    throwError(
      errors.spaceQuantity.countMismatch +
        ". sqColNamesArray.length: " +
        sqColNamesArray.length +
        " sqColCount " +
        sqColCount
    ); //TODO: Attempt to populate the values if possible

  consts = {
    spreadSheet,
    file,
    folders,
    spaceQuantity: {
      columnCountRange: sqColumnCountRange,
      colCount: sqColCount,
      columnNamesRange: sqColumnNamesRange,
      colNamesArray: sqColNamesArray,
      colNames: sqColNames,
      firstColumnNameRange: sqFirstColumnNameRange,
      lastColumnNameRange: sqLastColumnNameRange,
      firstColName: sqFirstColName,
      lastColName: sqLastColName,
    },
    kalustesuunnitelmaObj: makeSheetObj(enums.SHEETS.KALUSTESUUNNITELMA),
    asennuslistaObj: makeSheetObj(enums.SHEETS.ASENNUSLISTA),
    toimittajatrahditObj: makeSheetObj(enums.SHEETS.TOIMITTAJAT_JA_RAHDIT),
  };

  return consts;
};

const makeSheetObj = (sheetName) => {
  //TODO: Finish and test this.

  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadSheet.getSheetByName(sheetName);
  if (!sheet) throwError("Välilehti " + sheet + " puuttuu");

  const startRow = enums[sheetName].META.STARTROW;
  const lastRow = sheet.getLastRow();
  const nRows = lastRow - startRow + 1;
  const lastColumn = sheet.getLastColumn();
  const nCols = lastColumn; //using this name makes code elsewhere more understandable

  let sqFirstColumnIndexRange;
  let sqLastColumnIndexRange;
  let sqFirstColumn;
  let sqLastColumn;
  if (enums.NAMEDRANGES[sheetName]) {
    // Some sheets may not have these parameters defined, so then can skip.
    sqFirstColumnIndexRange = spreadSheet.getRangeByName(
      enums.NAMEDRANGES[sheetName].spaceQuantityFirstColumnIndex
    );
    sqLastColumnIndexRange = spreadSheet.getRangeByName(
      enums.NAMEDRANGES[sheetName].spaceQuantityLastColumnIndex
    );
    if (!sqFirstColumnIndexRange || !sqLastColumnIndexRange)
      throwError(
        "Error in makeSheetObj. " + errors.spaceQuantity.namedRangeMissing
      );
    sqFirstColumn = sqFirstColumnIndexRange.getValue();
    sqLastColumn = sqLastColumnIndexRange.getValue();
    if (!sqFirstColumn || !sqLastColumn)
      throwError(
        "Error in makeSheetObj. " + errors.spaceQuantity.namedRangeEmpty
      );
  } else {
    Logger.log(
      "Info: Enum not defined for enums.NAMEDRANGES[" + sheetName + "]"
    );
  }

  const col = headingRowToHashmap(sheetName, sheet, startRow);
  const colB0 = headingRowToHashmapB0(sheet, startRow);

  sheetObj = {
    sheet,
    sheetName,
    startRow,
    lastRow,
    nRows,
    lastColumn,
    nCols,
    col,
    colB0,
    data: sheet.getRange(startRow, 1, nRows, nCols).getValues(),
    spaceQuantity: {
      firstColumnIndexRange: sqFirstColumnIndexRange,
      firstColumn: sqFirstColumn,
      lastColumnIndexRange: sqLastColumnIndexRange,
      lastColumn: sqLastColumn,
    },
  };

  return sheetObj;
};

const writeArrToSheet = (newArr, sheetObj, dataOnly = 0) => {
  const destinationRange = sheetObj.sheet.getRange(
    sheetObj.startRow + dataOnly,
    1,
    newArr.length,
    newArr[0].length
  );
  destinationRange.setValues(newArr);
  return destinationRange;
};

const addRow = () => {
  const sh = checkSheetExists(enums.SHEETS.KALUSTESUUNNITELMA);
  if (!sh) return;

  sh.activate();
  lRow = sh.getLastRow();
  let lCol = sh.getLastColumn();
  let range = sh.getRange(lRow, 1, 1, lCol);
  sh.insertRowsAfter(lRow, 1);
  range.copyTo(sh.getRange(lRow + 1, 1, 1, lCol), { contentsOnly: false });
  let dateCell = sh.getRange(lRow + 1, 1);
  dateCell.setValue(new Date());
  sh.getRange(lRow + 1, 2).activate();
};

const createFileName = (text) => {
  Logger.log("Creating filename");
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const now = new Date();
  const fileName =
    getEnv() +
    "-" +
    Utilities.formatDate(now, timeZone, "yyyy-MM-dd-HH-mm") +
    "-" +
    text;
  Logger.log("Filename: " + fileName);
  return fileName;
};

const uiTextPrompt = (message) => {
  const ui = SpreadsheetApp.getUi();
  const input = ui.prompt(message, ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    //TODO: regex test legal columnName?
    return input.getResponseText();
  } else {
    return "";
  }
};

const createA1ColRef = (sheetObj, colHeading, dataOnly = 0) => {
  const sheetName = sheetObj.sheetName;
  const colIndex = sheetObj.col[colHeading];
  const startCell = sheetObj.sheet
    .getRange(sheetObj.startRow + dataOnly, colIndex)
    .getA1Notation(); // Offset by +1 if dataOnly is true. true = 1, false = 0. Verified that this works.
  const lastCell = sheetObj.sheet
    .getRange(sheetObj.lastRow, colIndex)
    .getA1Notation();
  return sheetName + "!" + startCell + ":" + lastCell;
};

const headingRowToHashmap = (sheetName, sheet, rowNum = 1) => {
  const headingRow = sheet.getRange(rowNum, 1, 1, sheet.getLastColumn());
  const headingRowArray = headingRow.getValues().join().split(",");

  /* Logger.log(
    "headingRowArray for sheet " + sheet.getName() + ": " + headingRowArray
  ); */
  const headingHashmap = arrayToHashmap(headingRowArray);
  /* Logger.log(
    "headingHashmap for sheet " +
      sheet.getName() +
      ": " +
      JSON.stringify(headingHashmap)
  ); */
  const notFoundArr = Object.values(enums[sheetName].HEADINGS).filter(
    (heading) => !headingHashmap[heading]
  );
  if (notFoundArr.length > 0)
    throwError(sheetName + errors.headingMissing + notFoundArr);
  return headingHashmap;
};

const headingRowToHashmapB0 = (sheet, rowNum = 1) => {
  const headingRow = sheet.getRange(rowNum, 1, 1, sheet.getLastColumn());
  const headingRowArray = headingRow.getValues().join().split(",");
  /* Logger.log(
    "B0 headingRowArrayB0 for sheet " + sheet.getName() + ": " + headingRowArray
  ); */
  const headingHashmapB0 = arrayToHashmapB0(headingRowArray);
  /* Logger.log(
    "B0 headingHashmapB0 for sheet " +
      sheet.getName() +
      ": " +
      JSON.stringify(headingHashmapB0)
  ); */
  return headingHashmapB0;
};

const arrayToHashmap = (array) =>
  array.reduce((acc, val, index) => {
    acc[val] = index + 1;
    return acc;
  }, {});

const arrayToHashmapB0 = (array) =>
  array.reduce((acc, val, index) => {
    acc[val] = index;
    return acc;
  }, {});

const getSingleColumn = (sheetObj, colName) =>
  sheetObj.sheet.getRange(
    sheetObj.startRow,
    sheetObj.col[colName],
    sheetObj.nRows
  );

const showPopup = (title, fileName, fileUrl, folderName, folderUrl) => {
  const html =
    "<html><body><div>" +
    "Tiedosto: " +
    '</div><a href="' +
    fileUrl +
    '" target="blank">' +
    fileName +
    "</a><br><br>" +
    "<div>" +
    "Kansio: " +
    '</div><a href="' +
    folderUrl +
    '" target="blank">' +
    folderName +
    "</a></body></html>";
  // Logger.log("html: " + html);
  let ui = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(ui, title);
};

const getEnv = () => {
  const envRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("env");
  const env = envRange && envRange.getValue();
  return env;
};
