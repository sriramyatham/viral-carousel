/**
 * Google Apps Script for collecting emails from your Viral Carousel Landing Page
 * 
 * HOW TO SET THIS UP IN 60 SECONDS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In row 1, set these headers:
 *    A1: Timestamp | B1: Name | C1: Email | D1: Source | E1: Status
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code, paste this entire file, and click Save (disk icon)
 * 5. Click the blue "Deploy" button at top right > "New deployment"
 * 6. Select type: "Web app" (click gear icon next to Select type)
 * 7. Set:
 *    - Description: "Viral Carousel Lead Capture"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT!)
 * 8. Click "Deploy", authorize permissions when prompted.
 * 9. Copy the "Web app URL" (it looks like: https://script.google.com/macros/s/XXXX/exec)
 * 10. Paste that URL into your website's config in index.html (or in the site settings)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data (supports both JSON and URL-encoded form submissions)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = new Date();
    var name = data.name || "Anonymous";
    var email = data.email || "";
    var source = data.source || "Viral Carousel Landing Page";
    var status = "Unlocked";
    
    if (email) {
      sheet.appendRow([timestamp, name, email, source, status]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "row": sheet.getLastRow(),
      "message": "Email saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "online",
    "service": "Viral Carousel Lead Capture API",
    "timestamp": new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}
