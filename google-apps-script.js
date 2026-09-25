/**
 * Google Apps Script for collecting emails from your Viral Carousel Landing Page
 * 
 * IMPORTANT: When deploying, "Who has access" MUST be set to "Anyone"
 */

function doPost(e) {
  return handleIncomingLead(e);
}

function doGet(e) {
  // If email is passed in URL query parameters, save it immediately
  if (e && e.parameter && e.parameter.email) {
    return handleIncomingLead(e);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    "status": "online",
    "service": "Viral Carousel Lead Capture API",
    "timestamp": new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleIncomingLead(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data (supports JSON, FormData, and Query Parameters)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = new Date();
    var name = data.name || (e.parameter ? e.parameter.name : "") || "Anonymous";
    var email = data.email || (e.parameter ? e.parameter.email : "") || "";
    var source = data.source || (e.parameter ? e.parameter.source : "") || "Viral Carousel Landing Page";
    var status = "Unlocked";
    
    if (email && email.trim() !== "") {
      sheet.appendRow([timestamp, name, email, source, status]);
      
      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "row": sheet.getLastRow(),
        "message": "Email saved successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "ignored",
      "message": "No email provided"
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
