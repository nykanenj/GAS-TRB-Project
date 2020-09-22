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
  insertColumnAndFormulas(asennuslistaObj, newColumnName, headingRow = 3);
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
    kalustesuunnitelmaObj,
    asennuslistaObj,
  } = fetchSpaceQuantityConsts();
  
  if (colCount == 1) throwError(errors.spaceQuantity.onlyOneLeft);
  
  deleteColumnUpdateFormula(kalustesuunnitelmaObj);
  deleteColumnUpdateFormula(asennuslistaObj, headingRow = 3);
  
  lastColumnNameRange.setValue(kalustesuunnitelmaObj.sheet.getRange(1, kalustesuunnitelmaObj.lastColIndex - 1).getValue());
  columnCountRange.setValue(colCount - 1);
  Logger.log('Removing last item from colNamesArray :' + colNamesArray);
  colNamesArray.pop();
  columnNamesRange.setValue(colNamesArray.join(';'));
}