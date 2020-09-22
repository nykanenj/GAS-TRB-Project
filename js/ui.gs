// global 
var ss = SpreadsheetApp.getActive();

const onOpen = (e) => {
  envRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('env');
  env = envRange && envRange.getValue();
  Logger.log('Running onOpen with env ' + env);
  Logger.log('onOpen e.authmode: ' + e.authMode)
  ui = SpreadsheetApp.getUi();
  let menu = ui.createAddonMenu();
  if (env === 'dev') {
    menu.addItem('Päivitä asennuslista', 'updateInstallationList');
    menu.addItem('Test', 'test');
    menu.addItem('Initialize', 'initialize');
    menu.addSeparator();
  }
  //menu.addItem('Lisää rivi', 'addRow');
  menu.addSubMenu(ui.createMenu('Julkinen Versio')
    .addItem('Luo julkinen versio', 'createPublicVersion')
    .addItem('Luo julkinen versio ilman päämiehiä', 'createPublicVersionNoSuppliers')
    .addItem('Luo julkinen versio TRB -sarakkeen kategorioista', 'createPublicVersionByCategories'));
  menu.addSeparator();
  menu.addSubMenu(ui.createMenu('Määrä-tila')
    .addItem('Lisää "Määrä tila" -sarake', 'addSpaceQuantityColumn')
    .addItem('Poista "Määrä tila" -sarake', 'removeSpaceQuantityColumn'));
  menu.addSeparator();
  menu.addSubMenu(ui.createMenu('Asennuslista')
    .addItem('Päivitä asennuslista', 'updateInstallationList'));
  menu.addToUi();
}

const onInstall = (e) => {
  onOpen(e);
}