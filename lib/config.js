const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "AGENCY"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];

/* Estate enums */
exports.estate_collection_enums = [
  "apartment",
  "willa",
  "family",
  "office",
  "penthouse",
  "etc",
];
exports.estate_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.estate_type_enums = ["for sale", "rent", "buy", "sell"];
exports.estate_rent_enums = [
  "apartment",
  "willa",
  "family",
  "single family",
  "office",
  "penthouse",
  "etc",
];

exports.like_view_group_list = ["estate", "member", "blog"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story"];

/* *****************************
 *    MongoDb Related Commands  *
 ********************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
