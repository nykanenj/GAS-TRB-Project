//Example here: https://www.sohamkamani.com/blog/2017/08/21/enums-in-javascript/
//These enums are loaded automatically for all files in this App Script Project
//i.e. All files are readily available to eachother

const enums = {
  SHEETS: {
    TILANNE: 'TILANNE',
    KALUSTESUUNNITELMA: 'KALUSTESUUNNITELMA',
    MAKSUAIKATAULUKKO: 'MAKSUAIKATAULUKKO',
    ASENNUSLISTA: 'ASENNUSLISTA',
    TOIMITTAJAT_JA_RAHDIT: 'TOIMITTAJAT JA RAHDIT',
    TILIASEMASELVITYS: 'TILIASEMASELVITYS'
  },
  NAMEDRANGES: {
    publicVersionsFolderID: 'publicVersionsFolderID',
  },
  HEADINGS:{
    KALUSTESUUNNITELMA: {
      Tila: 'Tila',
      Positio: 'Positio',
      Tuote: 'Tuote',
      Kesken: 'Kesken',
      Tuotteen_lisatiedot: 'Tuotteen lisätiedot',
      Maara_yht: 'Määrä yht.',
      Valmistaja: 'Valmistaja',
      Kommentti: 'Kommentti',
      Kuva: 'Kuva',
      Maara_tila_1: 'Määrä tila 1',
      Lisa_tilaus: 'Lisä tilaus',
      Myyntihinta: 'Myyntihinta',
      Myyntihinta_yhteensa: 'Myyntihinta yhteensä',
      Toimittaja: 'Toimittaja',
      Tilaus_pvm: 'Tilaus pvm',
      Hankinta_lupa: 'Hankinta-lupa',
      Ostotilausnumero: 'Ostotilausnumero',
      Vahvistettu_toimituspaiva_tehtaalta: 'Vahvistettu toimituspäivä tehtaalta',
      Toimitus_paiva_asiakkaalle: 'Toimitus-päivä asiakkaalle',
      Saapunut_varastoon: 'Saapunut varastoon',
      Toimitettu: 'Toimitettu',
      Paamieshinta_kpl: 'Päämieshinta kpl',
      NETTO_paamieshinto: 'NETTO päämieshinta',
      Tehtaan_alennus: 'Tehtaan alennus',
      Tehtaan_alennus2: 'Tehtaan alennus2',
      Tehtaan_alennus3: 'Tehtaan alennus3',
      Ostorahti_pros: 'Ostorahti %',
      Ostorahti_eur: 'Ostorahti €',      
    },
  },
}
