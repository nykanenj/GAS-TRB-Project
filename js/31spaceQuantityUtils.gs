const fetchSpaceQuantityConsts = () => {
  
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const columnCountRange = spreadSheet.getRangeByName(enums.NAMEDRANGES.spaceQuantityColumnCount);
  const columnNamesRange = spreadSheet.getRangeByName(enums.NAMEDRANGES.spaceQuantityColumnNames);
  const lastColumnNameRange = spreadSheet.getRangeByName(enums.NAMEDRANGES.spaceQuantityLastColumnName);
  const KALUSTE_lastColumnIndexRange = spreadSheet.getRangeByName(enums.NAMEDRANGES.KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex);
  const ASENNUS_lastColumnIndexRange = spreadSheet.getRangeByName(enums.NAMEDRANGES.ASENNUSLISTA.spaceQuantityLastColumnIndex);
  if (!columnCountRange || !columnNamesRange || !lastColumnNameRange || !KALUSTE_lastColumnIndexRange || !ASENNUS_lastColumnIndexRange) throwError(errors.spaceQuantity.namedRangeMissing);
  
  const colCount = columnCountRange.getValue();
  const colNames = columnNamesRange.getValue();
  const KALUSTE_lastColIndex = KALUSTE_lastColumnIndexRange.getValue();
  const ASENNUS_lastColIndex = ASENNUS_lastColumnIndexRange.getValue();
  const lastColName = lastColumnNameRange.getValue();
  if (!colCount || !colNames || !KALUSTE_lastColIndex || !ASENNUS_lastColIndex || !lastColName) throwError(errors.spaceQuantity.namedRangeEmpty);
  
  const colNamesArray = colNames.split(';');
  if (colNamesArray.length !== colCount) throwError(errors.spaceQuantity.countMismatch); //TODO: Attempt to populate the values if possible
  
  kalusteSuunnitelmaSheet = spreadSheet.getSheetByName(enums.SHEETS.KALUSTESUUNNITELMA);
  asennusListaSheet = spreadSheet.getSheetByName(enums.SHEETS.ASENNUSLISTA);
  
  consts = {
    spreadSheet,
    columnCountRange,
    columnNamesRange,
    lastColumnNameRange,
    colCount,
    colNames,
    lastColName,
    colNamesArray,
    kalustesuunnitelmaObj: {
      sheet: kalusteSuunnitelmaSheet, 
      lastColumnIndexRange: KALUSTE_lastColumnIndexRange,
      lastColIndex: KALUSTE_lastColIndex,
      lastRow: kalusteSuunnitelmaSheet.getLastRow(),
      headingHashmap: headingRowToHashmap(kalusteSuunnitelmaSheet),
    },
    asennuslistaObj: {
      sheet: asennusListaSheet,
      lastColumnIndexRange: ASENNUS_lastColumnIndexRange,
      lastColIndex: ASENNUS_lastColIndex,
      lastRow: asennusListaSheet.getLastRow(),
      headingHashmap: headingRowToHashmap(asennusListaSheet, 3),
    },
  };

  return consts;  
};

const insertColumnAndFormulas = (sheetObject, newColumnName = 'temp', headingRow = 1) => {
  //sheetObjects are the kalustesuunnitelma and asennuslista sub-objects in consts above 
  
  Logger.log('Inserting new space-quantity column to sheet ' + sheetObject.sheet + ' after column number ' + sheetObject.lastColIndex);
  sheetObject.sheet.insertColumnAfter(sheetObject.lastColIndex);
  sheetObject.sheet.getRange(headingRow, sheetObject.lastColIndex + 1).setValue(newColumnName);
  
  const newFormula = '=SUM(' +
  sheetObject.sheet.getRange(headingRow + 1, sheetObject.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_tila_1]).getA1Notation() + ':' +
  sheetObject.sheet.getRange(headingRow + 1, sheetObject.lastColIndex + 1).getA1Notation() + ')'; // e.g.'=SUM(K2:M2)';
  const maaraYhtCol = sheetObject.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_yht]
  const firstFormulaCell = sheetObject.sheet.getRange(headingRow + 1, maaraYhtCol) 
  firstFormulaCell.setFormula(newFormula);
  firstFormulaCell.copyTo(sheetObject.sheet.getRange(headingRow + 2, maaraYhtCol, sheetObject.lastRow)); //Copy Down formula
  sheetObject.lastColumnIndexRange.setValue(sheetObject.lastColIndex + 1); //Update config sheet 
};
  
const deleteColumnUpdateFormula = (sheetObject, headingRow = 1) => {
  
  Logger.log('Deleting last space-quantity column on sheet' + sheetObject.sheet + '. Position ' + sheetObject.lastColIndex);
  sheetObject.sheet.deleteColumn(sheetObject.lastColIndex);
  
  const newFormula = '=SUM(' +
  sheetObject.sheet.getRange(headingRow + 1, sheetObject.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_tila_1]).getA1Notation() + ':' +
  sheetObject.sheet.getRange(headingRow + 1, sheetObject.lastColIndex - 1).getA1Notation() + ')'; // e.g.'=SUM(K2:M2)';
  const maaraYhtCol = sheetObject.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_yht];
  const firstFormulaCell = sheetObject.sheet.getRange(headingRow + 1, maaraYhtCol); 
  firstFormulaCell.setFormula(newFormula);
  firstFormulaCell.copyTo(sheetObject.sheet.getRange(headingRow + 2, maaraYhtCol, sheetObject.lastRow)); //Copy Down formula
  
  sheetObject.lastColumnIndexRange.setValue(sheetObject.lastColIndex - 1);
};
  