// STORED PROCEDURE QUERIES
module.exports = Object.freeze({
   "createUser": "call createUser(?, ?, ?, ?, ?);",
   "getUserByEmail": "call getUserByEmail(?);",
   "getUserBySocailId": "call getUserBySocailId(?);",
   "getCategoriers": "call getCategories();",
   "addCategoriers": "call addCategories(?);",
   "deleteCategory": "call deleteCategory(?);",
   "updateCategory": "call updateCategory(?, ?);",
   "getLanguages": "call getLanguages();",
   "addLanguage": "call addLanguage(?);",
   "deleteLanguage": "call deleteLanguage(?);",
   "updateLanguage": "call updateLanguage(?, ?);"
});