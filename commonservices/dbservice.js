const dbHelper = require("./mgDbHelper");

(function dbservice() {
  module.exports = {
    getPrimaryKeyType() {
      return dbHelper.getPrimaryKeyType();
    },

    createEntityDef(entityStructure) {
      return dbHelper.getSchema(entityStructure);
    },

    createModel(modelName, entityDef, indexObject, collection) {
      return dbHelper.createModel(
        modelName,
        entityDef,
        indexObject,
        collection
      );
    },

    connectDb(connectionString, options) {
      return dbHelper.connect(connectionString, options);
    },

    disconnectDb(returnObj) {
      return dbHelper.close(returnObj);
    },

    getModel(modelName) {
      return dbHelper.getModel(modelName);
    },

    query(model, condition, options, limitStart, limit) {
      if (limit > 0) {
        return dbHelper.querylimit(model, condition, limitStart, limit);
      }
      return dbHelper.query(model, condition, options);
    },
    queryone(model, condition) {
      return dbHelper.queryOne(model, condition);
    },
    queryfields(model, condition, options, fields) {
      options = options || {};
      return dbHelper.query(model, condition, options, fields);
    },
    querySort(model, condition, options, sort, limitStart, limit) {
      if (limit > 0) {
        return dbHelper.querysortlimit(
          model,
          condition,
          sort,
          limitStart,
          limit
        );
      }
      return dbHelper.querysort(model, condition, options, sort);
    },

    queryAggregateLookup(model, matchCondition, lookupCondition) {
      return dbHelper.queryAggregateLookup(model, matchCondition, lookupCondition);
    },

    distinct(model, conditons, projection, options, distinctKey) {
      return dbHelper.distinct(
        model,
        conditons,
        projection,
        options,
        distinctKey
      );
    },

    insert(model, object) {
      return dbHelper.insert(model, object);
    },

    update(model, object) {
      return dbHelper.update(model, object);
    },

    remove(model, conditions) {
      return dbHelper.remove(model, conditions);
    },

    getnewUUID() {
      return dbHelper.getnewUUID();
    },

    getNewObjectId() {
      return dbHelper.getNewObjectId();
    },

    count(model, condition, options) {
      return dbHelper.count(model, condition, options);
    },
    queryandgroubby(model, condition, options) {
      return dbHelper.queryandgroubby(model, condition, options);
    },
    findOneAndUpdate(model, condition, object) {
      return dbHelper.findOneAndUpdate(model, condition, object);
    }
  };
})();
