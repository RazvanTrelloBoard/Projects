function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Automate')
    .addItem('Update Data', 'updateDataOzone')
    // .addItem('Update Zero Qty', 'updateZeroQty')
    .addToUi();
}


function updateDataOzone() {
  var workBook = SpreadsheetApp.getActiveSpreadsheet();
  var newOrdersSheet = workBook.getSheetByName("Ozone")
  var sheet4 = workBook.getSheetByName("Sheet4")
  var newOrders = newOrdersSheet.getDataRange().getValues();
  const prefix = sheet4.getRange("H1").getValue().toString()
  var colA = sheet4.getRange("A2:A" + sheet4.getLastRow()).getValues();
  colA = [].concat(...colA);

  var colI = sheet4.getRange("I2:I" + sheet4.getLastRow()).getValues();
  colI = [].concat(...colI);

  var newOrdersColA = newOrders.map((r) => r[0])
  idCol = sheet4.getRange("K2:K" + sheet4.getLastRow()).getValues()
  idCol = [].concat(...idCol)
  // console.log(idCol)
  const maxId = Math.max(...idCol)
  var ids = []
  var result = []
  var ozoneCols = []
  newOrders.forEach((order, index) => {
    if (index != 0 && newOrdersColA.indexOf(order[0]) == index && colA.indexOf(order[0]) == -1) {
      result.push([order[0], order[8], ""])
      // order.shift()
      ozoneCols.push(order)
    }
  })
  console.log(maxId)
  for (var i = 0; i < result.length; i++) {
    var ean = ""
    do {
      ean = getEAN(prefix)
    }
    while (ean == "" || colI.indexOf(ean) > 0)

    ids.push([ean, "", maxId + i + 1])
  }

  console.log(ids)
  console.log(result)
  console.log(ean)
  console.log(ozoneCols)

  if (result.length > 0) {
    const lr = sheet4.getLastRow();
    var formulas = []
    var formulas2 = []
    var formulas3 = []
    var formulas4 = []
    var caracteristici = []
    var tax = []
    var char1 = []
    result.forEach((row, i) => {
      const rowNum = lr + i + 1;
      formulas.push([`=VLOOKUP(A` + (lr + i + 1) + `,Minimumupdate!A:F,2,0)`,
      '=IF(ISERROR(VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,2,0)),"999",IF(MIN(VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,5,0),VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,3,0))<10,MIN(VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,5,0),VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,3,0)),MIN(VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,5,0),VLOOKUP(A' + (lr + i + 1) + ',Minimumupdate!A:E,3,0))))',
      `=IF(ISERROR(VLOOKUP(A` + (lr + i + 1) + `,Minimumupdate!A:H,5,0)),0,100)`,
      `=F` + (lr + i + 1) + `*1.5`,
      `=((C` + (lr + i + 1) + `+20)*1.25)*1.3`])
      formulas3.push([`=IF(ISERROR(VLOOKUP(A` + (lr + i + 1) + `,Save!A:F,6,0)),K` + (lr + i + 1) + `, VLOOKUP(A` + (lr + i + 1) + `,Save!A:F,6,0))`]);
      formulas2.push(['=IF(ISBLANK(Vlookup(A' + (lr + i + 1) + ',W:FU,MATCH("Marca", $1:$1, 0)-22,0)), "null", VLOOKUP(A' + (lr + i + 1) + ', W:FU, MATCH("Marca", $1:$1, 0)-22, 0))','Puzzle', '=Vlookup(A' + (lr + i + 1) + ',W:FW,MATCH("Număr piese", $1:$1, 0)-22,0)',
      '=Vlookup(A' + (lr + i + 1) + ',W:FW,MATCH("image", $1:$1, 0)-22,0)','=Vlookup(A' + (lr + i + 1) + ',W:FW,MATCH("image", $1:$1, 0)-21,0)','=Vlookup(A' + (lr + i + 1) + ',W:FW,MATCH("image", $1:$1, 0)-20,0)',,,
      '=IF(ISERROR(FIND("3D",VLOOKUP(A' + (lr + i + 1) +',Sheet4!W:FW,4,0),1)),IF(ISERROR(FIND("lemn",VLOOKUP(A' + (lr + i + 1) + ',Sheet4!W:FW,4,0),1)),"Clasic","Lemn"),"3D")'])
      formulas4.push([`=TEXTJOIN(",", TRUE, IF(AV${rowNum}<>"", AV${rowNum}, ""), IF(AW${rowNum}<>"", AW${rowNum}, ""), IF(AX${rowNum}<>"", AX${rowNum}, ""), IF(AG${rowNum}<>"", AG${rowNum}, ""), IF(AH${rowNum}<>"", AH${rowNum}, ""), IF(AJ${rowNum}<>"", AJ${rowNum}, ""), IF(AK${rowNum}<>"", AK${rowNum}, ""))`])
      tax.push(['0'])
      char1.push(['Tip'])
      caracteristici.push(['Material', '=AL' + (lr + i + 1), 'Numar piese', '=AA' + (lr + i + 1)]);
    })



    // console.log({ ozoneCols })
    sheet4.getRange(lr + 1, 1, result.length, 3).setValues(result)
    sheet4.getRange(lr + 1, 9, result.length, 3).setValues(ids)
    sheet4.getRange(lr + 1, 2, formulas.length, formulas[0].length).setValues(formulas)
    sheet4.getRange(lr + 1, 13, formulas2.length, formulas2[0].length).setValues(formulas2)
    sheet4.getRange(lr + 1, 20, char1.length, char1[0].length).setValues(char1)
    sheet4.getRange(lr + 1, 10, formulas3.length, formulas3[0].length).setValues(formulas3)
    sheet4.getRange(lr + 1, 75, formulas4.length, formulas4[0].length).setValues(formulas4)
    sheet4.getRange(lr + 1, 12, tax.length, tax[0].length).setValues(tax)
    sheet4.getRange(lr + 1, 23, ozoneCols.length, ozoneCols[0].length).setValues(ozoneCols)
    sheet4.getRange(lr + 1, 76, caracteristici.length, caracteristici[0].length).setValues(caracteristici)
    
  }

}


function getEAN(prefix) {
  var random = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
  console.log(random)
  var ean = prefix + random;
  var checkSum = ean.split('').reduce(function (p, v, i) {
    return i % 2 == 0 ? p + 1 * v : p + 3 * v;
  }, 0);
  rezultat = (10 - (checkSum % 10)) % 10;
  return ean + rezultat;

}


// function updateZeroQty() {
//   var workBook = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet4 = workBook.getSheetByName("Sheet4")
//   var sheet2 = workBook.getSheetByName("Sheet2")
//   var sheet4Products = sheet4.getRange("A2:AA" + sheet4.getLastRow()).getValues();
//   // sheet4Products = [].concat(...sheet4Products);
//   var sheet2Products = sheet2.getRange("A2:A" + sheet2.getLastRow()).getValues();
//   sheet2Products = [].concat(...sheet2Products).filter(String);

//   console.log(sheet2Products.length)
//   var result = []
//   sheet4Products.forEach((product) => {
//     if (sheet2Products.indexOf(product[0]) == -1) {
//       product[3] = 0;
//       result.push(product)
//     }
//   })
//   sheet2.insertRowsAfter(sheet2Products.length + 1, result.length)
//   sheet2.getRange(sheet2Products.length + 2, 1, result.length, result[0].length).setValues(result)
//   console.log(result)
// }

