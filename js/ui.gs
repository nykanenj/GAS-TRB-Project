// global 
var ss = SpreadsheetApp.getActive();

const onOpen = (e) => {
  Logger.log('running onOpen');
  Logger.log(e.authMode)
  var menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem('Lisää rivi', 'addRow');
  menu.addItem('Luo julkinen versio', 'createPublicVersion');
  menu.addToUi();
}

const onInstall = (e) => {
  onOpen(e);
}
