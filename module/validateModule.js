const appError = require("../service/appError");

// patch 驗證 key 是否有另外屬性
const keyArray = [
  "user",
  "content",
  "type",
  "image",
  "likes",
  "comments",
  "tags",
];

function validateKey(keyParams, next) {
  for (const key of keyParams) {
    if (!keyArray.includes(key)) return next(appError(400, "有非規定屬性值"));
  }
}

module.exports = validateKey;
