const updateInstallationList = () => {
  // header hashmap ASENNUSLISTA
  // header hashmap KALUSTESUUNNITELMA
  // lastrow KALUSTESUUNNITELMA
  // Build the result table in memory. Headings included?? Probably yes.
  // Try to read KALUSTESUUNNITELMA into an array? Then try to move one array column at a time into new table.
  
  const {
    spreadSheet,
    kalustesuunnitelmaObj,
    asennuslistaObj,
    spaceQuantity,
  } = fetchAllConsts();
  
  const data = kalustesuunnitelmaObj.data;
  const colB0 = kalustesuunnitelmaObj.colB0;

  const {
    ID,
    Tila,
    Positio,
    Tuote,
    Maara_yht,
    Valmistaja,
    Kuva,
    Vahvistettu_toimituspaiva_tehtaalta,
    Toimitusviikko_tehtaalta,
    Toimitus_paiva_asiakkaalle,
    Saapunut_varastoon,
    Toimitettu,
  } = enums.ASENNUSLISTA.HEADINGS;
  
  const newArr = [];
  newArr.push([ID,
               Tila,
               Positio,
               Tuote,
               Maara_yht,
               Valmistaja,
               Kuva,
               ...spaceQuantity.colNamesArray,
               Vahvistettu_toimituspaiva_tehtaalta,
               Toimitusviikko_tehtaalta,
               Toimitus_paiva_asiakkaalle,
               Saapunut_varastoon,
               Toimitettu]);

  for (let i = 1; i < kalustesuunnitelmaObj.nRows; i++) {
  
    
    let id = data[i][colB0[ID]];
    let tila = data[i][colB0[Tila]]; 
    let positio = data[i][colB0[Positio]];
    let tuote = data[i][colB0[Tuote]];
    let maara_yht = data[i][colB0[Maara_yht]];
    let valmistaja = data[i][colB0[Valmistaja]];
    let kuva = 'kuva'; // data[i][6];
    let spaceQuantityCells = [];
    for (let j = kalustesuunnitelmaObj.spaceQuantity.firstColumn - 1; j <= kalustesuunnitelmaObj.spaceQuantity.lastColumn - 1; j++) { // -1 to get base0 value used in array
      spaceQuantityCells.push(data[i][j]);
    };
    let vahvistettu_toimituspaiva_tehtaalta = data[i][colB0[Vahvistettu_toimituspaiva_tehtaalta]];     
    let toimitusviikko_tehtaalta = 'toimitusvk tehtaalta'
    let toimitus_paiva_asiakkaalle = data[i][colB0[Toimitus_paiva_asiakkaalle]];
    let saapunut_varastoon = data[i][colB0[Saapunut_varastoon]];
    let toimitettu = data[i][Toimitettu];
    
      
    newArr.push([id,
                 tila,
                 positio,
                 tuote,
                 maara_yht,
                 valmistaja,
                 kuva,
                 ...spaceQuantityCells, 
                 vahvistettu_toimituspaiva_tehtaalta, 
                 toimitusviikko_tehtaalta,
                 toimitus_paiva_asiakkaalle,
                 saapunut_varastoon,
                 toimitettu
               ]);
  };
  
  writeArrToSheet(newArr, asennuslistaObj);

  // Move picture column
  const picturesSourceCol = getSingleColumn(kalustesuunnitelmaObj, Kuva);
  const picturesDestinationCol = getSingleColumn(asennuslistaObj, Kuva);
  picturesSourceCol.copyTo(picturesDestinationCol);

  // Update date https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
  const now = new Date();
  const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const cellText = 'Päivitetty: ' + Utilities.formatDate(now, timeZone, "dd.MM.yyyy 'klo' HH:mm:ss");
  asennuslistaObj.sheet.getRange('D1').setValue(cellText);
}
