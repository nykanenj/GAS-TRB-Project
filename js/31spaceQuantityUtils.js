const insertColumnAndFormulas = (sheetObj, newColumnName = "temp") => {
  //sheetObjs are the kalustesuunnitelma and asennuslista sub-objects in consts above

  Logger.log(
    "Inserting new space-quantity column to sheet " +
      sheetObj.sheet +
      " after column number " +
      sheetObj.spaceQuantity.lastColumn
  );
  sheetObj.sheet.insertColumnAfter(sheetObj.spaceQuantity.lastColumn);
  sheetObj.sheet
    .getRange(sheetObj.startRow, sheetObj.spaceQuantity.lastColumn + 1)
    .setValue(newColumnName);

  const newFormula =
    "=SUM(" +
    sheetObj.sheet
      .getRange(
        sheetObj.startRow + 1,
        sheetObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.Maara_tila_1]
      )
      .getA1Notation() +
    ":" +
    sheetObj.sheet
      .getRange(sheetObj.startRow + 1, sheetObj.spaceQuantity.lastColumn + 1)
      .getA1Notation() +
    ")"; // e.g.'=SUM(K2:M2)';
  const maaraYhtCol = sheetObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.Maara_yht];
  const firstFormulaCell = sheetObj.sheet.getRange(
    sheetObj.startRow + 1,
    maaraYhtCol
  );
  firstFormulaCell.setFormula(newFormula);
  if (sheetObj.nRows > 2)
    firstFormulaCell.copyTo(
      sheetObj.sheet.getRange(
        sheetObj.startRow + 2,
        maaraYhtCol,
        sheetObj.nRows - 2
      )
    ); // Copy Down formula. -2 to omit headingRow and first formula cell
  sheetObj.spaceQuantity.lastColumnIndexRange.setValue(
    sheetObj.spaceQuantity.lastColumn + 1
  ); //Update config sheet
};

const deleteColumnUpdateFormula = (sheetObj) => {
  Logger.log(
    "Deleting last space-quantity column on sheet" +
      sheetObj.sheet +
      ". Position " +
      sheetObj.spaceQuantity.lastColumn
  );
  sheetObj.sheet.deleteColumn(sheetObj.spaceQuantity.lastColumn);

  const newFormula =
    "=SUM(" +
    sheetObj.sheet
      .getRange(
        sheetObj.startRow + 1,
        sheetObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.Maara_tila_1]
      )
      .getA1Notation() +
    ":" +
    sheetObj.sheet
      .getRange(sheetObj.startRow + 1, sheetObj.spaceQuantity.lastColumn - 1)
      .getA1Notation() +
    ")"; // e.g.'=SUM(K2:M2)';
  const maaraYhtCol = sheetObj.col[enums.KALUSTESUUNNITELMA.HEADINGS.Maara_yht];
  const firstFormulaCell = sheetObj.sheet.getRange(
    sheetObj.startRow + 1,
    maaraYhtCol
  );
  firstFormulaCell.setFormula(newFormula);
  if (sheetObj.nRows > 2)
    firstFormulaCell.copyTo(
      sheetObj.sheet.getRange(
        sheetObj.startRow + 2,
        maaraYhtCol,
        sheetObj.nRows - 2
      )
    ); // Copy Down formula. -2 to omit headingRow and first formula cell

  sheetObj.spaceQuantity.lastColumnIndexRange.setValue(
    sheetObj.spaceQuantity.lastColumn - 1
  );
};

const repopulateConfigSheet = () => {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const columnCountRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityColumnCount
  );
  const columnNamesRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityColumnNames
  );
  const lastColumnNameRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.spaceQuantityLastColumnName
  );
  const KALUSTE_firstColumnIndexRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.KALUSTESUUNNITELMA.spaceQuantityFirstColumnIndex
  );
  const KALUSTE_lastColumnIndexRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex
  );
  const ASENNUS_firstColumnIndexRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.ASENNUSLISTA.spaceQuantityFirstColumnIndex
  );
  const ASENNUS_lastColumnIndexRange = spreadSheet.getRangeByName(
    enums.NAMEDRANGES.ASENNUSLISTA.spaceQuantityLastColumnIndex
  );

  const configSheet = spreadSheet.getSheetByName(enums.SHEETS.config);
  if (!configSheet) throwError("Välilehti " + enums.SHEETS.config + " puuttuu");

  const kalusteSuunnitelmaSheet = spreadSheet.getSheetByName(
    enums.SHEETS.KALUSTESUUNNITELMA
  );
  if (!kalusteSuunnitelmaSheet)
    throwError("Välilehti " + enums.SHEETS.KALUSTESUUNNITELMA + " puuttuu");

  const KALUSTE_lastColumn = kalusteSuunnitelmaSheet.getLastColumn();
  const KALUSTE_headingRowArray = kalusteSuunnitelmaSheet
    .getRange(enums.KALUSTESUUNNITELMA.META.STARTROW, 1, 1, KALUSTE_lastColumn)
    .getValues()
    .join()
    .split(",");
  const KALUSTE_headingHashmap = arrayToHashmap(KALUSTE_headingRowArray);
  if (!KALUSTE_headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Kuva])
    throwError(
      "Otsikko " +
        enums.KALUSTESUUNNITELMA.HEADINGS.Kuva +
        "puuttuu kalustesuunnitelmasta!"
    );
  if (!KALUSTE_headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus])
    throwError(
      "Otsikko " +
        enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus +
        "puuttuu kalustesuunnitelmasta!"
    );

  const KALUSTE_firstSpaceQuantityColumn =
    KALUSTE_headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Kuva] + 1;
  const KALUSTE_lastSpaceQuantityColumn =
    KALUSTE_headingHashmap[enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus] - 1;
  const nCols =
    KALUSTE_lastSpaceQuantityColumn - KALUSTE_firstSpaceQuantityColumn + 1;

  const asennusListaSheet = spreadSheet.getSheetByName(
    enums.SHEETS.ASENNUSLISTA
  );
  if (!asennusListaSheet)
    throwError("Välilehti " + enums.SHEETS.ASENNUSLISTA + " puuttuu");

  const ASENNUS_lastColumn = asennusListaSheet.getLastColumn();
  const ASENNUS_headingRowArray = asennusListaSheet
    .getRange(enums.ASENNUSLISTA.META.STARTROW, 1, 1, ASENNUS_lastColumn)
    .getValues()
    .join()
    .split(",");
  Logger.log("HR " + ASENNUS_headingRowArray);
  const ASENNUS_headingHashmap = arrayToHashmap(ASENNUS_headingRowArray);
  Logger.log("HM " + JSON.stringify(ASENNUS_headingHashmap));
  if (!ASENNUS_headingHashmap[enums.ASENNUSLISTA.HEADINGS.Kuva])
    throwError(
      "Otsikko " +
        enums.ASENNUSLISTA.HEADINGS.Kuva +
        "puuttuu kalustesuunnitelmasta!"
    );
  if (
    !ASENNUS_headingHashmap[
      enums.ASENNUSLISTA.HEADINGS.Vahvistettu_toimituspaiva_tehtaalta
    ]
  )
    throwError(
      "Otsikko " +
        enums.ASENNUSLISTA.HEADINGS.Vahvistettu_toimituspaiva_tehtaalta +
        "puuttuu kalustesuunnitelmasta!"
    );

  const ASENNUS_firstSpaceQuantityColumn =
    ASENNUS_headingHashmap[enums.ASENNUSLISTA.HEADINGS.Kuva] + 1;
  const ASENNUS_lastSpaceQuantityColumn =
    ASENNUS_headingHashmap[
      enums.ASENNUSLISTA.HEADINGS.Vahvistettu_toimituspaiva_tehtaalta
    ] - 1;
  Logger.log(
    "asennus vahv head: " +
      enums.ASENNUSLISTA.HEADINGS.Vahvistettu_toimituspaiva_tehtaalta
  );
  Logger.log("ASENNUS lastSpaQCol: " + ASENNUS_lastSpaceQuantityColumn);

  //TODO: Prompt asking if these are the correct ones before applying

  ASENNUS_firstColumnIndexRange.setValue(ASENNUS_firstSpaceQuantityColumn);
  ASENNUS_lastColumnIndexRange.setValue(ASENNUS_lastSpaceQuantityColumn);

  KALUSTE_firstColumnIndexRange.setValue(KALUSTE_firstSpaceQuantityColumn);
  KALUSTE_lastColumnIndexRange.setValue(KALUSTE_lastSpaceQuantityColumn);
  columnCountRange.setValue(nCols);
  lastColumnNameRange.setValue(
    KALUSTE_headingRowArray[KALUSTE_lastSpaceQuantityColumn - 1]
  );

  let columnNames = "";
  for (
    i = KALUSTE_firstSpaceQuantityColumn - 1;
    i < KALUSTE_lastSpaceQuantityColumn - 1;
    i++
  ) {
    columnNames = columnNames + KALUSTE_headingRowArray[i] + ";";
  }
  // End above loop one iteration earlier so that last heading can be appended without semicolon.
  if (nCols > 1)
    columnNames =
      columnNames +
      KALUSTE_headingRowArray[KALUSTE_lastSpaceQuantityColumn - 1]; //No need to append if only one column.
  columnNamesRange.setValue(columnNames);
};
