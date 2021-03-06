const onOpen = (e) => {
  const env = getEnv();
  Logger.log("Running onOpen with env " + env);
  Logger.log("onOpen e.authmode: " + e.authMode);
  ui = SpreadsheetApp.getUi();
  let menu = ui.createAddonMenu();
  if (env === "dev") {
    menu.addItem("Luo päämieslistat", "createSupplierLists");
    menu.addSeparator();
    menu.addItem("repopulate", "repopulateConfigSheet");
    menu.addItem("Test", "test");
    menu.addItem("Automated tests", "runAutomatedTests");
    menu.addItem("Initialize", "initialize");
    menu.addSeparator();
  }
  //menu.addItem('Lisää rivi', 'addRow');
  menu.addSubMenu(
    ui
      .createMenu("Julkinen Versio")
      .addItem("Luo julkinen versio", "createPublicVersion")
      .addItem(
        "Luo julkinen versio ilman päämiehiä",
        "createPublicVersionNoSuppliers"
      )
      .addItem(
        "Luo julkinen versio TRB -sarakkeen kategorioista",
        "createPublicVersionByCategories"
      )
  );
  menu.addSeparator();
  menu.addSubMenu(
    ui
      .createMenu("Määrä-tila")
      .addItem('Lisää "Määrä tila" -sarake', "addSpaceQuantityColumn")
      .addItem(
        'Poista viimeinen "Määrä tila" -sarake',
        "removeSpaceQuantityColumn"
      )
  );
  menu.addSeparator();
  menu.addItem("Luo päämieslistat", "createSupplierLists");
  menu.addItem("Päivitä asennuslista", "updateInstallationList");
  menu.addItem("Päivitä rahdit", "updateFreight");
  menu.addToUi();
};

const onInstall = (e) => {
  onOpen(e);
};
