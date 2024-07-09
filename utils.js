function getSheetByName(name) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet()
  return sheet.getSheetByName(name)
}
