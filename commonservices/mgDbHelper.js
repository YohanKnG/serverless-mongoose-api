const mongoose = require("mongoose");
const uuidV4 = require("uuid/v4");
mongoose.Promise = require("bluebird");

(function mgDbHelper() {
  module.exports = {
    getPrimaryKeyType() {
      return mongoose.Schema.ObjectId;
    },

    getSchema(schemaObject) {
      const modelSchema = new mongoose.Schema(schemaObject);
      return modelSchema;
    },

    createModel(modelName, schemaObject, indexObject, collection) {
      const modelSchema = new mongoose.Schema(schemaObject, { timestamps: {} });
      if (indexObject) {
        modelSchema.index(indexObject);
      }
      return collection
        ? mongoose.model(modelName, modelSchema, collection)
        : mongoose.model(modelName, modelSchema);
    },

    getModel(modelName) {
      let model = null;
      try {
        model = mongoose.model(modelName);
        return model;
      } catch (error) {
        throw error;
      }
    },

    close(returnObj) {
      return new Promise((resolve, reject) => {
        try {
          mongoose.disconnect(() => {
            resolve(returnObj);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    connect(connectionString, options) {
      options = {
        server: {
          // sets how many times to try reconnecting
          reconnectTries: Number.MAX_VALUE,
          // sets the delay between every retry (milliseconds)
          reconnectInterval: 1000
        }
      };
      try {
        return mongoose.connect(connectionString, options);
      } catch (error) {
        return new Promise(resolve => resolve());
      }
    },

    query(model, conditon, options, fields = {}) {
      return new Promise((resolve, reject) => {
        options = options || {};

        model.find(conditon, fields, options).exec((error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
    },

    queryOne(model, condition) {
      return new Promise((resolve, reject) => {
        model.findOne(condition).exec((error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
    },

    queryAggregateLookup(model, matchCondition ,lookupCondition) {
      return new Promise((resolve, reject) => {
        model.aggregate(
          [
            {
              $match: matchCondition
            },
            {
              $lookup: lookupCondition
            }
          ],
          (error, data) => {
            if (error) reject(error);
            resolve(data);
          }
        );
      });
    },

    querylimit(model, conditon, limitStart, limit) {
      return new Promise((resolve, reject) => {
        model
          .find(conditon)
          .skip(limitStart)
          .limit(limit)
          .exec((error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });
    },

    querysort(model, conditon, options, sort) {
      return new Promise((resolve, reject) => {
        options = options || {};

        model
          .find(conditon, {}, options)
          .sort(sort)
          .exec((error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });
    },

    querysortlimit(model, conditon, sort, limitStart, limit) {
      return new Promise((resolve, reject) => {
        model
          .find(conditon)
          .sort(sort)
          .skip(limitStart)
          .limit(limit)
          .exec((error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });
    },

    distinct(model, conditons, projection, options, distinctKey) {
      return new Promise((resolve, reject) => {
        options = options || {};
        projection = projection || {};
        model
          .find(conditons, projection, options)
          .distinct(distinctKey, (error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });
    },

    insert(model, doc) {
      return new Promise((resolve, reject) => {
        model.create(doc, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
    },
    update(model, doc) {
      return new Promise((resolve, reject) => {
        model.update(doc, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
    },

    findOneAndUpdate(model, conditons, options) {
      return new Promise((resolve, reject) => {
        model.findOneAndUpdate(
          conditons,
          options,
          {
            new: true
          },
          (error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          }
        );
      });
    },

    remove(model, conditions) {
      return new Promise((resolve, reject) => {
        model.remove(conditions, error => {
          if (error) reject(error);
          resolve();
        });
      });
    },
    getnewUUID() {
      return uuidV4();
    },

    getNewObjectId() {
      return mongoose.Types.ObjectId();
    },

    count(model, conditon, options) {
      return new Promise((resolve, reject) => {
        options = options || {};

        model.count(conditon, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
    }
  };
})();
