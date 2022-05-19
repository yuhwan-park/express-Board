const { Schema } = require("mongoose");
const shortId = require("./types/shortId");

const UserSchema = new Schema(
  {
    shortId,
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordReset: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
