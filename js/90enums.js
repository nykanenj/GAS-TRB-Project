//Example here: https://www.sohamkamani.com/blog/2017/08/21/enums-in-javascript/
//These enums are loaded automatically for all files in this App Script Project
//i.e. All files are readily available to eachother

const enums = {
  // enums.SHEETS.TILANNE
  SHEETS: {
    config: 'config',
    TILANNE: 'TILANNE', // enums.SHEETS.TILANNE
    KALUSTESUUNNITELMA: 'KALUSTESUUNNITELMA', // enums.SHEETS.KALUSTESUUNNITELMA
    MAKSUAIKATAULUKKO: 'MAKSUAIKATAULUKKO', // enums.SHEETS.MAKSUAIKATAULUKKO
    ASENNUSLISTA: 'ASENNUSLISTA', // enums.SHEETS.ASENNUSLISTA
    TOIMITTAJAT_JA_RAHDIT: 'TOIMITTAJAT_JA_RAHDIT', // enums.SHEETS.TOIMITTAJAT JA RAHDIT
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
      spaceQuantityFirstColumnIndex: 'KALUSTESUUNNITELMA.spaceQuantityFirstColumnIndex', // enums.NAMEDRANGES.spaceQuantytyFirstColumnIndex
      spaceQuantityLastColumnIndex: 'KALUSTESUUNNITELMA.spaceQuantityLastColumnIndex', // enums.NAMEDRANGES.spaceQuantityLastColumnIndex
    },
    ASENNUSLISTA: {
      spaceQuantityFirstColumnIndex: 'ASENNUSLISTA.spaceQuantityFirstColumnIndex', // enums.NAMEDRANGES.spaceQuantytyFirstColumnIndex
      spaceQuantityLastColumnIndex: 'ASENNUSLISTA.spaceQuantityLastColumnIndex', // enums.NAMEDRANGES.spaceQuantityLastColumnIndex
    },
    
  },
  // enums.HEADINGS.KALUSTESUUNNITELMA.ID
  KALUSTESUUNNITELMA: {
    META: {
      STARTROW: 11,
    },
    HEADINGS: {
      ID: 'ID', // enums.KALUSTESUUNNITELMA.HEADINGS.ID
      Tila: 'Tila', // enums.KALUSTESUUNNITELMA.HEADINGS.Tila
      Positio: 'Positio', // enums.KALUSTESUUNNITELMA.HEADINGS.Positio
      Tuote: 'Tuote', // enums.KALUSTESUUNNITELMA.HEADINGS.Tuote
      Kesken: 'Kesken', // enums.KALUSTESUUNNITELMA.HEADINGS.Kesken
      Tuotteen_lisatiedot: 'Tuotteen lisätiedot', // enums.KALUSTESUUNNITELMA.HEADINGS.Tuotteen_lisatiedot
      Maara_yht: 'Määrä yht.', // enums.KALUSTESUUNNITELMA.HEADINGS.Maara_yht
      Valmistaja: 'Valmistaja', // enums.KALUSTESUUNNITELMA.HEADINGS.Valmistaja
      Kommentti: 'Kommentti', // enums.KALUSTESUUNNITELMA.HEADINGS.Kommentti
      Kuva: 'Kuva', // enums.KALUSTESUUNNITELMA.HEADINGS.Kuva
      Maara_tila_1: 'Määrä tila 1', // enums.KALUSTESUUNNITELMA.HEADINGS.Maara_tila_1
      Lisa_tilaus: 'Lisä-tilaus', // enums.KALUSTESUUNNITELMA.HEADINGS.Lisa_tilaus
      Myyntihinta: 'Myyntihinta', // enums.KALUSTESUUNNITELMA.HEADINGS.Myyntihinta
      Myyntihinta_yhteensa: 'Myyntihinta yhteensä', // enums.KALUSTESUUNNITELMA.HEADINGS.Myyntihinta_yhteensa
      Toimittaja: 'Toimittaja', // enums.KALUSTESUUNNITELMA.HEADINGS.Toimittaja
      Tilaus_pvm: 'Tilaus pvm', // enums.KALUSTESUUNNITELMA.HEADINGS.Tilaus_pvm
      Hankinta_lupa: 'Hankinta-lupa', // enums.KALUSTESUUNNITELMA.HEADINGS.Hankinta_lupa
      Ostotilausnumero: 'Ostotilausnumero', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostotilausnumero
      Vahvistettu_toimituspaiva_tehtaalta: 'Vahvistettu toimituspäivä tehtaalta', // enums.KALUSTESUUNNITELMA.HEADINGS.Vahvistettu_toimituspaiva_tehtaalta
      Toimitus_paiva_asiakkaalle: 'Toimitus-päivä asiakkaalle', // enums.KALUSTESUUNNITELMA.HEADINGS.Toimitus_paiva_asiakkaalle
      Saapunut_varastoon: 'Saapunut varastoon', // enums.KALUSTESUUNNITELMA.HEADINGS.Saapunut_varastoon
      Toimitettu: 'Toimitettu', // enums.KALUSTESUUNNITELMA.HEADINGS.Toimitettu
      Paamieshinta_kpl: 'Päämieshinta kpl', // enums.KALUSTESUUNNITELMA.HEADINGS.Paamieshinta_kpl
      NETTO_paamieshinto: 'NETTO päämieshinta', // enums.KALUSTESUUNNITELMA.HEADINGS.NETTO_paamieshinto
      Tehtaan_alennus: 'Tehtaan alennus', // enums.KALUSTESUUNNITELMA.HEADINGS.Tehtaan_alennus
      Tehtaan_alennus2: 'Tehtaan alennus2', // enums.KALUSTESUUNNITELMA.HEADINGS.Tehtaan_alennus2
      Tehtaan_alennus3: 'Tehtaan alennus3', // enums.KALUSTESUUNNITELMA.HEADINGS.Tehtaan_alennus3
      Ostorahti_pros: 'Ostorahti %', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostorahti_pros
      Ostorahti_eur: 'Ostorahti €', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostorahti_eur
      Ostorahdin_vakuutus: 'Ostorahdin vakuutus', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostorahdin_vakuutus
      Rahti_eur: 'Rahti €', // enums.KALUSTESUUNNITELMA.HEADINGS.Rahti_eur
      Lisakulu: 'Lisäkulu', // enums.KALUSTESUUNNITELMA.HEADINGS.Lisakulu
      Ostohinta: 'Ostohinta', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostohinta
      Myyntikate: 'Myyntikate', // enums.KALUSTESUUNNITELMA.HEADINGS.Myyntikate
      Valityskate: 'Välityskate', // enums.KALUSTESUUNNITELMA.HEADINGS.Valityskate
      Ostohinta_yhteensa: 'Ostohinta yhteensä', // enums.KALUSTESUUNNITELMA.HEADINGS.Ostohinta_yhteensa
      Varastokulu: 'Varastokulu', // enums.KALUSTESUUNNITELMA.HEADINGS.Varastokulu
      Myyntirahdin_vakuutus: 'Myyntirahdin vakuutus', // enums.KALUSTESUUNNITELMA.HEADINGS.Myyntirahdin_vakuutus
      Haalaus: 'Haalaus', // enums.KALUSTESUUNNITELMA.HEADINGS.Haalaus
      Asennus: 'Asennus', // enums.KALUSTESUUNNITELMA.HEADINGS.Asennus
      Ompelu: 'Ompelu', // enums.KALUSTESUUNNITELMA.HEADINGS.Ompelu
      Verhoilu: 'Verhoilu', // enums.KALUSTESUUNNITELMA.HEADINGS.Verhoilu
      Erikoiskuljetus: 'Erikoiskuljetus', // enums.KALUSTESUUNNITELMA.HEADINGS.Erikoiskuljetus
      Lisatyot: 'Lisätyöt', // enums.KALUSTESUUNNITELMA.HEADINGS.Lisatyot
      Paamies_laskunnro_1: 'Päämies laskunnro 1', // enums.KALUSTESUUNNITELMA.HEADINGS.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 1', // enums.KALUSTESUUNNITELMA.HEADINGS.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 1', // enums.KALUSTESUUNNITELMA.HEADINGS.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 1', // enums.KALUSTESUUNNITELMA.HEADINGS.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 2', // enums.KALUSTESUUNNITELMA.HEADINGS.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 2', // enums.KALUSTESUUNNITELMA.HEADINGS.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 2', // enums.KALUSTESUUNNITELMA.HEADINGS.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 2', // enums.KALUSTESUUNNITELMA.HEADINGS.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 3', // enums.KALUSTESUUNNITELMA.HEADINGS.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 3', // enums.KALUSTESUUNNITELMA.HEADINGS.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 3', // enums.KALUSTESUUNNITELMA.HEADINGS.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 3', // enums.KALUSTESUUNNITELMA.HEADINGS.Maksettu_lasku_1
      Paamies_laskunnro_1: 'Päämies laskunnro 4', // enums.KALUSTESUUNNITELMA.HEADINGS.Paamies_laskunnro_1
      Laskun_tai_rivin_summa_1: 'Laskun tai rivin summa 4', // enums.KALUSTESUUNNITELMA.HEADINGS.Laskun_tai_rivin_summa_1
      Erapaiva_lasku_1: 'Eräpäivä lasku 4', // enums.KALUSTESUUNNITELMA.HEADINGS.Erapaiva_lasku_1
      Maksettu_lasku_1: 'Maksettu lasku 4', // enums.KALUSTESUUNNITELMA.HEADINGS.Maksettu_lasku_1
      Ennakkomaksu: 'Ennakkomaksu', // enums.KALUSTESUUNNITELMA.HEADINGS.Ennakkomaksu
      TRB: 'TRB', // enums.KALUSTESUUNNITELMA.HEADINGS.TRB
    },
  },
  ASENNUSLISTA: {
    META: {
      STARTROW: 3,
    },
    HEADINGS: {
      ID: 'ID', // enums.ASENNUSLISTA.HEADINGS.ID
      Tila: 'Tila', // enums.ASENNUSLISTA.HEADINGS.Tila
      Positio: 'Positio', // enums.ASENNUSLISTA.HEADINGS.Positio
      Tuote: 'Tuote', // enums.ASENNUSLISTA.HEADINGS.Tuote
      Maara_yht: 'Määrä yht.', // enums.ASENNUSLISTA.HEADINGS.Maara_yht 
      Valmistaja: 'Valmistaja', // enums.ASENNUSLISTA.HEADINGS.Valmistaja
      Kuva: 'Kuva', // enums.ASENNUSLISTA.HEADINGS.Kuva
      Vahvistettu_toimituspaiva_tehtaalta: 'Vahvistettu toimituspäivä tehtaalta', // enums.ASENNUSLISTA.HEADINGS.Vahvistettu toimituspäivä tehtaalta
      Toimitusviikko_tehtaalta: 'Toimitusviikko tehtaalta',  
      Toimitus_paiva_asiakkaalle: 'Toimitus-päivä asiakkaalle', // enums.ASENNUSLISTA.HEADINGS.Toimitus-päivä asiakkaalle
      Saapunut_varastoon: 'Saapunut varastoon', // enums.ASENNUSLISTA.HEADINGS.Saapunut varastoon
      Toimitettu: 'Toimitettu', // enums.ASENNUSLISTA.HEADINGS.Toimitettu
    },
  },
  TOIMITTAJAT_JA_RAHDIT: {
    META: {
      STARTROW: 3,
    },
    HEADINGS: {
      Paamies: 'Päämies',
      Kokonaisrahti: 'Kokonaisrahti',
      Tuoterivit: 'Tuoterivit',
      Rahti_per_tuoterivi: 'Rahti per tuoterivi', 
    },
  },
  //BLABLA: {
  //  
  //};

}


// GlOSSARY
// Julkinen versio: Public version
// Määrä-tila: Space quantity
// Asennuslista: installation list
