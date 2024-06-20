function doGet(e) {
  var spreadsheetId = "1HvcYpmbVa07iDc0HvmFGPiR7xC4W327-wSxTIQooYoc";
  var sheetName1 = "Comenzi";
  var sheetName2 = "Clienti";
  var consumerKey = "ck_e85b71c8f4703ba047d6dd72bf5f8c68cae8d9de";
  var consumerSecret = "cs_96ba9fed4dcf21cd342997d16580e5162ebe8798";
  var wooCommerceUrl1 = "https://carols.ro/beta/wp-json/wc/v3/orders";
  var wooCommerceUrl2 = "https://carols.ro/beta/wp-json/wc/v3/customers";
  var document = "1l1PjP781dh9K5YD4p3wCxHyJSTJFUReMdxSJ_6Wu2NY"; // Replace with your Google Docs document ID
  var folderId = "1FNnrFApn3S67peXGp5cDnbMnKk6FHBQf"; // Replace with your target folder ID
  var copiedDoc = DriveApp.getFileById(document).makeCopy();
  var documentId = copiedDoc.getId();

  saveOrderIdsToSheet(spreadsheetId, sheetName1, consumerKey, consumerSecret, wooCommerceUrl1);
  saveCustomerDataToSheet(spreadsheetId, sheetName2, consumerKey, consumerSecret, wooCommerceUrl2);
  copyLastRowToDocs(spreadsheetId, sheetName2, documentId);
  var idVal = copyLastRowToDocs(spreadsheetId, sheetName2, documentId);

  var pdfBlob = convertToPDF(documentId, copiedDoc);

  // Save PDF to the specified folder
  var folder = DriveApp.getFolderById(folderId);
  var pdfFile = folder.createFile(pdfBlob);
  pdfFile.setName("Contract  " + idVal + ".pdf");
  var fileId = pdfFile.getId();
  Logger.log(fileId)

  var out = "<body onload='dllink.click()'>";
  out += "<a id='dllink' target='_blank' href='https://drive.google.com/uc?export=download&id=" + fileId + "'>wait will download automatically</a>";
  out += "</body>";
  Logger.log(out);
  return HtmlService.createHtmlOutput(out);
}

function convertToPDF(documentId) {
  var pdfContentBlob = DriveApp.getFileById(documentId).getAs("application/pdf");
  return pdfContentBlob;
}

function saveCustomerDataToSheet() {
  var spreadsheetId = "1HvcYpmbVa07iDc0HvmF";
  var sheetName = "Clienti";
  var consumerKey = "ck_e85b71c8f4703";
  var consumerSecret = "cs_96ba9fed4dcf2";
  var wooCommerceUrl = "https://carols.ro/beta/wp-json/wc/v3/customers";

  var customers = getWooCommerceCustomers(consumerKey, consumerSecret, wooCommerceUrl);
  saveCustomersToSheet(customers, spreadsheetId, sheetName);
}

// Retrieve customers from WooCommerce
function getWooCommerceCustomers(consumerKey, consumerSecret, wooCommerceUrl) {
  var url = "https://carols.ro/beta/wp-json/wc/v3/customers";
  var options = {
    method: "GET",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(consumerKey + ":" + consumerSecret)
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data;
}

// Save customer data to the Google Sheet
function saveCustomersToSheet(customers, spreadsheetId, sheetName) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var headers = Object.keys(customers[0]); // Use the keys of the first customer as headers
  var data = customers.map(function (customer) {
    return Object.values(customer);
  });
  var range = sheet.getRange(1, 1, data.length + 1, headers.length);
  range.setValues([headers].concat(data));
}

function saveOrderIdsToSheet() {
  var spreadsheetId = "1HvcYpmbVa07iDc0HvmFGP";
  var sheetName = "Comenzi";
  var consumerKey = "ck_e85b71c8f4703ba047d6d";
  var consumerSecret = "cs_96ba9fed4dcf21cd342";
  var wooCommerceUrl = "https://carols.ro/beta/wp-json/wc/v3/orders";

var orders = getWooCommerceOrders(consumerKey, consumerSecret, wooCommerceUrl);
saveOrdersToSheet(orders, spreadsheetId, sheetName);
}

// Retrieve orders from WooCommerce
function getWooCommerceOrders(consumerKey, consumerSecret, wooCommerceUrl) {
  var url = "https://carols.ro/beta/wp-json/wc/v3/orders";
  var options = {
    method: "GET",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(consumerKey + ":" + consumerSecret)
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data;
}

// Save order data to the Google Sheet
function saveOrdersToSheet(orders, spreadsheetId, sheetName) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var headers = Object.keys(orders[0]); // Use the keys of the first order as headers
  var data = orders.map(function (order) {
    return Object.values(order);
  });
  var range = sheet.getRange(1, 1, data.length + 1, headers.length);
  range.setValues([headers].concat(data));
}


function copyLastRowToDocs(spreadsheetId, sheetName, documentId) {
  // Get the active Google Sheets and Google Docs instances
  var currentDate = Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy");
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var doc = DocumentApp.openById(documentId);

  // Get the last row with data in the "ID" column
  var lastRow = sheet.getLastRow();
  var idValue = sheet.getRange('A' + lastRow).getValue();
  var cellValue = sheet.getRange('K' + lastRow).getValue();
  var name = sheet.getRange('H' + lastRow).getValue() + " " + sheet.getRange('G' + lastRow).getValue();
  var idVal = Math.round(idValue) + 20000;

    // Extract the value of "company" property using regular expression
  var companyMatch = cellValue.match(/company=([^,]+)/i);
  var companyValue = companyMatch ? companyMatch[1] : null;
  var cityMatch = cellValue.match(/city=([^,]+)/i);
  var cityValue = cityMatch ? cityMatch[1] : null;
  var addressMatch = cellValue.match(/address_1=([^,]+)/i);
  var addressValue = addressMatch ? addressMatch[1] : null;
  var judetMatch = cellValue.match(/state=([^,]+)/i);
  var judetValue = judetMatch ? judetMatch[1] : null;
  var phoneMatch = cellValue.match(/phone=([^,]+)/i);
  var phoneValue = phoneMatch ? phoneMatch[1] : null;

  // Replace "{numar}" with the ID value in the Google Docs document
  var docBody = doc.getBody();
  var searchText = '{numar}';
  var replaceText = idVal.toString(); // Convert to string if necessary
  docBody.replaceText(searchText, replaceText);

    searchText = '{data}';
  replaceText = currentDate;
  docBody.replaceText(searchText, replaceText);
  
    searchText = '{Nume firma}';
  replaceText = companyValue;
  // Logger.log(companyValue)
  docBody.replaceText(searchText, replaceText);

      searchText = '{Localitate}';
  replaceText = cityValue;
  // Logger.log(cityValue)
  docBody.replaceText(searchText, replaceText);

      searchText = '{adresa}';
  replaceText = addressValue;
  // Logger.log(addressValue)
  docBody.replaceText(searchText, replaceText);

      searchText = '{judet}';
  replaceText = judetValue;
  // Logger.log(judetValue)
  docBody.replaceText(searchText, replaceText);

        searchText = '{Telefon}';
  replaceText = phoneValue;
  // Logger.log(phoneValue)
  docBody.replaceText(searchText, replaceText);

          searchText = '{nume}';
  replaceText = name;
  // Logger.log(name)
  docBody.replaceText(searchText, replaceText);


  return idVal; // Return the idVal value
}