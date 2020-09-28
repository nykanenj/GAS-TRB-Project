//Example here: https://www.sohamkamani.com/blog/2017/08/21/enums-in-javascript/
//These enums are loaded automatically for all files in this App Script Project
//i.e. All files are readily available to eachother

const enums = {
  // enmus.SHEETS.TILANNE
  SHEETS: {
    TILANNE: 'TILANNE', // enums.SHEETS.TILANNE
    KALUSTESUUNNITELMA: 'KALUSTESUUNNITELMA', // enums.SHEETS.KALUSTESUUNNITELMA
    MAKSUAIKATAULUKKO: 'MAKSUAIKATAULUKKO', // enums.SHEETS.MAKSUAIKATAULUKKO
    ASENNUSLISTA: 'ASENNUSLISTA', // enums.SHEETS.ASENNUSLISTA
    TOIMITTAJAT_JA_RAHDIT: 'TOIMITTAJAT JA RAHDIT', // enums.SHEETS.TOIMITTAJAT JA RAHDIT
    TILIASEMASELVITYS: 'TILIASEMASELVITYS'
  },
  // enums.NAMEDRANGES.spaceQuantityFirstColumnName
  NAMEDRANGES: {
    env: 'env', // enums.NAMEDRANGES.env
    publicVersionsFolderID: 'publicVersionsFolderID', // enums.NAMEDRANGES.publicVersionsFolderID
    initialID: 'initialID', // enums.NAMEDRANGES.initialID
    ID: 'ID', // enums.NAMEDRANGES.ID
    spaceQuantityColumnCount: 'spaceQuantityColumnCount', // enums.NAMEDRANGES.spaceQuantityColumnCount
    spaceQuantityColumnNames: 'spaceQuantityColumnNames', // enums.NAMEDRANGES.spaceQuantityColumnNames
    spaceQuantityFirstColumnName: 'spaceQuantityFirstColumnName', // enums.NAMEDRANGES.spaceQuantityFirstColumnName
    spaceQuantityLastColumnName: 'spaceQuantityLastColumnName', // enums.NAMEDRANGES.spaceQuantityLastColumnName
    KALUSTESUUNNITELMA: {
      spaceQuantytyFirstColumnIndex: 'KALUSTESUUNNITELMA.spaceQuantytyFirstColumnIndex', // enums.NAMEDRANGES.spaceQuantytyFirstColumnIndex
      spaceQuantityLastColumnIndex: 'KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex', // enums.NAMEDRANGES.spaceQuantityLastColumnIndex
    },
    ASENNUSLISTA: {
      spaceQuantytyFirstColumnIndex: 'ASENNUSLISTA.spaceQuantytyFirstColumnIndex', // enums.NAMEDRANGES.spaceQuantytyFirstColumnIndex
      spaceQuantityLastColumnIndex: 'ASENNUSLISTA.spaceQuantityLastColumnIndex', // enums.NAMEDRANGES.spaceQuantityLastColumnIndex
    },
    
  },
  // enums.HEADINGS.KALUSTESUUNNITELMA.ID
  HEADINGS:{
    KALUSTESUUNNITELMA: {
      ID: 'ID', // enums.HEADINGS.KALUSTESUUNNITELMA.ID
      Tila: 'Tila', // enums.HEADINGS.KALUSTESUUNNITELMA.Tila
      Positio: 'Positio', // enums.HEADINGS.KALUSTESUUNNITELMA.Positio
      Tuote: 'Tuote', // enums.HEADINGS.KALUSTESUUNNITELMA.Tuote
      Kesken: 'Kesken', // enums.HEADINGS.KALUSTESUUNNITELMA.Kesken
      Tuotteen_lisatiedot: 'Tuotteen lisätiedot', // enums.HEADINGS.KALUSTESUUNNITELMA.Tuotteen_lisatiedot
      Maara_yht: 'Määrä yht.', // enums.HEADINGS.KALUSTESUUNNITELMA.Maara_yht
      Valmistaja: 'Valmistaja', // enums.HEADINGS.KALUSTESUUNNITELMA.Valmistaja
      Kommentti: 'Kommentti', // enums.HEADINGS.KALUSTESUUNNITELMA.Kommentti
      Kuva: 'Kuva', // enums.HEADINGS.KALUSTESUUNNITELMA.Kuva
      Maara_tila_1: 'Määrä tila 1', // enums.HEADINGS.KALUSTESUUNNITELMA.Maara_tila_1
      Lisa_tilaus: 'Lisä-tilaus', // enums.HEADINGS.KALUSTESUUNNITELMA.Lisa_tilaus
      Myyntihinta: 'Myyntihinta', // enums.HEADINGS.KALUSTESUUNNITELMA.Myyntihinta
      Myyntihinta_yhteensa: 'Myyntihinta yhteensä', // enums.HEADINGS.KALUSTESUUNNITELMA.Myyntihinta_yhteensa
      Toimittaja: 'Toimittaja', // enums.HEADINGS.KALUSTESUUNNITELMA.Toimittaja
      Tilaus_pvm: 'Tilaus pvm', // enums.HEADINGS.KALUSTESUUNNITELMA.Tilaus_pvm
      Hankinta_lupa: 'Hankinta-lupa', // enums.HEADINGS.KALUSTESUUNNITELMA.Hankinta_lupa
      Ostotilausnumero: 'Ostotilausnumero', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostotilausnumero
      Vahvistettu_toimituspaiva_tehtaalta: 'Vahvistettu toimituspäivä tehtaalta', // enums.HEADINGS.KALUSTESUUNNITELMA.Vahvistettu_toimituspaiva_tehtaalta
      Toimitus_paiva_asiakkaalle: 'Toimitus-päivä asiakkaalle', // enums.HEADINGS.KALUSTESUUNNITELMA.Toimitus_paiva_asiakkaalle
      Saapunut_varastoon: 'Saapunut varastoon', // enums.HEADINGS.KALUSTESUUNNITELMA.Saapunut_varastoon
      Toimitettu: 'Toimitettu', // enums.HEADINGS.KALUSTESUUNNITELMA.Toimitettu
      Paamieshinta_kpl: 'Päämieshinta kpl', // enums.HEADINGS.KALUSTESUUNNITELMA.Paamieshinta_kpl
      NETTO_paamieshinto: 'NETTO päämieshinta', // enums.HEADINGS.KALUSTESUUNNITELMA.NETTO_paamieshinto
      Tehtaan_alennus: 'Tehtaan alennus', // enums.HEADINGS.KALUSTESUUNNITELMA.Tehtaan_alennus
      Tehtaan_alennus2: 'Tehtaan alennus2', // enums.HEADINGS.KALUSTESUUNNITELMA.Tehtaan_alennus2
      Tehtaan_alennus3: 'Tehtaan alennus3', // enums.HEADINGS.KALUSTESUUNNITELMA.Tehtaan_alennus3
      Ostorahti_pros: 'Ostorahti %', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostorahti_pros
      Ostorahti_eur: 'Ostorahti €', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostorahti_eur
      Ostorahdin_vakuutus: 'Ostorahdin vakuutus', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostorahdin_vakuutus
      Rahti_eur: 'Rahti €', // enums.HEADINGS.KALUSTESUUNNITELMA.Rahti_eur
      Lisakulu: 'Lisäkulu', // enums.HEADINGS.KALUSTESUUNNITELMA.Lisakulu
      Ostohinta: 'Ostohinta', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostohinta
      Myyntikate: 'Myyntikate', // enums.HEADINGS.KALUSTESUUNNITELMA.Myyntikate
      Valityskate: 'Välityskate', // enums.HEADINGS.KALUSTESUUNNITELMA.Valityskate
      Ostohinta_yhteensa: 'Ostohinta yhteensä', // enums.HEADINGS.KALUSTESUUNNITELMA.Ostohinta_yhteensa
      Varastokulu: 'Varastokulu', // enums.HEADINGS.KALUSTESUUNNITELMA.Varastokulu
      Myyntirahdin_vakuutus: 'Myyntirahdin vakuutus', // enums.HEADINGS.KALUSTESUUNNITELMA.Myyntirahdin_vakuutus
      Haalaus: 'Haalaus', // enums.HEADINGS.KALUSTESUUNNITELMA.Haalaus
      Asennus: 'Asennus', // enums.HEADINGS.KALUSTESUUNNITELMA.Asennus
      Ompelu: 'Ompelu', // enums.HEADINGS.KALUSTESUUNNITELMA.Ompelu
      Verhoilu: 'Verhoilu', // enums.HEADINGS.KALUSTESUUNNITELMA.Verhoilu
      Erikoiskuljetus: 'Erikoiskuljetus', // enums.HEADINGS.KALUSTESUUNNITELMA.Erikoiskuljetus
      Lisatyot: 'Lisätyöt', // enums.HEADINGS.KALUSTESUUNNITELMA.Lisatyot
      Paamies_laskunnro_1: 'Päämies laskunnro 1', // enums.HEADINGS.KALUSTESUUNNITELMA.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 1', // enums.HEADINGS.KALUSTESUUNNITELMA.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 1', // enums.HEADINGS.KALUSTESUUNNITELMA.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 1', // enums.HEADINGS.KALUSTESUUNNITELMA.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 2', // enums.HEADINGS.KALUSTESUUNNITELMA.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 2', // enums.HEADINGS.KALUSTESUUNNITELMA.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 2', // enums.HEADINGS.KALUSTESUUNNITELMA.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 2', // enums.HEADINGS.KALUSTESUUNNITELMA.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 3', // enums.HEADINGS.KALUSTESUUNNITELMA.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 3', // enums.HEADINGS.KALUSTESUUNNITELMA.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 3', // enums.HEADINGS.KALUSTESUUNNITELMA.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 3', // enums.HEADINGS.KALUSTESUUNNITELMA.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 4', // enums.HEADINGS.KALUSTESUUNNITELMA.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 4', // enums.HEADINGS.KALUSTESUUNNITELMA.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 4', // enums.HEADINGS.KALUSTESUUNNITELMA.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 4', // enums.HEADINGS.KALUSTESUUNNITELMA.Maksettu_lasku_1
      Ennakkomaksu: 'Ennakkomaksu', // enums.HEADINGS.KALUSTESUUNNITELMA.Ennakkomaksu
      TRB: 'TRB', // enums.HEADINGS.KALUSTESUUNNITELMA.TRB
    },
  },
  //BlaBla: {
  //   
  //}
}