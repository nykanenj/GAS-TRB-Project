const addSpaceQuantityColumn = () => {
  startLog("addSpaceQuantityColumn");
  const {
    spaceQuantity,
    kalustesuunnitelmaObj,
    asennuslistaObj,
  } = fetchAllConsts();

  const newColumnName = uiTextPrompt(
    "Anna nimi uudelle määrä-tila sarakkeelle"
  );
  if (
    spaceQuantity.colNamesArray.filter((name) => name === newColumnName)
      .length > 0
  )
    throwError(errors.spaceQuantity.nameAlreadyExists + newColumnName);

  insertColumnAndFormulas(kalustesuunnitelmaObj, newColumnName);
  insertColumnAndFormulas(asennuslistaObj, newColumnName); //TODO: Formula not needed in asennuslista? But column is.

  //Update config sheet metadata
  spaceQuantity.lastColumnNameRange.setValue(newColumnName);
  spaceQuantity.columnCountRange.setValue(spaceQuantity.colCount + 1);
  spaceQuantity.columnNamesRange.setValue(
    spaceQuantity.colNames + ";" + newColumnName
  );

  kalustesuunnitelmaObj.sheet
    .getRange(
      kalustesuunnitlemaObj.startRow,
      kalustesuunnitelmaObj.spaceQuantity.lastColumn + 1
    )
    .activate();
};

const renameSpaceQuantityColumn = () => {
  startLog("renameSpaceQuantityColumn");

  // TODO: rename selected SpaceQuantity column
  // Check and identify that a spaceQuantity column is selected
  // Popup asking for new name
  // Update correct NAMEDRANGE on config sheet
};

const removeSpaceQuantityColumn = () => {
  startLog("removeSpaceQuantityColumn");
  const {
    spaceQuantity,
    kalustesuunnitelmaObj,
    asennuslistaObj,
  } = fetchAllConsts();

  if (spaceQuantity.colCount == 1) throwError(errors.spaceQuantity.onlyOneLeft);

  deleteColumnUpdateFormula(kalustesuunnitelmaObj);
  deleteColumnUpdateFormula(asennuslistaObj);

  spaceQuantity.lastColumnNameRange.setValue(
    kalustesuunnitelmaObj.sheet
      .getRange(
        kalustesuunnitelmaObj.startRow,
        kalustesuunnitelmaObj.spaceQuantity.lastColumn - 1
      )
      .getValue()
  );
  spaceQuantity.columnCountRange.setValue(spaceQuantity.colCount - 1);
  Logger.log(
    "Removing last item from colNamesArray :" + spaceQuantity.colNamesArray
  );
  spaceQuantity.colNamesArray.pop();
  spaceQuantity.columnNamesRange.setValue(
    spaceQuantity.colNamesArray.join(";")
  );
};
