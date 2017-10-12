const commonServices = require("./commonservices/service");
const dbService = require("./commonservices/dbservice");

const userSchema = require(`./user`);

module.exports.getUser = (event, context, callback) => {
  try {
    dbService
      .connectDb(commonService.DB_CONFIG.CONNECTIONSTRING, {})
      .then(() => dbService.query(userSchema))
      .then(dataObj => dbService.disconnectDb(dataObj))
      .then(dataObj => callback(dataObj))
      .catch(errorObj => {
        dbService.disconnectDb(errorObj).then(() => {
          callback({}, errorObj);
        });
      });
  } catch (error) {
    callback({}, error);
  }
};
