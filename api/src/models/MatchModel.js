const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = Schema(
  {
    sentBy: { type: Schema.Types.ObjectId, ref: "user" },
    receivedBy: { type: Schema.Types.ObjectId, ref: "user" },
    state: { type: String, enum: ["pending", "accepted", "rejected"] },
  },
  { timestamps: true }
);
const MatchModel = mongoose.model("match", MatchSchema);

module.exports = MatchModel;
