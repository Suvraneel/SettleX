// Documentation for Google Apps Script (in case needed to set up a different Google Sheet to log data)
// Google Apps Script to handle POST requests and log data to a Google Sheet

/* eslint-disable */

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist");
        const data = JSON.parse(e.postData.contents);

        // Get all existing emails from the sheet
        const existingEmails = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues().flat();

        // Check if the email already exists
        if (!existingEmails.includes(data.email)) {
            sheet.appendRow([
                data.email,
                data.timestamp,
                data.timezone,
                data.userAgent,
                data.referrer
            ]);

            return ContentService.createTextOutput(
                JSON.stringify({status: "success", message: "Email added to waitlist successfully"})
            ).setMimeType(ContentService.MimeType.JSON);
        } else {
            return ContentService.createTextOutput(
                JSON.stringify({status: "success", message: "Email already exists in waitlist"})
            ).setMimeType(ContentService.MimeType.JSON);
        }
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({status: "error", message: error.toString()})
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

function doOptions() {
    return HtmlService.createHtmlOutput("OK")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .getResponse()
        .setContentType("application/json")
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
        .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
