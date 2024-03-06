const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "AGENCY"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];

/* Estate enums */
exports.estate_collection_enums = [
  "apartment",
  "willa",
  "house",
  "office",
  "rent",
  "etc",
];
exports.estate_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.estate_type_enums = [
  "one-room",
  "two-room",
  "family",
  "pent-house",
  "etc",
];
exports.estate_rent_enums = ["전세", "반전세", "월세"];

exports.like_view_group_list = ["product", "member", "community"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story"];

/* *****************************
 *    MongoDb Related Commands  *
 ********************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
