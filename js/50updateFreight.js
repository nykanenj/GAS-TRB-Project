const updateFreight = () => {
  const {
    kalustesuunnitelmaObj,
    toimittajatrahditObj,
  } = fetchAllConsts();

  const {
    col,
    colB0,
    startRow,
    nRows,
    sheet,
    data,
  } = toimittajatrahditObj;

  const {
   Paamies,
   Kokonaisrahti,
   Tuoterivit,
   Rahti_per_tuoterivi,
  } = enums.TOIMITTAJAT_JA_RAHDIT.HEADINGS;
  
  let suppliersDict = {};
  let tempDict = {};
  const supplierCol = kalustesuunnitelmaObj.colB0[enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja];
  let i;
  for (i = 1; i < kalustesuunnitelmaObj.nRows; i++) {
    let supplier = kalustesuunnitelmaObj.data[i][supplierCol];
    tempDict[supplier] = true;
    suppliersDict[supplier] = 0;
  };

  for (i = 1; i < nRows; i++) {
    let supplier = data[i][0];
    if (tempDict[supplier]) suppliersDict[supplier] = toimittajatrahditObj.data[i][colB0[Kokonaisrahti]]; // Skip if not found in kalustesuunnitelma tempDict.
  };
  
Logger.log(suppliersDict);
  newArr = Object.keys(suppliersDict).map(key => [key, suppliersDict[key]]);
  const dataRange = writeArrToSheet(newArr, toimittajatrahditObj, dataOnly = 1);
  dataRange.sort(col[Paamies]);
  const nRowsUpdated = Object.keys(suppliersDict).length + 1; // Update nRows, new rows might be added. + 1 to include headingRow.

  const supplierColRef = createA1ColRef(kalustesuunnitelmaObj, enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja, dataOnly = 1);
  const supplierCellRef = sheet.getRange(startRow + 1, col[Paamies]).getA1Notation();
  const rowCountFormulaCell = sheet.getRange(startRow + 1, col[Tuoterivit]);
  const rowCountFormula = '=COUNTIF(' + supplierColRef + ';' + supplierCellRef + ')';
  rowCountFormulaCell.setFormula(rowCountFormula);
  if (nRowsUpdated > 2) rowCountFormulaCell.copyTo(sheet.getRange(startRow + 2, col[Tuoterivit], nRowsUpdated - 2)); // Copy Down formula. -2 to omit headingRow and first formula cell
 
  const costCellRef = sheet.getRange(startRow + 1, col[Kokonaisrahti]).getA1Notation();
  const rowCostFormula = '=' + costCellRef + '/' + rowCountFormulaCell.getA1Notation();
  const rowCostFormulaCell = sheet.getRange(startRow + 1, col[Rahti_per_tuoterivi]);
  rowCostFormulaCell.setValue(rowCostFormula);
  if (nRowsUpdated > 2) rowCostFormulaCell.copyTo(sheet.getRange(startRow + 2, col[Rahti_per_tuoterivi], nRowsUpdated - 2)); // Copy Down formula. -2 to omit headingRow and first formula cell
 
};
