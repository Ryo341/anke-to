var SPREADSHEET_ID = "1PFrGBK9XbA8dWLdjw1AljSBSSu937ErBG84umiI0bEg";
var SHEET_NAME = "回答一覧";

var HEADERS = [
  "受信日時",
  "submittedAt",
  "参加形態",
  "参加形態(その他)",
  "性別",
  "年代",
  "満足度(全体)",
  "満足度(会場)",
  "満足度(スタッフ)",
  "心が震えた瞬間",
  "改善点",
  "次回参加条件",
  "けんじさんへのメッセージ"
];

function ensureSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
  var data = {};

  try {
    data = JSON.parse(raw);
  } catch (error) {
    data = {};
  }

  var satisfaction = data.satisfaction || {};
  var freeText = data.freeText || {};

  var row = [
    new Date(),
    data.submittedAt || "",
    data.participation || "",
    data.participationOther || "",
    data.gender || "",
    data.ageGroup || "",
    satisfaction.overall || "",
    satisfaction.venue || "",
    satisfaction.staff || "",
    freeText.moment || "",
    freeText.improvement || "",
    freeText.nextCondition || "",
    freeText.message || ""
  ];

  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = ensureSheet_();
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
