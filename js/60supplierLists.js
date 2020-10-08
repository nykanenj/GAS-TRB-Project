const createSupplierLists = () => {
  startLog("createSupplierLists");

  const {
    spreadSheet,
    kalustesuunnitelmaObj,
    folders,
    supplierListsFolderID,
    supplierListsFolder,
  } = fetchAllConsts();

  const fileName = createFileName("Päämieslistat");
  Logger.log(`Creating and moving file ${fileName} 
   to folderName ${folders.supplierListsFolder.getName()}, 
   folderID: ${folders.supplierListsFolderID}`);

  const newSpreadsheet = SpreadsheetApp.create(fileName);
  const newFile = DriveApp.getFileById(newSpreadsheet.getId());
  newFile.moveTo(folders.supplierListsFolder);

  Logger.log("Copying KALUSTESUUNNITELMA sheet...");
  const kalusteSuunnitelmaSheet = kalustesuunnitelmaObj.sheet.copyTo(
    newSpreadsheet
  );
  kalusteSuunnitelmaSheet.setName(enums.SHEETS.KALUSTESUUNNITELMA);
  const sheet1 = newSpreadsheet.getSheetByName("Sheet1");
  newSpreadsheet.deleteSheet(sheet1);

  Logger.log("Deleting extra columns");
  kalusteSuunnitelmaSheet.getRange(1, 7, 7, 2).clearContent(); // Remove internal information
  kalusteSuunnitelmaSheet
    .getDataRange()
    .copyTo(
      kalusteSuunnitelmaSheet.getRange("A1"),
      SpreadsheetApp.CopyPasteType.PASTE_VALUES,
      false
    );
  Logger.log("Deleting columns...");
  const firstDeleteCol =
    kalustesuunnitelmaObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja];
  const lastDeleteCol =
    kalustesuunnitelmaObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.TRB] - 1;
  const colsToDelete = lastDeleteCol - firstDeleteCol + 1;
  kalusteSuunnitelmaSheet.deleteColumns(firstDeleteCol, colsToDelete);
  SpreadsheetApp.flush();

  Logger.log("Creating needed data structures...");
  const lastColumn = kalusteSuunnitelmaSheet.getLastColumn();
  const headingRow = kalusteSuunnitelmaSheet.getRange(
    kalustesuunnitelmaObj.startRow,
    1,
    1,
    lastColumn
  );
  const headingRowArray = headingRow.getValues().join().split(",");
  const headingHashmap = arrayToHashmap(headingRowArray);
  Logger.log("headingHashmap: " + JSON.stringify(headingHashmap));

  Logger.log("Sorting data by TRB...");
  const newDataRange = kalusteSuunnitelmaSheet.getRange(
    kalustesuunnitelmaObj.startRow + 1,
    1,
    kalustesuunnitelmaObj.lastRow,
    lastColumn
  );
  const TRBcolIndex = headingHashmap.TRB;
  newDataRange.sort(TRBcolIndex);

  Logger.log("Reading TRB column to HashMap...");
  const rawTrbArray = kalusteSuunnitelmaSheet
    .getRange(
      enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
      TRBcolIndex,
      kalustesuunnitelmaObj.lastRow
    )
    .getValues();
  const trbHashMap = trbArrayToHashMap(rawTrbArray);

  for (let key in trbHashMap) {
    let newSheet = newSpreadsheet.insertSheet(key);
    newSheet.getRange("A1").setValue(key);
    headingRow.copyTo(
      newSheet.getRange(
        enums.KALUSTESUUNNITELMA.META.STARTROW,
        1,
        1,
        lastColumn
      )
    );
    const sourceRange = kalusteSuunnitelmaSheet.getRange(
      trbHashMap[key].start,
      1,
      trbHashMap[key].count,
      lastColumn
    );
    sourceRange.copyTo(
      newSheet.getRange(
        enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
        1,
        trbHashMap[key].count,
        lastColumn
      )
    );
  }
  showPopup(
    "Makro 'Luo Julkinen Versio Kategorioittain' ajettu",
    fileName,
    newSpreadsheet.getUrl(),
    folders.supplierListsFolder.getName(),
    folders.supplierListsFolder.getUrl()
  );
};
/*
const trbArrayToHashMap = (rawTrbArray) => {
  trbArray = []
    .concat(...rawTrbArray)
    .map((e) => (!e || e === "" ? "Kategorisoimaton" : e));
  Logger.log("TRB column: " + trbArray);

  let previousVal = trbArray[0].toString();
  Logger.log(previousVal);
  let trbHashMap = {
    [previousVal]: {
      start: enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
    },
  };
  let i = 0;
  for (; i < trbArray.length; i++) {
    currentVal = trbArray[i].toString();
    if (currentVal !== previousVal) {
      trbHashMap[previousVal]["end"] =
        i + enums.KALUSTESUUNNITELMA.META.STARTROW;
      trbHashMap[previousVal]["count"] =
        trbHashMap[previousVal]["end"] - trbHashMap[previousVal]["start"] + 1;
      trbHashMap[currentVal] = {
        start: i + enums.KALUSTESUUNNITELMA.META.STARTROW + 1,
      };
      previousVal = currentVal;
    }
  }
  trbHashMap[previousVal]["end"] = i + enums.KALUSTESUUNNITELMA.META.STARTROW;
  trbHashMap[previousVal]["count"] =
    trbHashMap[previousVal]["end"] - trbHashMap[previousVal]["start"] + 1;
  Logger.log("trbHashMap" + JSON.stringify(trbHashMap));

  return trbHashMap;
};
*/
