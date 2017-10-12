module.exports = function user(dbService) {
  let model = null;
  const modelName = "users";

  try {
    model = dbService.getModel(modelName);
  } catch (error) {
    const userSchema = {
      _id: {
        type: String
      },
      name: {
        type: String
      },
      email: {
        type: String
      },
      status: {
        type: Boolean,
        default: false
      }
    };

    model = dbService.createModel(modelName, userSchema, null, modelName);
  }

  return model;
};
