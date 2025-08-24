// Documentation for Google Apps Script (in case needed to set up a different Google Sheet to log data)
// Google Apps Script to handle POST requests and log data to a Google Sheet

/* eslint-disable */

function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist");
    const data = JSON.parse(e.postData.contents);

    // Read all emails from first column
    const emails = sheet
      .getRange(1, 1, sheet.getLastRow(), 1)
      .getValues()
      .flat();

    if (emails.includes(data.email)) {
      // Already exists → return success but with message
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", message: "duplicate.email" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Append if new email
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.timezone,
      data.userAgent,
      data.referrer,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "append.successful" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
