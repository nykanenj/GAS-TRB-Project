const addSpaceQuantityColumn = () => {
  
  startLog('addSpaceQuantityColumn');
  const {
    spreadSheet,
    columnCountRange,
    columnNamesRange,
    lastColumnNameRange,
    colCount,
    colNames,
    lastColName,
    colNamesArray,
    kalustesuunnitelmaObj,
    asennuslistaObj,
  } = fetchSpaceQuantityConsts();
  
  const newColumnName = uiTextPrompt("Anna nimi uudelle määrä-tila sarakkeelle");
  if (colNamesArray.filter(name => name === newColumnName).length > 0) throwError(errors.spaceQuantity.nameAlreadyExists + newColumnName);
  
  insertColumnAndFormulas(kalustesuunnitelmaObj, newColumnName);
  insertColumnAndFormulas(asennuslistaObj, newColumnName, 3);
    // TODO: Insert column into other sheets
  // TODO: Update formulas on other sheets
  
  //Update config sheet metadata
  lastColumnNameRange.setValue(newColumnName);
  columnCountRange.setValue(colCount + 1);
  columnNamesRange.setValue(colNames + ';' + newColumnName);
  
  kalustesuunnitelmaObj.sheet.getRange(1, kalustesuunnitelmaObj.lastColIndex + 1).activate();
}

const renameSpaceQuantityColumn = () => {
  startLog('renameSpaceQuantityColumn');
  
}

const removeSpaceQuantityColumn = () => {
 
  startLog('removeSpaceQuantityColumn'); 
  const {
    spreadSheet,
    columnCountRange,
    columnNamesRange,
    lastColumnNameRange,
    colCount,
    colNames,
    lastColName,
    colNamesArray,
    kalustesuunnitelma,
    asennuslista,
  } = fetchSpaceQuantityConsts();
  
  if (colCount == 1) throwError(errors.spaceQuantity.onlyOneLeft);
  
  Logger.log('Deleting last space-quantity column "' + lastColName + '". Position ' + kalustesuunnitelma.lastColIndex);
  kalustesuunnitelma.sheet.deleteColumn(kalustesuunnitelma.lastColIndex);
  asennuslista.sheet.deleteColumn(asennuslista.lastColIndex);
  
  const headingHashmap = headingRowToHashmap(kalustesuunnitelma.sheet);
  
  // TODO: Update total quantity column formula.
  const newFormula = '=SUM(' +
  kalustesuunnitelma.sheet.getRange(2, kalustesuunnitelma.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_tila_1]).getA1Notation() + ':' +
  kalustesuunnitelma.sheet.getRange(2, kalustesuunnitelma.lastColIndex - 1).getA1Notation() + ')'; // e.g.'=SUM(K2:M2)';
  const maaraYhtCol = kalustesuunnitelma.headingHashmap[enums.HEADINGS.KALUSTESUUNNITELMA.Maara_yht];
  const firstFormulaCell = kalustesuunnitelma.sheet.getRange(2, maaraYhtCol); 
  firstFormulaCell.setFormula(newFormula);
  firstFormulaCell.copyTo(kalustesuunnitelma.sheet.getRange(3, maaraYhtCol, kalustesuunnitelma.lastRow)); //Copy Down formula
  
  // TODO: Insert into other sheets
  // TODO: Update formulas on other sheets
  
  SpreadsheetApp.flush();
  Logger.log('Updating kalustesuunnitelma.lastColumnIndexRange  to one less: ' + kalustesuunnitelma.lastColIndex - 1);
  kalustesuunnitelma.lastColumnIndexRange.setValue(kalustesuunnitelma.lastColIndex - 1);
  asennuslista.lastColumnIndexRange.setValue(asennuslista.lastColIndex - 1);
  lastColumnNameRange.setValue(kalustesuunnitelma.sheet.getRange(1, kalustesuunnitelma.lastColIndex - 1).getValue());
  columnCountRange.setValue(colCount - 1);
  Logger.log('Removing last item from colNamesArray :' + colNamesArray);
  colNamesArray.pop()
  const newColNames = colNamesArray.join(';');
  columnNamesRange.setValue(newColNames);
  

}